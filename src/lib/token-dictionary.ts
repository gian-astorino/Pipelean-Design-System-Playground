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
  /** Which state this class only applies under (hover, dark, focus, ...),
   *  or null when it's unconditional — e.g. "hover:bg-primary/90" and
   *  "dark:bg-destructive/60" both need this, otherwise two rows for
   *  the same "Sfondo" look like unexplained duplicates. */
  state: string | null;
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

// Captures the chain of state modifiers (hover:, dark:, aria-invalid:,
// data-[state=on]:, ...) immediately before a utility class, so a class
// that only applies conditionally can say so instead of looking like an
// unexplained duplicate of the unconditional one. Deliberately doesn't
// try to recognize arbitrary-selector modifiers like "[a&]:" or
// "*:" — unmatched text before a utility is simply left uncaptured,
// which is fine, it just means that particular class gets no state label.
const MODIFIER_SEGMENT = String.raw`[\w-]+(?:\[[^\]]*\])?`;
const MODIFIER_CHAIN = `((?:${MODIFIER_SEGMENT}:)*)`;

function buildRegexes() {
  // Longest-first: regex alternation takes the first alternative that
  // matches, so without this "primary" would win over "primary-foreground"
  // for the input "text-primary-foreground".
  const colorAlt = [...SEMANTIC_COLOR_NAMES].sort((a, b) => b.length - a.length).join("|");
  const prefixAlt = COLOR_PREFIXES.join("|");
  return {
    color: new RegExp(`${MODIFIER_CHAIN}\\b(?:${prefixAlt})-(?:${colorAlt})(?:/\\d{1,3})?\\b`, "g"),
    // (?!-) rejects "rounded-none" and directional/logical-corner classes
    // (rounded-l-md, rounded-tl-lg, ...): without it, the optional suffix
    // group simply fails to match "-l-md" and falls back to a bare
    // "rounded" match, misreporting a corner-specific or no-op radius as
    // the default scale value.
    radius: new RegExp(`${MODIFIER_CHAIN}\\brounded(?:-(?:${RADIUS_NAMES.join("|")}))?\\b(?!-)`, "g"),
    shadow: new RegExp(`${MODIFIER_CHAIN}\\bshadow-(?:${SHADOW_NAMES.join("|")})\\b`, "g"),
    fontSize: new RegExp(`${MODIFIER_CHAIN}\\btext-(?:${FONT_SIZE_NAMES.join("|")})\\b`, "g"),
    fontWeight: new RegExp(`${MODIFIER_CHAIN}\\bfont-(?:${FONT_WEIGHT_NAMES.join("|")})\\b`, "g"),
    tracking: new RegExp(`${MODIFIER_CHAIN}\\btracking-(?:${TRACKING_NAMES.join("|")})\\b`, "g"),
    leading: new RegExp(`${MODIFIER_CHAIN}\\bleading-(?:${LEADING_NAMES.join("|")})\\b`, "g"),
  };
}

const REGEXES = buildRegexes();

/** Friendly Italian label for a single recognized modifier keyword. */
const MODIFIER_LABELS: Record<string, string> = {
  hover: "hover",
  "group-hover": "hover",
  "peer-hover": "hover",
  focus: "focus",
  "focus-visible": "focus",
  "focus-within": "focus",
  "group-focus": "focus",
  "peer-focus": "focus",
  active: "attivo",
  disabled: "disabilitato",
  dark: "dark",
  "aria-invalid": "invalido",
  "aria-selected": "selezionato",
  "aria-checked": "selezionato",
  "aria-disabled": "disabilitato",
  first: "primo elemento",
  last: "ultimo elemento",
};

const DATA_STATE_LABELS: Record<string, string> = {
  on: "attivo",
  off: "inattivo",
  active: "attivo",
  inactive: "inattivo",
  open: "aperto",
  closed: "chiuso",
  checked: "selezionato",
  unchecked: "deselezionato",
};

/** e.g. "data-[state=active]" or "group-data-[state=open]" -> "attivo" / "aperto" */
function labelForDataState(segment: string): string | null {
  const m = segment.match(/^(?:group-|peer-)?data-\[state=([\w-]+)\]$/);
  return m ? (DATA_STATE_LABELS[m[1]] ?? null) : null;
}

/** Turns a captured modifier chain like "dark:focus-visible:" into a
 *  short label like "dark, focus" for the Parte column, or null when
 *  the class is unconditional (or its modifiers aren't recognized). */
function describeModifiers(chain: string): string | null {
  const labels: string[] = [];
  for (const segment of chain.split(":").filter(Boolean)) {
    const label = MODIFIER_LABELS[segment] ?? labelForDataState(segment);
    if (label && !labels.includes(label)) labels.push(label);
  }
  return labels.length ? labels.join(", ") : null;
}

function cssVarForColorClass(className: string): string {
  const [, ...rest] = className.split("-");
  // strip a trailing opacity modifier like /50
  const name = rest.join("-").replace(/\/\d{1,3}$/, "");
  return `--${name}`;
}

/** Runs a MODIFIER_CHAIN-prefixed regex and yields [utilityClassName, state]
 *  pairs — the modifier chain (match[1]) stripped back off match[0] and
 *  turned into a state label, first occurrence wins if the same bare
 *  class shows up under different modifiers. */
function* findUtilities(source: string, regex: RegExp): Generator<[string, string | null]> {
  for (const match of source.matchAll(regex)) {
    const chain = match[1];
    yield [match[0].slice(chain.length), describeModifiers(chain)];
  }
}

/** Scans component source text for every recognized token-bearing
 *  utility class and returns deduplicated, categorized matches. */
export function extractTokenMatches(source: string): TokenMatch[] {
  const seen = new Map<string, TokenMatch>();

  const add = (
    className: string,
    category: TokenCategory,
    cssVar: string,
    part: string,
    state: string | null
  ) => {
    if (!seen.has(className)) seen.set(className, { className, category, cssVar, part, state });
  };

  for (const [m, state] of findUtilities(source, REGEXES.color)) {
    add(m, "color", cssVarForColorClass(m), partForColorClass(m), state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.radius)) {
    const suffix = m.includes("-") ? m.split("-").slice(1).join("-") : "sm";
    add(m, "radius", `--radius-${suffix}`, PART_LABELS.radius, state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.shadow)) {
    add(m, "shadow", `--shadow-${m.split("-").slice(1).join("-")}`, PART_LABELS.shadow, state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.fontSize)) {
    add(m, "font-size", `--text-${m.split("-").slice(1).join("-")}`, PART_LABELS["font-size"], state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.fontWeight)) {
    add(m, "font-weight", `--font-weight-${m.split("-").slice(1).join("-")}`, PART_LABELS["font-weight"], state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.tracking)) {
    add(m, "tracking", `--tracking-${m.split("-").slice(1).join("-")}`, PART_LABELS.tracking, state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.leading)) {
    add(m, "leading", `--leading-${m.split("-").slice(1).join("-")}`, PART_LABELS.leading, state);
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
