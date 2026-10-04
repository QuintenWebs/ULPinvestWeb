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
 *   - formatted text (bold, italic, underline, links, the site's text styles)
 *     in elements marked data-cms-rich
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
    post({ source: "cms-bridge", type: "ready", path: currentPath() });
  }

  function currentPath() {
    return location.pathname + location.search;
  }

  // Single-page sites change page without reloading, so report every
  // navigation; the CMS shows the current page in its address bar.
  (function watchLocation() {
    var last = currentPath();
    function check() {
      var now = currentPath();
      if (now === last) return;
      last = now;
      post({ source: "cms-bridge", type: "location", path: now });
    }
    ["pushState", "replaceState"].forEach(function (name) {
      var original = history[name];
      history[name] = function () {
        var result = original.apply(this, arguments);
        check();
        return result;
      };
    });
    window.addEventListener("popstate", check);
  })();

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
          addListItem(a.tempId, a.list, a.index, a.item, a.after);
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
        addListItem(data.tempId, data.list, data.index, data.item, data.after);
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
    } else if (el.hasAttribute("data-cms-rich")) {
      renderRich(el, str);
    } else {
      el.textContent = str;
    }
  }

  function readElementValue(el) {
    if (el.hasAttribute("data-cms-rich")) return toRich(el).trim();
    if (el.tagName === "IMG") return el.getAttribute("src") || "";
    if (el.hasAttribute("data-cms-image")) {
      var m = (el.style.backgroundImage || "").match(/url\(["']?(.*?)["']?\)/);
      return m ? m[1] : "";
    }
    return (el.textContent || "").trim();
  }

  // ── Formatted text ────────────────────────────────────────────────────
  // Same small format the site's <Rich> helper renders, and nothing more:
  //   **bold**  *italic*  __underline__  [text](url)  \* for a literal *
  //   a leading "# ", "## ", "### " or "-# " picks one of the site's text styles
  // The site publishes its styles as window.__CMS_TEXT_STYLES__
  // ({ "#": { label, style } }, style in React/camelCase form).
  var STYLE_MARKERS = ["###", "##", "#", "-#"];

  function textStyles() {
    return window.__CMS_TEXT_STYLES__ || {};
  }

  function safeHref(url) {
    return /^(https?:|mailto:|tel:|\/|#)/i.test(url) ? url : null;
  }

  function parseRich(src) {
    var style = null;
    for (var s = 0; s < STYLE_MARKERS.length; s++) {
      if (src.indexOf(STYLE_MARKERS[s] + " ") === 0) {
        style = STYLE_MARKERS[s];
        src = src.slice(style.length + 1);
        break;
      }
    }
    return { style: style, nodes: parseInline(src, 0, null).nodes };
  }

  // Returns { nodes, end }. Nodes are strings or { tag, children, href }.
  function parseInline(src, i, closer) {
    var nodes = [];
    var text = "";
    function flush() {
      if (text) nodes.push(text);
      text = "";
    }
    while (i < src.length) {
      if (closer && src.startsWith(closer, i)) {
        flush();
        return { nodes: nodes, end: i + closer.length, closed: true };
      }
      var ch = src[i];
      if (ch === "\\" && i + 1 < src.length) {
        text += src[i + 1];
        i += 2;
        continue;
      }
      var opener = src.startsWith("**", i) ? "**" : src.startsWith("__", i) ? "__" : ch === "*" ? "*" : null;
      if (opener) {
        var inner = parseInline(src, i + opener.length, opener);
        if (inner.closed && inner.nodes.length) {
          flush();
          nodes.push({ tag: opener === "**" ? "strong" : opener === "__" ? "u" : "em", children: inner.nodes });
          i = inner.end;
          continue;
        }
      }
      if (ch === "[") {
        var close = src.indexOf("](", i);
        var end = close === -1 ? -1 : src.indexOf(")", close + 2);
        var href = end === -1 ? null : safeHref(src.slice(close + 2, end));
        if (href) {
          flush();
          nodes.push({ tag: "a", href: href, children: parseInline(src.slice(i + 1, close), 0, null).nodes });
          i = end + 1;
          continue;
        }
      }
      text += ch;
      i++;
    }
    flush();
    return { nodes: nodes, end: i, closed: false };
  }

  function buildNodes(parent, nodes) {
    nodes.forEach(function (n) {
      if (typeof n === "string") {
        parent.appendChild(document.createTextNode(n));
        return;
      }
      var el = document.createElement(n.tag);
      if (n.tag === "a") {
        el.setAttribute("href", n.href);
        if (/^https?:/i.test(n.href)) {
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener noreferrer");
        }
      }
      buildNodes(el, n.children);
      parent.appendChild(el);
    });
  }

  function renderRich(el, src) {
    var parsed = parseRich(src);
    el.textContent = "";
    var target = el;
    if (parsed.style && textStyles()[parsed.style]) {
      target = document.createElement("span");
      target.setAttribute("data-cms-style", parsed.style);
      var css = textStyles()[parsed.style].style || {};
      Object.keys(css).forEach(function (k) {
        target.style[k] = css[k];
      });
      el.appendChild(target);
    }
    buildNodes(target, parsed.nodes);
  }

  // DOM → format, for text typed or formatted (Cmd+B/I/U) on the page.
  function escapeRich(s) {
    // Only what the parser would read as markup: a lone "_" is plain text.
    return s.replace(/[\\*[\]]/g, "\\$&").replace(/__/g, "\\_\\_");
  }

  function toRich(el) {
    var out = "";
    el.childNodes.forEach(function (n) {
      if (n.nodeType === 3) {
        out += escapeRich(n.textContent);
      } else if (n.nodeType === 1) {
        var tag = n.tagName;
        var inner = toRich(n);
        if (n.classList && n.classList.contains("cms-list-control")) return;
        if (tag === "STRONG" || tag === "B") out += inner ? "**" + inner + "**" : "";
        else if (tag === "EM" || tag === "I") out += inner ? "*" + inner + "*" : "";
        else if (tag === "U") out += inner ? "__" + inner + "__" : "";
        else if (tag === "A" && safeHref(n.getAttribute("href") || "")) out += "[" + inner + "](" + n.getAttribute("href") + ")";
        else if (tag === "BR") out += " ";
        else if (n.hasAttribute("data-cms-style")) out += n.getAttribute("data-cms-style") + " " + inner;
        else out += inner;
      }
    });
    return out;
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
    if (!on) hideGhost();
    refreshListControls();
  }

  var listenersAttached = false;
  function enableEditing() {
    if (listenersAttached) return;
    listenersAttached = true;
    document.addEventListener("mouseover", onMouseOver, true);
    document.addEventListener("mouseover", onListHover, true);
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
      rich: el.hasAttribute("data-cms-rich"),
      textStyles: Object.keys(textStyles()).map(function (marker) {
        return { marker: marker, label: textStyles()[marker].label };
      }),
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
    if (el.hasAttribute("data-cms-rich")) {
      // Formatting allowed (Cmd+B/I/U); pasted content still arrives as plain text.
      el.contentEditable = "true";
      el.addEventListener("paste", onRichPaste);
    } else {
      try {
        el.contentEditable = "plaintext-only";
      } catch (e) {
        el.contentEditable = "true";
      }
      if (el.contentEditable !== "plaintext-only") el.contentEditable = "true";
    }
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
    el.removeEventListener("paste", onRichPaste);
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
    var value = readElementValue(selectedEl);
    applyValue(field, value, "text");
    post({ source: "cms-bridge", type: "field-input", field: field, value: value });
  }

  // Wrap the selection in <strong>/<em>/<u>, or unwrap it when it is already
  // inside one. Done by hand rather than with execCommand, which bases its
  // toggle on how the text *looks* (a heading that is bold by design gets
  // "un-bolded" with an inline style the format can't express).
  var SAME_TAGS = { STRONG: ["STRONG", "B"], EM: ["EM", "I"], U: ["U"] };

  function toggleInline(root, tag) {
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    if (!root.contains(range.commonAncestorContainer)) return;
    var node = range.commonAncestorContainer;
    for (var n = node.nodeType === 1 ? node : node.parentElement; n && n !== root; n = n.parentElement) {
      if (SAME_TAGS[tag].indexOf(n.tagName) !== -1) {
        var parent = n.parentNode;
        while (n.firstChild) parent.insertBefore(n.firstChild, n);
        parent.removeChild(n);
        parent.normalize();
        return;
      }
    }
    if (range.collapsed) return;
    var wrapper = document.createElement(tag.toLowerCase());
    wrapper.appendChild(range.extractContents());
    range.insertNode(wrapper);
    sel.removeAllRanges();
    var after = document.createRange();
    after.selectNodeContents(wrapper);
    sel.addRange(after);
  }

  function onRichPaste(e) {
    e.preventDefault();
    var text = (e.clipboardData && e.clipboardData.getData("text/plain")) || "";
    document.execCommand("insertText", false, text.replace(/\s*\n\s*/g, " "));
  }

  function onSelectedKeydown(e) {
    var mod = e.metaKey || e.ctrlKey;
    if (mod && selectedEl.hasAttribute("data-cms-rich") && /^[biu]$/i.test(e.key)) {
      e.preventDefault();
      toggleInline(selectedEl, { b: "STRONG", i: "EM", u: "U" }[e.key.toLowerCase()]);
      onSelectedInput();
      return;
    }
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
  // button, and hovering an item shows a placeholder right after it: clicking
  // that adds a new item in that spot. The CMS records the change and previews
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

  function addListItem(tempId, list, index, item, after) {
    removeListItemClone(tempId);
    var container = listContainer(list);
    if (!container) return;
    var items = itemsOf(container);
    if (!items.length) return;
    var anchor = after == null ? null : findItem(list, after);
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
    if (anchor && anchor.parentNode === container) container.insertBefore(cell, anchor.nextSibling);
    else container.appendChild(cell);
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
        // Items are added from the placeholder that appears when hovering
        // one; only an empty list needs a button to get started.
        if (itemsOf(container).length === 0) {
          var add = document.createElement("button");
          add.type = "button";
          add.className = "cms-list-control cms-list-add";
          add.textContent = "+ Add " + label;
          add.setAttribute("data-cms-list-action", "add");
          add.setAttribute("data-cms-list-path", list);
          container.appendChild(add);
        }
      });
  }

  // ── "Add here" placeholder ──
  // Hovering an item (briefly, so sweeping across a list doesn't make it jump)
  // puts a dashed placeholder right after it, the size of an item. Moving onto
  // the placeholder keeps it; clicking it adds a new item in exactly that spot.
  var ghost = null;
  var ghostTimer = null;

  function onListHover(e) {
    if (!editMode) return;
    var target = e.target;
    if (ghost && (target === ghost || ghost.contains(target))) {
      clearTimeout(ghostTimer);
      return;
    }
    var itemEl = target.closest && target.closest("[data-cms-item]");
    var container = itemEl && itemEl.closest("[data-cms-list]");
    var cell = container && cellOf(container, itemEl);
    clearTimeout(ghostTimer);
    if (!cell || cell.hasAttribute("data-cms-removed")) {
      ghostTimer = setTimeout(hideGhost, 300);
      return;
    }
    if (ghost && ghost.previousSibling === cell) return;
    ghostTimer = setTimeout(function () {
      showGhost(container, cell, itemEl);
    }, 220);
  }

  function showGhost(container, cell, itemEl) {
    hideGhost();
    var label = container.getAttribute("data-cms-list-label") || "item";
    ghost = document.createElement("button");
    ghost.type = "button";
    ghost.className = "cms-list-control cms-list-ghost";
    ghost.setAttribute("data-cms-list-action", "add");
    ghost.setAttribute("data-cms-list-path", container.getAttribute("data-cms-list"));
    ghost.setAttribute("data-cms-list-after", itemEl.getAttribute("data-cms-item"));
    ghost.style.minHeight = cell.getBoundingClientRect().height + "px";
    ghost.innerHTML = '<span class="cms-list-ghost-plus">+</span><span></span>';
    ghost.lastChild.textContent = "Add " + label + " here";
    container.insertBefore(ghost, cell.nextSibling);
  }

  function hideGhost() {
    if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
    ghost = null;
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
      var after = control.getAttribute("data-cms-list-after");
      hideGhost();
      post({
        source: "cms-bridge",
        type: "list-add",
        list: list,
        item: defaults,
        after: after == null ? null : Number(after),
      });
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
      ";color:#fff;}" +
      ".cms-list-ghost{display:flex;flex-direction:column;align-items:center;justify-content:center;" +
      "gap:8px;width:100%;border:2px dashed " + ACCENT + ";border-radius:10px;" +
      "background:rgba(74,111,165,0.06);color:" + ACCENT + ";font-size:13px;" +
      "animation:cms-fade-in .15s ease-out;}" +
      ".cms-list-ghost:hover{background:rgba(74,111,165,0.14);}" +
      ".cms-list-ghost-plus{font-size:28px;font-weight:300;line-height:1;}" +
      "@keyframes cms-fade-in{from{opacity:0}to{opacity:1}}";
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
