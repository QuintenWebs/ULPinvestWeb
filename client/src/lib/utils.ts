import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * tel: link for a phone number as it is written on the page, so editing the
 * number in the CMS also updates where the link dials. Anything after "(" is a
 * label, not part of the number. Numbers written the Dutch way ("06 …") get the
 * +31 country code, since ULP Invest is a Dutch foundation.
 */
export function telHref(text: string): string {
  let n = text.split("(")[0].replace(/[^\d+]/g, "");
  if (n.startsWith("00")) n = "+" + n.slice(2);
  else if (n.startsWith("0")) n = "+31" + n.slice(1);
  return `tel:${n}`;
}
