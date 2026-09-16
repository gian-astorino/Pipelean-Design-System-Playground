import fs from "node:fs";
import path from "node:path";

export type ThemeVarMapping = Record<
  string,
  {
    light: string | null;
    dark: string | null;
    /** Same roles as above, but as they resolve while the `.theme-preset`
     *  class is active. Only the roles the preset actually repoints differ;
     *  the rest fall back to the base mapping. */
    presetLight: string | null;
    presetDark: string | null;
  }
>;

function parseBlock(css: string, selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) return {};
  const bodyStart = css.indexOf("{", start) + 1;
  let depth = 1;
  let i = bodyStart;
  while (depth > 0 && i < css.length) {
    if (css[i] === "{") depth++;
    if (css[i] === "}") depth--;
    i++;
  }
  const body = css.slice(bodyStart, i - 1);

  const vars: Record<string, string> = {};
  const declRe = /--([\w-]+):\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = declRe.exec(body))) {
    vars[`--${m[1]}`] = m[2].trim();
  }
  return vars;
}

/** A value like "var(--color-red-600)" resolves to the primitive name
 *  "red-600"; a literal (e.g. "oklch(1 0 0)") has no named primitive. */
function toPrimitiveName(value: string): string | null {
  const m = value.match(/^var\(--color-([\w-]+)\)$/);
  return m ? m[1] : null;
}

let cached: ThemeVarMapping | null = null;

/** Reads src/app/globals.css and maps every semantic token (`--primary`,
 *  `--destructive-foreground`, ...) to the base/primitive token it
 *  points at in light and dark mode (e.g. "brand-600", "red-500") —
 *  parsed from the real file so it can never drift from globals.css. */
export function getThemeVarPrimitives(): ThemeVarMapping {
  if (cached) return cached;

  const css = fs.readFileSync(
    path.join(process.cwd(), "src/app/globals.css"),
    "utf-8"
  );
  const light = parseBlock(css, ":root");
  const dark = parseBlock(css, ".dark");
  // The preset repoints a handful of roles; anything it doesn't name keeps
  // resolving through the base blocks above.
  const presetLight = parseBlock(css, ".theme-preset");
  const presetDark = parseBlock(css, ".theme-preset.dark");

  const mapping: ThemeVarMapping = {};
  for (const name of new Set([...Object.keys(light), ...Object.keys(dark)])) {
    const lightPrimitive = light[name] ? toPrimitiveName(light[name]) : null;
    // If `.dark` doesn't redefine this var, the light value applies in
    // both modes via normal CSS cascade — reuse it rather than reading
    // as null, which would otherwise look identical to "dark redefines
    // this as a literal color" (a different, real case, e.g. --card).
    const darkPrimitive = name in dark ? (dark[name] ? toPrimitiveName(dark[name]) : null) : lightPrimitive;
    mapping[name] = {
      light: lightPrimitive,
      dark: darkPrimitive,
      presetLight: name in presetLight ? toPrimitiveName(presetLight[name]) : lightPrimitive,
      presetDark: name in presetDark ? toPrimitiveName(presetDark[name]) : darkPrimitive,
    };
  }
  cached = mapping;
  return mapping;
}
