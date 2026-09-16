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
  | "leading"
  | "padding"
  | "size";

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

// "ring-offset" is two words (ring-offset-background sets the ring's
// offset color, distinct from ring-background) — listed, and matched,
// before "ring" so the longer prefix wins.
const COLOR_PREFIXES = ["ring-offset", "bg", "text", "border", "ring", "outline", "decoration", "divide", "placeholder", "caret", "fill", "stroke"];

/** Human label for each color-utility prefix — "which part" a bg-*,
 *  text-*, border-*, ... class is painting. */
const COLOR_PREFIX_PARTS: Record<string, string> = {
  bg: "Sfondo",
  text: "Testo",
  border: "Bordo",
  ring: "Anello di focus",
  "ring-offset": "Offset dell'anello di focus",
  outline: "Contorno",
  decoration: "Decorazione testo",
  divide: "Separatore tra elementi",
  placeholder: "Testo placeholder",
  caret: "Cursore di testo",
  fill: "Icona (fill)",
  stroke: "Icona (stroke)",
};

/** Finds the longest COLOR_PREFIXES entry a class starts with — a plain
 *  split on the first hyphen would break "ring-offset-background" (it'd
 *  chop after "ring", leaving "offset-background" as the "token name"). */
function matchedColorPrefix(className: string): string | undefined {
  return [...COLOR_PREFIXES]
    .sort((a, b) => b.length - a.length)
    .find((p) => className.startsWith(`${p}-`));
}

function partForColorClass(className: string): string {
  const prefix = matchedColorPrefix(className) ?? className.split("-")[0];
  return COLOR_PREFIX_PARTS[prefix] ?? prefix;
}

const PART_LABELS: Record<Exclude<TokenCategory, "color" | "padding" | "size">, string> = {
  radius: "Raggio degli angoli",
  shadow: "Ombra",
  "font-size": "Dimensione testo",
  "font-weight": "Peso testo",
  tracking: "Spaziatura lettere",
  leading: "Interlinea",
};

/** Human label for each padding-utility prefix — p-4 sets every side at
 *  once, px-/py- set a pair, pt-/pr-/pb-/pl- set one side, ps-/pe- are
 *  the logical (writing-direction-aware) start/end equivalents. */
const PADDING_PREFIX_PARTS: Record<string, string> = {
  p: "Padding",
  px: "Padding orizzontale",
  py: "Padding verticale",
  pt: "Padding superiore",
  pr: "Padding destro",
  pb: "Padding inferiore",
  pl: "Padding sinistro",
  ps: "Padding iniziale",
  pe: "Padding finale",
};

/** Human label for each size-utility prefix. */
const SIZE_PREFIX_PARTS: Record<string, string> = {
  w: "Larghezza",
  h: "Altezza",
  size: "Dimensione (larghezza e altezza)",
};

// Captures the chain of state modifiers (hover:, dark:, aria-invalid:,
// data-[state=on]:, ...) immediately before a utility class, so a class
// that only applies conditionally can say so instead of looking like an
// unexplained duplicate of the unconditional one. Deliberately doesn't
// try to recognize arbitrary-selector modifiers like "[a&]:" or
// "*:" — unmatched text before a utility is simply left uncaptured,
// which is fine, it just means that particular class gets no state label.
// The trailing "(?:/[\w-]+)?" absorbs a named-group reference, e.g.
// "group-data-[size=sm]/avatar:size-2" — without it, the "/avatar" breaks
// the segment mid-match and the chain match restarts at "avatar:",
// silently losing the "size=sm" condition that's the whole point of the row.
const MODIFIER_SEGMENT = String.raw`[\w-]+(?:\[[^\]]*\])?(?:/[\w-]+)?`;
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
    // Numeric scale only (p-4, px-2, size-9, ...) — every one of these
    // resolves through the single shared --spacing primitive
    // (calc(var(--spacing) * N)), unlike keyword values (w-full,
    // h-auto, ...) which aren't tied to a design token at all.
    padding: new RegExp(`${MODIFIER_CHAIN}\\bp(?:[xytrblse])?-\\d+(?:\\.\\d+)?\\b`, "g"),
    size: new RegExp(`${MODIFIER_CHAIN}\\b(?:size|w|h)-\\d+(?:\\.\\d+)?\\b`, "g"),
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
  // Responsive breakpoints — Tailwind's min-width scale. Without these,
  // a class like "md:text-sm" next to the unconditional "text-base" looks
  // like two conflicting values on the same element instead of "16px up
  // to 768px, 14px from there".
  sm: "da 640px",
  md: "da 768px",
  lg: "da 1024px",
  xl: "da 1280px",
  "2xl": "da 1536px",
  // Pseudo-elements / pseudo-classes that target a different sub-part of
  // the element, not a conditional state on the element itself — e.g.
  // Input's "file:h-7" sets the height of its file-picker button, not a
  // second height for the input box.
  file: "bottone file",
  placeholder: "placeholder",
  selection: "testo selezionato",
  before: "::before",
  after: "::after",
  marker: "marcatore",
  backdrop: "backdrop",
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
  true: "attivo",
  false: "inattivo",
  top: "lato superiore",
  right: "lato destro",
  bottom: "lato inferiore",
  left: "lato sinistro",
  horizontal: "orizzontale",
  vertical: "verticale",
};

