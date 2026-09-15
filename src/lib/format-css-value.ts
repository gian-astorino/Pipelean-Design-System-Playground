/** Splits a CSS value list on top-level commas only (ignores commas
 *  nested inside a color function like rgba(0, 0, 0, 0.1)). */
export function splitTopLevel(value: string) {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of value) {
    if (char === "(") depth++;
    if (char === ")") depth--;
    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

const INACTIVE_SHADOW_LAYER = /^rgba?\(0,\s*0,\s*0,\s*0\)\s+0px\s+0px\s+0px\s+0px$/i;

/** box-shadow is composed of several ring/inset placeholder layers
 *  (transparent, zero offset) plus the real shadow layer(s) — drop the
 *  inactive placeholders so the real value is actually visible, and
 *  truncate the (possibly still long) result. */
export function formatBoxShadow(value: string, maxLength = 70) {
  const layers = splitTopLevel(value).filter((l) => !INACTIVE_SHADOW_LAYER.test(l));
  const joined = (layers.length ? layers : splitTopLevel(value)).join(", ");
  return joined.length > maxLength ? `${joined.slice(0, maxLength)}…` : joined;
}

/** Tailwind v4's `rounded-full` is `calc(infinity * 1px)`; browsers
 *  resolve that to their internal max-length clamp, not a literal
 *  "9999px" — show the source expression instead of that huge number. */
export function formatBorderRadius(value: string) {
  const n = parseFloat(value);
  if (Number.isFinite(n) && n > 100000) return "calc(infinity × 1px)";
  return value;
}
