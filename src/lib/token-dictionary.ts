/**
 * Vocabulary used to recognize Pipelean/Tailwind design tokens inside a
 * component's source and turn them into a readable table row. Keep this
 * in sync with the token names actually defined in src/app/globals.css
 * and src/lib/design-tokens.ts.
 */

export const SEMANTIC_COLOR_NAMES = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "success",
  "success-foreground",
  "warning",
  "warning-foreground",
  "info",
  "info-foreground",
  "border",
  "input",
  "ring",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
] as const;

export const RADIUS_NAMES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"] as const;
export const SHADOW_NAMES = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
export const FONT_SIZE_NAMES = [
  "xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl",
] as const;
export const FONT_WEIGHT_NAMES = [
  "thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black",
] as const;
export const TRACKING_NAMES = ["tighter", "tight", "normal", "wide", "wider", "widest"] as const;
export const LEADING_NAMES = ["none", "tight", "snug", "normal", "relaxed", "loose"] as const;

export type TokenCategory =
  | "color"
  | "radius"
  | "shadow"
  | "font-size"
  | "font-weight"
  | "tracking"
  | "leading";

export type TokenMatch = {
  className: string;
  category: TokenCategory;
  cssVar: string;
  /** Which visual part of the component this class controls (sfondo,
   *  bordo, testo, ...), in Italian to match the rest of the UI. */
  part: string;
};

const COLOR_PREFIXES = ["bg", "text", "border", "ring", "outline", "decoration", "divide", "placeholder", "caret", "fill", "stroke"];

/** Human label for each color-utility prefix — "which part" a bg-*,
 *  text-*, border-*, ... class is painting. */
const COLOR_PREFIX_PARTS: Record<string, string> = {
  bg: "Sfondo",
  text: "Testo",
  border: "Bordo",
  ring: "Anello di focus",
  outline: "Contorno",
  decoration: "Decorazione testo",
  divide: "Separatore tra elementi",
  placeholder: "Testo placeholder",
  caret: "Cursore di testo",
  fill: "Icona (fill)",
  stroke: "Icona (stroke)",
};

function partForColorClass(className: string): string {
  const prefix = className.split("-")[0];
  return COLOR_PREFIX_PARTS[prefix] ?? prefix;
}

const PART_LABELS: Record<Exclude<TokenCategory, "color">, string> = {
  radius: "Raggio degli angoli",
  shadow: "Ombra",
  "font-size": "Dimensione testo",
  "font-weight": "Peso testo",
  tracking: "Spaziatura lettere",
  leading: "Interlinea",
};

function buildRegexes() {
  // Longest-first: regex alternation takes the first alternative that
  // matches, so without this "primary" would win over "primary-foreground"
  // for the input "text-primary-foreground".
  const colorAlt = [...SEMANTIC_COLOR_NAMES].sort((a, b) => b.length - a.length).join("|");
  const prefixAlt = COLOR_PREFIXES.join("|");
  return {
    color: new RegExp(`\\b(?:${prefixAlt})-(?:${colorAlt})(?:/\\d{1,3})?\\b`, "g"),
    // (?!-) rejects "rounded-none" and directional/logical-corner classes
    // (rounded-l-md, rounded-tl-lg, ...): without it, the optional suffix
    // group simply fails to match "-l-md" and falls back to a bare
    // "rounded" match, misreporting a corner-specific or no-op radius as
    // the default scale value.
    radius: new RegExp(`\\brounded(?:-(?:${RADIUS_NAMES.join("|")}))?\\b(?!-)`, "g"),
    shadow: new RegExp(`\\bshadow-(?:${SHADOW_NAMES.join("|")})\\b`, "g"),
    fontSize: new RegExp(`\\btext-(?:${FONT_SIZE_NAMES.join("|")})\\b`, "g"),
    fontWeight: new RegExp(`\\bfont-(?:${FONT_WEIGHT_NAMES.join("|")})\\b`, "g"),
    tracking: new RegExp(`\\btracking-(?:${TRACKING_NAMES.join("|")})\\b`, "g"),
    leading: new RegExp(`\\bleading-(?:${LEADING_NAMES.join("|")})\\b`, "g"),
  };
}

const REGEXES = buildRegexes();

function cssVarForColorClass(className: string): string {
  const [, ...rest] = className.split("-");
  // strip a trailing opacity modifier like /50
  const name = rest.join("-").replace(/\/\d{1,3}$/, "");
  return `--${name}`;
}

/** Scans component source text for every recognized token-bearing
 *  utility class and returns deduplicated, categorized matches. */
export function extractTokenMatches(source: string): TokenMatch[] {
  const seen = new Map<string, TokenMatch>();

  const add = (className: string, category: TokenCategory, cssVar: string, part: string) => {
    if (!seen.has(className)) seen.set(className, { className, category, cssVar, part });
  };

  for (const m of source.match(REGEXES.color) ?? []) {
    add(m, "color", cssVarForColorClass(m), partForColorClass(m));
  }
  for (const m of source.match(REGEXES.radius) ?? []) {
    const suffix = m.includes("-") ? m.split("-").slice(1).join("-") : "sm";
    add(m, "radius", `--radius-${suffix}`, PART_LABELS.radius);
  }
  for (const m of source.match(REGEXES.shadow) ?? []) {
    add(m, "shadow", `--shadow-${m.split("-").slice(1).join("-")}`, PART_LABELS.shadow);
  }
  for (const m of source.match(REGEXES.fontSize) ?? []) {
    add(m, "font-size", `--text-${m.split("-").slice(1).join("-")}`, PART_LABELS["font-size"]);
  }
  for (const m of source.match(REGEXES.fontWeight) ?? []) {
    add(m, "font-weight", `--font-weight-${m.split("-").slice(1).join("-")}`, PART_LABELS["font-weight"]);
  }
  for (const m of source.match(REGEXES.tracking) ?? []) {
    add(m, "tracking", `--tracking-${m.split("-").slice(1).join("-")}`, PART_LABELS.tracking);
  }
  for (const m of source.match(REGEXES.leading) ?? []) {
    add(m, "leading", `--leading-${m.split("-").slice(1).join("-")}`, PART_LABELS.leading);
  }

  return [...seen.values()].sort((a, b) =>
    a.category === b.category ? a.className.localeCompare(b.className) : a.category.localeCompare(b.category)
  );
}

export const CATEGORY_LABELS: Record<TokenCategory, string> = {
  color: "Colore (semantico)",
  radius: "Radius",
  shadow: "Ombra",
  "font-size": "Font size",
  "font-weight": "Font weight",
  tracking: "Tracking",
  leading: "Leading",
};