/** e.g. "data-[state=active]" or "group-data-[state=open]" -> "attivo" / "aperto" */
function labelForDataState(segment: string): string | null {
  const m = segment.match(/^(?:group-|peer-)?data-\[state=([\w-]+)\]$/);
  return m ? (DATA_STATE_LABELS[m[1]] ?? null) : null;
}

/** Fallback for any other data-[key=value] / data-[key] / aria-[key=value]
 *  modifier that isn't the well-known "state" shorthand above — e.g.
 *  "group-data-[side=right]" -> "lato destro" would be nice but isn't
 *  worth a bespoke label per key; "side: lato destro" is still far more
 *  useful than the row silently showing no context at all. A leading
 *  "has-" (checked against a descendant, not the element itself) gets
 *  called out explicitly so it doesn't read as a state on the element. */
function labelForAnyAttr(segment: string): string | null {
  const hasDescendant = /^(?:group-|peer-)?has-/.test(segment);
  const base = segment.replace(/^(?:group-|peer-)?(?:has-)?/, "");
  const m = base.match(/^(?:data|aria)-\[([\w-]+)(?:=([\w-]+))?\]$/);
  if (!m) return null;
  const [, key, value] = m;
  const label = value ? `${key}: ${DATA_STATE_LABELS[value] ?? value}` : key;
  return hasDescendant ? `se contiene ${label}` : label;
}

/** Turns a captured modifier chain like "dark:focus-visible:" into a
 *  short label like "dark, focus" for the Parte column, or null when
 *  the class is unconditional. Every segment gets some label — even
 *  an unrecognized data-[...] / aria-[...] attribute falls back to its
 *  raw "key: value" — so a modifier never silently vanishes and leaves a
 *  conditional class looking like an unexplained duplicate. */
function describeModifiers(chain: string): string | null {
  const labels: string[] = [];
  for (const raw of chain.split(":").filter(Boolean)) {
    // drop a trailing named-group reference, e.g. ".../avatar" — it scopes
    // which ancestor the modifier watches, not what the modifier means.
    const segment = raw.replace(/\/[\w-]+$/, "");
    const label = MODIFIER_LABELS[segment] ?? labelForDataState(segment) ?? labelForAnyAttr(segment);
    if (label && !labels.includes(label)) labels.push(label);
  }
  return labels.length ? labels.join(", ") : null;
}

function cssVarForColorClass(className: string): string {
  const prefix = matchedColorPrefix(className);
  const rest = prefix ? className.slice(prefix.length + 1) : className.split("-").slice(1).join("-");
  // strip a trailing opacity modifier like /50
  const name = rest.replace(/\/\d{1,3}$/, "");
  return `--${name}`;
}

function partForPaddingClass(className: string): string {
  const prefix = className.split("-")[0];
  return PADDING_PREFIX_PARTS[prefix] ?? prefix;
}

function partForSizeClass(className: string): string {
  const prefix = className.split("-")[0];
  return SIZE_PREFIX_PARTS[prefix] ?? prefix;
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
  for (const [m, state] of findUtilities(source, REGEXES.padding)) {
    add(m, "padding", "--spacing", partForPaddingClass(m), state);
  }
  for (const [m, state] of findUtilities(source, REGEXES.size)) {
    add(m, "size", "--spacing", partForSizeClass(m), state);
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
  padding: "Padding",
  size: "Size",
};
