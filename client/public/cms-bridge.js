/* ──────────────────────────────────────────────────────────────────────────
 * cms-bridge.js — Mirantic CMS editing bridge
 *
 * Drop this script into every client site you build. It does nothing on a
 * normal visit. When the site is loaded inside the Mirantic CMS editor
 * (in an iframe), it talks to the CMS over postMessage to enable:
 *   - hover highlighting of editable elements
 *   - click-to-select (opens that field in the CMS sidebar), with text editable
 *     right on the page and the selection kept outlined
 *   - live preview of pending edits (text + images) without reloading
 *   - live preview of brand-new blog posts (cloned from a template node)
 *   - adding and removing items in lists marked with data-cms-list
 *
 * Editable elements are marked with data-cms-field="path.to.value" matching
 * keys in content.json. Lists of repeating items (a team, partners) can be
 * marked so items can be added and removed; see README.md in this folder.
 * ────────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  // Only run inside an iframe.
  if (window.parent === window) return;

  var ACCENT = "#4A6FA5";
  var hostOrigin = "*"; // captured from the first cms-host message
  var editMode = false;
  var imageOverlay = null;
  var styledEl = null;

  injectStyles();
  announceReady();
  window.addEventListener("load", announceReady);
  window.addEventListener("message", onHostMessage);

  function announceReady() {
    post({ source: "cms-bridge", type: "ready" });
  }

  function post(msg) {
    try {
      window.parent.postMessage(msg, hostOrigin);
    } catch (e) {
      /* ignore */
    }
  }

  function onHostMessage(event) {
    var data = event.data;
    if (!data || data.source !== "cms-host") return;
    hostOrigin = event.origin; // trust the host origin from here on

    switch (data.type) {
      case "init":
        enableEditing();
        (data.listAdds || []).forEach(function (a) {
          addListItem(a.tempId, a.list, a.index, a.item);
        });
        (data.listRemoves || []).forEach(function (r) {
          setListItemRemoved(r.list, r.index, true);
        });
        applyEditMode(data.editMode !== false);
        (data.changes || []).forEach(function (c) {
          applyValue(c.field, c.value, c.fieldType);
        });
        (data.newPosts || []).forEach(function (p) {
          addBlogPost(p.tempId, p.post);
        });
        break;
      case "highlight":
        selectField(data.field);
        break;
      case "clear-highlight":
        deselect();
        break;
      case "set-edit-mode":
        applyEditMode(!!data.editMode);
        break;
      case "apply-change":
        applyValue(data.field, data.value, data.fieldType);
        break;
      case "apply-blog-post":
        addBlogPost(data.tempId, data.post);
        break;
      case "remove-blog-post":
        removeBlogPost(data.tempId);
        break;
      case "apply-list-add":
        addListItem(data.tempId, data.list, data.index, data.item);
        refreshListControls();
        break;
      case "remove-list-add":
        removeListItemClone(data.tempId);
        refreshListControls();
        break;
      case "apply-list-remove":
        setListItemRemoved(data.list, data.index, true);
        refreshListControls();
        break;
      case "undo-list-remove":
        setListItemRemoved(data.list, data.index, false);
        refreshListControls();
        break;
    }
  }

  // ── Applying values ──────────────────────────────────────────────────────
  function applyValue(field, value, fieldType) {
    var els = document.querySelectorAll('[data-cms-field="' + cssEscape(field) + '"]');
    els.forEach(function (el) {
      // Don't overwrite the text someone is typing in: it would move the caret.
      if (el === document.activeElement && el.isContentEditable) return;
      setElementValue(el, value, fieldType);
    });
  }

  function setElementValue(el, value, fieldType) {
    var str = value == null ? "" : String(value);
    var isImage =
      fieldType === "image" || el.tagName === "IMG" || el.hasAttribute("data-cms-image");
    if (isImage) {
      if (el.tagName === "IMG") {
        el.src = str;
      } else {
        el.style.backgroundImage = str ? 'url("' + str + '")' : "";
      }
    } else {
      el.textContent = str;
    }
  }

  function readElementValue(el) {
    if (el.tagName === "IMG") return el.getAttribute("src") || "";
    if (el.hasAttribute("data-cms-image")) {
      var m = (el.style.backgroundImage || "").match(/url\(["']?(.*?)["']?\)/);
      return m ? m[1] : "";
    }
    return (el.textContent || "").trim();
  }

  function fieldTypeOf(el) {
    return el.tagName === "IMG" || el.hasAttribute("data-cms-image") ? "image" : "text";
  }

  // ── Editing interactions ──────────────────────────────────────────────────
  //
  // In browse mode the listeners stay attached but do nothing, so the site's own
  // links work normally and the editor can be used to navigate to the page you
  // actually want to edit.
  function applyEditMode(on) {
    editMode = on;
    document.body.classList.toggle("cms-edit-mode", on);
    if (!on) {
      clearTextOutline();
      hideImageOverlay();
      deselect();
    }
    refreshListControls();
  }

  var listenersAttached = false;
  function enableEditing() {
    if (listenersAttached) return;
    listenersAttached = true;
    document.addEventListener("mouseover", onMouseOver, true);
    document.addEventListener("mouseout", onMouseOut, true);
    document.addEventListener("click", onClick, true);
    window.addEventListener("scroll", positionImageOverlay, true);
    window.addEventListener("resize", positionImageOverlay, true);
    // Single-page sites swap their DOM on navigation; keep list controls on
    // whatever lists the current page shows.
    var pending = false;
    new MutationObserver(function (records) {
      if (pending || !editMode) return;
      // Ignore the mutations caused by adding/removing our own buttons, or
      // refreshing would trigger itself forever.
      var isControl = function (n) {
        return n.nodeType === 1 && n.classList.contains("cms-list-control");
      };
      var ours = records.every(function (r) {
        var nodes = Array.prototype.slice
          .call(r.addedNodes)
          .concat(Array.prototype.slice.call(r.removedNodes));
        return nodes.length > 0 && nodes.every(isControl);
      });
      if (ours) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        refreshListControls();
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  function editableFrom(target) {
    return target && target.closest ? target.closest("[data-cms-field]") : null;
  }

  function onMouseOver(e) {
    if (!editMode) return;
    var el = editableFrom(e.target);
    if (!el) return;
    if (fieldTypeOf(el) === "image") {
      showImageOverlay(el);
    } else {
      clearTextOutline();
      styledEl = el;
      el.classList.add("cms-hover-text");
    }
  }

  function onMouseOut(e) {
    if (!editMode) return;
    var el = editableFrom(e.target);
    if (!el) return;
    if (fieldTypeOf(el) === "image") {
      hideImageOverlay();
    } else {
      el.classList.remove("cms-hover-text");
    }
  }

  function onClick(e) {
    if (!editMode) return;
    var control = e.target.closest && e.target.closest("[data-cms-list-action]");
    if (control) {
      e.preventDefault();
      e.stopPropagation();
      onListControl(control);
      return;
    }
    var el = editableFrom(e.target);
    if (!el) return;
    // Prevent the site's own navigation/handlers while editing.
    e.preventDefault();
    e.stopPropagation();
    if (el === selectedEl) return; // already editing it; let the click place the caret
    select(el, e);
    post({
      source: "cms-bridge",
      type: "field-clicked",
      field: el.getAttribute("data-cms-field"),
      value: readElementValue(el),
      fieldType: fieldTypeOf(el),
    });
  }

  // ── Selection and editing in place ─────────────────────────────────────
  // The selected element stays outlined while its field is open in the CMS.
  // Text is also editable right on the page: typing is mirrored to the CMS
  // sidebar (which owns saving), Enter saves and Escape cancels.
  var selectedEl = null;

  function select(el, clickEvent) {
    deselect();
    selectedEl = el;
    el.classList.add("cms-selected");
    if (fieldTypeOf(el) !== "text") return;
    try {
      el.contentEditable = "plaintext-only";
    } catch (e) {
      el.contentEditable = "true";
    }
    if (el.contentEditable !== "plaintext-only") el.contentEditable = "true";
    el.addEventListener("input", onSelectedInput);
    el.addEventListener("keydown", onSelectedKeydown);
    el.focus({ preventScroll: true });
    placeCaret(el, clickEvent);
  }

  function selectField(field) {
    var el = document.querySelector('[data-cms-field="' + cssEscape(field) + '"]');
    if (el && el !== selectedEl) select(el, null);
  }

  function deselect() {
    if (!selectedEl) return;
    var el = selectedEl;
    selectedEl = null;
    el.classList.remove("cms-selected");
    el.removeEventListener("input", onSelectedInput);
    el.removeEventListener("keydown", onSelectedKeydown);
    if (el.isContentEditable) {
      el.removeAttribute("contenteditable");
      el.blur();
    }
  }

  function placeCaret(el, clickEvent) {
    var sel = window.getSelection();
    if (!sel) return;
    var range = null;
    if (clickEvent && document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(clickEvent.clientX, clickEvent.clientY);
      if (range && !el.contains(range.startContainer)) range = null;
    }
    if (!range) {
      range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
    }
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function onSelectedInput() {
    if (!selectedEl) return;
    var field = selectedEl.getAttribute("data-cms-field");
    // Keep other copies of the same field (e.g. a repeated label) in step.
    applyValue(field, selectedEl.textContent, "text");
    post({ source: "cms-bridge", type: "field-input", field: field, value: selectedEl.textContent });
  }

  function onSelectedKeydown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      post({ source: "cms-bridge", type: "field-commit", field: selectedEl.getAttribute("data-cms-field") });
    } else if (e.key === "Escape") {
      e.preventDefault();
      post({ source: "cms-bridge", type: "field-cancel", field: selectedEl.getAttribute("data-cms-field") });
    }
  }

  // ── Hover overlay for images ────────────────────────────────────────────
  var overlayTarget = null;
  function showImageOverlay(el) {
    overlayTarget = el;
    if (!imageOverlay) {
      imageOverlay = document.createElement("div");
      imageOverlay.className = "cms-image-overlay";
      imageOverlay.innerHTML =
        '<div class="cms-image-overlay-inner">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>' +
        '<polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>' +
        "</div>";
      document.body.appendChild(imageOverlay);
    }
    imageOverlay.style.display = "block";
    positionImageOverlay();
  }

  function hideImageOverlay() {
    overlayTarget = null;
    if (imageOverlay) imageOverlay.style.display = "none";
  }

  function positionImageOverlay() {
    if (!imageOverlay || !overlayTarget) return;
    var r = overlayTarget.getBoundingClientRect();
    imageOverlay.style.top = r.top + window.scrollY + "px";
    imageOverlay.style.left = r.left + window.scrollX + "px";
    imageOverlay.style.width = r.width + "px";
    imageOverlay.style.height = r.height + "px";
  }

  function clearTextOutline() {
    if (styledEl) styledEl.classList.remove("cms-hover-text");
    styledEl = null;
  }

  // ── Blog posts ─────────────────────────────────────────────────────────
  // Clones the hidden template node [data-cms-template="blog-post"], fills its
  // [data-cms-field] children from the post object, and appends it to the list
  // container ([data-cms-posts], else the template's parent).
  function addBlogPost(tempId, post) {
    removeBlogPost(tempId); // avoid duplicates on re-init
    var template = document.querySelector('[data-cms-template="blog-post"]');
    if (!template) return;

    var node = template.cloneNode(true);
    node.removeAttribute("data-cms-template");
    node.removeAttribute("hidden");
    node.style.display = "";
    node.setAttribute("data-cms-temp-id", tempId);

    node.querySelectorAll("[data-cms-field]").forEach(function (child) {
      var key = child.getAttribute("data-cms-field");
      if (post[key] != null) setElementValue(child, post[key], fieldTypeOf(child));
    });

    var container =
      document.querySelector("[data-cms-posts]") || template.parentNode;
    if (container) container.appendChild(node);
  }

  function removeBlogPost(tempId) {
    var existing = document.querySelector('[data-cms-temp-id="' + cssEscape(tempId) + '"]');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
  }

  // ── Lists ───────────────────────────────────────────────────────────
  // A list container carries data-cms-list="path.to.array", and each item
  // inside it an element with data-cms-item="<index>". Optional on the
  // container: data-cms-list-label ("team member") and data-cms-list-new, the
  // JSON object a new item starts as. In edit mode every item gets a remove
  // button and the list an add button; the CMS records the change and previews
  // it here (a new item is a copy of an existing one, filled with the defaults).
  function listContainer(list) {
    return document.querySelector('[data-cms-list="' + cssEscape(list) + '"]');
  }

  // The direct child of the container that holds an item: that is what gets
  // copied, hidden or removed, so grid/flex layout keeps working.
  function cellOf(container, itemEl) {
    var el = itemEl;
    while (el && el.parentElement !== container) el = el.parentElement;
    return el;
  }

  function itemsOf(container) {
    return Array.prototype.slice.call(container.querySelectorAll("[data-cms-item]"));
  }

  function findItem(list, index) {
    var container = listContainer(list);
    if (!container) return null;
    var hit = itemsOf(container).filter(function (el) {
      return el.getAttribute("data-cms-item") === String(index);
    })[0];
    return hit ? cellOf(container, hit) : null;
  }

  function addListItem(tempId, list, index, item) {
    removeListItemClone(tempId);
    var container = listContainer(list);
    if (!container) return;
    var items = itemsOf(container);
    if (!items.length) return;
    var templateItem = items[items.length - 1];
    var oldIndex = templateItem.getAttribute("data-cms-item");
    var cell = cellOf(container, templateItem).cloneNode(true);
    cell.setAttribute("data-cms-temp-id", tempId);
    cell.removeAttribute("data-cms-removed");
    cell.style.display = "";
    stripControls(cell);

    var oldPrefix = list + "[" + oldIndex + "]";
    var newPrefix = list + "[" + index + "]";
    var itemEl = cell.hasAttribute("data-cms-item") ? cell : cell.querySelector("[data-cms-item]");
    if (itemEl) itemEl.setAttribute("data-cms-item", String(index));
    var fields = Array.prototype.slice.call(cell.querySelectorAll("[data-cms-field]"));
    if (cell.hasAttribute("data-cms-field")) fields.unshift(cell);
    fields.forEach(function (el) {
      var f = el.getAttribute("data-cms-field");
      if (f.indexOf(oldPrefix + ".") !== 0) {
        // Belongs to the copied item's surroundings (e.g. a link only some
        // items have), not to the item itself: leave it out of the new one.
        if (el !== cell && el.parentNode) el.parentNode.removeChild(el);
        return;
      }
      var key = f.slice(oldPrefix.length + 1);
      el.setAttribute("data-cms-field", newPrefix + "." + key);
      var value = item && item[key] != null ? item[key] : "";
      setElementValue(el, value, fieldTypeOf(el));
      if (el.tagName === "IMG") el.setAttribute("alt", (item && item.name) || "");
    });
    container.appendChild(cell);
  }

  function removeListItemClone(tempId) {
    var el = document.querySelector('[data-cms-temp-id="' + cssEscape(tempId) + '"]');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function setListItemRemoved(list, index, removed) {
    var cell = findItem(list, index);
    if (!cell) return;
    if (removed) {
      cell.setAttribute("data-cms-removed", "");
      cell.style.display = "none";
    } else {
      cell.removeAttribute("data-cms-removed");
      cell.style.display = "";
    }
  }

  function stripControls(root) {
    Array.prototype.slice
      .call(root.querySelectorAll(".cms-list-control"))
      .forEach(function (el) {
        el.parentNode.removeChild(el);
      });
  }

  function refreshListControls() {
    stripControls(document);
    if (!editMode) return;
    Array.prototype.slice
      .call(document.querySelectorAll("[data-cms-list]"))
      .forEach(function (container) {
        var list = container.getAttribute("data-cms-list");
        var label = container.getAttribute("data-cms-list-label") || "item";
        itemsOf(container).forEach(function (itemEl) {
          var cell = cellOf(container, itemEl);
          if (!cell || cell.hasAttribute("data-cms-removed")) return;
          if (getComputedStyle(itemEl).position === "static") itemEl.style.position = "relative";
          var remove = document.createElement("button");
          remove.type = "button";
          remove.className = "cms-list-control cms-list-remove";
          remove.title = "Remove this " + label;
          remove.textContent = "\u00d7 Remove";
          remove.setAttribute("data-cms-list-action", "remove");
          remove.setAttribute("data-cms-list-path", list);
          remove.setAttribute("data-cms-list-index", itemEl.getAttribute("data-cms-item"));
          var tempId = cell.getAttribute("data-cms-temp-id");
          if (tempId) remove.setAttribute("data-cms-temp-id", tempId);
          itemEl.appendChild(remove);
        });
        var add = document.createElement("button");
        add.type = "button";
        add.className = "cms-list-control cms-list-add";
        add.textContent = "+ Add " + label;
        add.setAttribute("data-cms-list-action", "add");
        add.setAttribute("data-cms-list-path", list);
        container.parentNode.insertBefore(add, container.nextSibling);
      });
  }

  function onListControl(control) {
    var list = control.getAttribute("data-cms-list-path");
    if (control.getAttribute("data-cms-list-action") === "add") {
      var container = listContainer(list);
      var defaults = {};
      try {
        defaults = JSON.parse(container.getAttribute("data-cms-list-new") || "{}");
      } catch (e) {
        /* fall back to an empty item */
      }
      post({ source: "cms-bridge", type: "list-add", list: list, item: defaults });
    } else {
      post({
        source: "cms-bridge",
        type: "list-remove",
        list: list,
        index: Number(control.getAttribute("data-cms-list-index")),
        tempId: control.getAttribute("data-cms-temp-id") || null,
      });
    }
  }

  // ── Styles ────────────────────────────────────────────────────────────
  function injectStyles() {
    var css =
      ".cms-edit-mode [data-cms-field]{cursor:pointer;}" +
      ".cms-hover-text{outline:2px solid " +
      ACCENT +
      ";outline-offset:2px;border-radius:2px;}" +
      ".cms-image-overlay{position:absolute;z-index:2147483646;display:none;" +
      "background:rgba(74,111,165,0.35);pointer-events:none;border:2px solid " +
      ACCENT +
      ";box-sizing:border-box;}" +
      ".cms-image-overlay-inner{position:absolute;inset:0;display:flex;align-items:center;" +
      "justify-content:center;}" +
      ".cms-selected{outline:2px solid " + ACCENT + " !important;outline-offset:3px;border-radius:2px;" +
      "background-color:rgba(74,111,165,0.08);}" +
      ".cms-selected[contenteditable]{cursor:text;caret-color:" + ACCENT + ";}" +
      ".cms-list-control{font:600 12px/1 system-ui,sans-serif;cursor:pointer;border-radius:999px;" +
      "border:1px solid " + ACCENT + ";letter-spacing:0;text-transform:none;}" +
      ".cms-list-remove{position:absolute;top:8px;right:8px;z-index:20;padding:6px 10px;" +
      "background:#fff;color:#b42318;border-color:#b42318;opacity:0;transition:opacity .15s;}" +
      "[data-cms-item]:hover>.cms-list-remove{opacity:1;}" +
      ".cms-list-add{display:block;margin:16px 0;padding:10px 16px;background:" + ACCENT +
      ";color:#fff;}";
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Minimal CSS.escape fallback for attribute selectors.
  function cssEscape(s) {
    if (window.CSS && CSS.escape) return CSS.escape(s);
    return String(s).replace(/["\\\]]/g, "\\$&");
  }
})();
