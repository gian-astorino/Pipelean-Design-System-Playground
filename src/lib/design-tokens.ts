export type BaseTokenGroup = {
  name: string;
  description: string;
  cssVar: string;
  steps: string[];
};

export type SemanticToken = {
  name: string;
  cssVar: string;
  foregroundVar?: string;
  mapsTo: string;
  description: string;
};

export type SemanticGroup = {
  category: string;
  tokens: SemanticToken[];
};

/**
 * BASE TOKENS (primitives). The Pipelean brand ramp is custom; the rest
 * come straight from Tailwind's built-in palette (already available once
 * `@import "tailwindcss"` runs — nothing to define).
 */
export const baseTokenGroups: BaseTokenGroup[] = [
  {
    name: "Brand",
    description: "Pipelean brand ramp — placeholder, defined in globals.css @theme.",
    cssVar: "--color-brand",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
  },
  {
    name: "Neutral",
    description: "Tailwind built-in neutral ramp — backs surfaces, text, borders.",
    cssVar: "--color-neutral",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
  },
  {
    name: "Red",
    description: "Tailwind built-in — backs the destructive role.",
    cssVar: "--color-red",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
  },
  {
    name: "Green",
    description: "Tailwind built-in — backs the success role.",
    cssVar: "--color-green",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
  },
  {
    name: "Amber",
    description: "Tailwind built-in — backs the warning role.",
    cssVar: "--color-amber",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
  },
  {
    name: "Blue",
    description: "Tailwind built-in — backs the info role.",
    cssVar: "--color-blue",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
  },
];

/**
 * SEMANTIC TOKENS (roles). Each entry's `mapsTo` is the base token it
 * points at in the current (light) theme — see globals.css for the
 * dark-mode mapping of the same role.
 */
export const semanticGroups: SemanticGroup[] = [
  {
    category: "Surfaces",
    tokens: [
      { name: "background", cssVar: "--background", foregroundVar: "--foreground", mapsTo: "white / neutral-950", description: "Page canvas." },
      { name: "card", cssVar: "--card", foregroundVar: "--card-foreground", mapsTo: "white / neutral-900", description: "Raised container surface." },
      { name: "popover", cssVar: "--popover", foregroundVar: "--popover-foreground", mapsTo: "white / neutral-900", description: "Floating surface (menus, popovers)." },
      { name: "sidebar", cssVar: "--sidebar", foregroundVar: "--sidebar-foreground", mapsTo: "neutral-50 / neutral-900", description: "App shell / navigation surface." },
    ],
  },
  {
    category: "Actions",
    tokens: [
      { name: "primary", cssVar: "--primary", foregroundVar: "--primary-foreground", mapsTo: "brand-600 / brand-400", description: "Main call to action." },
      { name: "secondary", cssVar: "--secondary", foregroundVar: "--secondary-foreground", mapsTo: "neutral-100 / neutral-800", description: "Secondary action." },
      { name: "accent", cssVar: "--accent", foregroundVar: "--accent-foreground", mapsTo: "brand-50 / neutral-800", description: "Hover / highlighted state." },
      { name: "muted", cssVar: "--muted", foregroundVar: "--muted-foreground", mapsTo: "neutral-100 / neutral-800", description: "De-emphasized content." },
    ],
  },
  {
    category: "Status (pipeline runs)",
    tokens: [
      { name: "destructive", cssVar: "--destructive", foregroundVar: "--destructive-foreground", mapsTo: "red-600 / red-500", description: "Failed / error state." },
      { name: "success", cssVar: "--success", foregroundVar: "--success-foreground", mapsTo: "green-600 / green-500", description: "Completed / passing state." },
      { name: "warning", cssVar: "--warning", foregroundVar: "--warning-foreground", mapsTo: "amber-500 / amber-400", description: "Degraded / needs-attention state." },
      { name: "info", cssVar: "--info", foregroundVar: "--info-foreground", mapsTo: "blue-600 / blue-500", description: "Running / informational state." },
    ],
  },
  {
    category: "Structure",
    tokens: [
      { name: "border", cssVar: "--border", mapsTo: "neutral-200 / neutral-800", description: "Default border color." },
      { name: "input", cssVar: "--input", mapsTo: "neutral-200 / neutral-800", description: "Form control border." },
      { name: "ring", cssVar: "--ring", mapsTo: "brand-500 / brand-400", description: "Focus ring color." },
    ],
  },
  {
    category: "Charts",
    tokens: [
      { name: "chart-1", cssVar: "--chart-1", mapsTo: "brand-500 / brand-400", description: "Chart series 1." },
      { name: "chart-2", cssVar: "--chart-2", mapsTo: "brand-700 / brand-300", description: "Chart series 2." },
      { name: "chart-3", cssVar: "--chart-3", mapsTo: "neutral-400", description: "Chart series 3." },
      { name: "chart-4", cssVar: "--chart-4", mapsTo: "amber-500 / amber-400", description: "Chart series 4." },
      { name: "chart-5", cssVar: "--chart-5", mapsTo: "green-600 / green-500", description: "Chart series 5." },
    ],
  },
];

/* =====================================================================
 * SCALE TOKENS — spacing, radius, shadow, typography.
 * Tailwind v4 ships these as its own `@theme` defaults (see
 * tailwindcss/theme.css upstream); Pipelean only overrides --radius-*
 * (sm/md/lg/xl) to derive from the single --radius primitive. Each row
 * below is measured live off a real element using the actual utility
 * class, so an override in globals.css shows up here immediately.
 * ===================================================================== */

export type ScaleRow = {
  name: string;
  className: string;
  cssVar?: string;
  prop: "width" | "borderRadius" | "boxShadow" | "fontSize" | "fontWeight" | "letterSpacing" | "lineHeight";
  note?: string;
};

/** Spacing has no per-step CSS var — every s-* utility computes
 *  `calc(var(--spacing) * n)` on the fly, so we measure a `size-<n>` box. */
export const spacingScale: ScaleRow[] = [
  { name: "0", className: "size-0", prop: "width" },
  { name: "px", className: "size-px", prop: "width", note: "fixed 1px, not derived from --spacing" },
  { name: "0.5", className: "size-0.5", prop: "width" },
  { name: "1", className: "size-1", prop: "width" },
  { name: "2", className: "size-2", prop: "width" },
  { name: "3", className: "size-3", prop: "width" },
  { name: "4", className: "size-4", prop: "width" },
  { name: "5", className: "size-5", prop: "width" },
  { name: "6", className: "size-6", prop: "width" },
  { name: "8", className: "size-8", prop: "width" },
  { name: "10", className: "size-10", prop: "width" },
  { name: "12", className: "size-12", prop: "width" },
  { name: "16", className: "size-16", prop: "width" },
  { name: "20", className: "size-20", prop: "width" },
  { name: "24", className: "size-24", prop: "width" },
  { name: "32", className: "size-32", prop: "width" },
];

export const radiusScale: ScaleRow[] = [
  { name: "xs", className: "rounded-xs", cssVar: "--radius-xs", prop: "borderRadius", note: "stock Tailwind" },
  { name: "sm", className: "rounded-sm", cssVar: "--radius-sm", prop: "borderRadius", note: "override → calc(var(--radius) - 4px)" },
  { name: "md", className: "rounded-md", cssVar: "--radius-md", prop: "borderRadius", note: "override → calc(var(--radius) - 2px)" },
  { name: "lg", className: "rounded-lg", cssVar: "--radius-lg", prop: "borderRadius", note: "override → var(--radius)" },
  { name: "xl", className: "rounded-xl", cssVar: "--radius-xl", prop: "borderRadius", note: "override → calc(var(--radius) + 4px)" },
  { name: "2xl", className: "rounded-2xl", cssVar: "--radius-2xl", prop: "borderRadius", note: "stock Tailwind" },
  { name: "3xl", className: "rounded-3xl", cssVar: "--radius-3xl", prop: "borderRadius", note: "stock Tailwind" },
  { name: "4xl", className: "rounded-4xl", cssVar: "--radius-4xl", prop: "borderRadius", note: "stock Tailwind" },
  { name: "full", className: "rounded-full", prop: "borderRadius", note: "static utility, calc(infinity × 1px)" },
];

export const shadowScale: ScaleRow[] = [
  { name: "2xs", className: "shadow-2xs", cssVar: "--shadow-2xs", prop: "boxShadow" },
  { name: "xs", className: "shadow-xs", cssVar: "--shadow-xs", prop: "boxShadow", note: "used by Input" },
  { name: "sm", className: "shadow-sm", cssVar: "--shadow-sm", prop: "boxShadow", note: "used by Card" },
  { name: "md", className: "shadow-md", cssVar: "--shadow-md", prop: "boxShadow" },
  { name: "lg", className: "shadow-lg", cssVar: "--shadow-lg", prop: "boxShadow" },
  { name: "xl", className: "shadow-xl", cssVar: "--shadow-xl", prop: "boxShadow" },
  { name: "2xl", className: "shadow-2xl", cssVar: "--shadow-2xl", prop: "boxShadow" },
];

export const fontSizeScale: ScaleRow[] = [
  { name: "xs", className: "text-xs", cssVar: "--text-xs", prop: "fontSize" },
  { name: "sm", className: "text-sm", cssVar: "--text-sm", prop: "fontSize", note: "default body / component text" },
  { name: "base", className: "text-base", cssVar: "--text-base", prop: "fontSize" },
  { name: "lg", className: "text-lg", cssVar: "--text-lg", prop: "fontSize" },
  { name: "xl", className: "text-xl", cssVar: "--text-xl", prop: "fontSize" },
  { name: "2xl", className: "text-2xl", cssVar: "--text-2xl", prop: "fontSize" },
  { name: "3xl", className: "text-3xl", cssVar: "--text-3xl", prop: "fontSize" },
  { name: "4xl", className: "text-4xl", cssVar: "--text-4xl", prop: "fontSize" },
  { name: "5xl", className: "text-5xl", cssVar: "--text-5xl", prop: "fontSize" },
  { name: "6xl", className: "text-6xl", cssVar: "--text-6xl", prop: "fontSize" },
];

export const fontWeightScale: ScaleRow[] = [
  { name: "thin", className: "font-thin", cssVar: "--font-weight-thin", prop: "fontWeight" },
  { name: "extralight", className: "font-extralight", cssVar: "--font-weight-extralight", prop: "fontWeight" },
  { name: "light", className: "font-light", cssVar: "--font-weight-light", prop: "fontWeight" },
  { name: "normal", className: "font-normal", cssVar: "--font-weight-normal", prop: "fontWeight" },
  { name: "medium", className: "font-medium", cssVar: "--font-weight-medium", prop: "fontWeight", note: "used by Button, Badge" },
  { name: "semibold", className: "font-semibold", cssVar: "--font-weight-semibold", prop: "fontWeight", note: "used by CardTitle" },
  { name: "bold", className: "font-bold", cssVar: "--font-weight-bold", prop: "fontWeight" },
  { name: "extrabold", className: "font-extrabold", cssVar: "--font-weight-extrabold", prop: "fontWeight" },
  { name: "black", className: "font-black", cssVar: "--font-weight-black", prop: "fontWeight" },
];

export const trackingScale: ScaleRow[] = [
  { name: "tighter", className: "tracking-tighter", cssVar: "--tracking-tighter", prop: "letterSpacing" },
  { name: "tight", className: "tracking-tight", cssVar: "--tracking-tight", prop: "letterSpacing", note: "used by CardTitle" },
  { name: "normal", className: "tracking-normal", cssVar: "--tracking-normal", prop: "letterSpacing" },
  { name: "wide", className: "tracking-wide", cssVar: "--tracking-wide", prop: "letterSpacing" },
  { name: "wider", className: "tracking-wider", cssVar: "--tracking-wider", prop: "letterSpacing" },
  { name: "widest", className: "tracking-widest", cssVar: "--tracking-widest", prop: "letterSpacing" },
];

export const leadingScale: ScaleRow[] = [
  { name: "none", className: "leading-none", prop: "lineHeight", note: "static utility (1), no var" },
  { name: "tight", className: "leading-tight", cssVar: "--leading-tight", prop: "lineHeight" },
  { name: "snug", className: "leading-snug", cssVar: "--leading-snug", prop: "lineHeight" },
  { name: "normal", className: "leading-normal", cssVar: "--leading-normal", prop: "lineHeight" },
  { name: "relaxed", className: "leading-relaxed", cssVar: "--leading-relaxed", prop: "lineHeight" },
  { name: "loose", className: "leading-loose", cssVar: "--leading-loose", prop: "lineHeight" },
];

/* =====================================================================
 * COMPONENT TOKENS — which semantic/scale tokens each shadcn component
 * actually consumes. Static documentation (read from the component
 * source in src/components/ui), paired with a live preview.
 * ===================================================================== */

export type ComponentTokenRow = {
  part: string;
  classes: string;
  tokens: string;
};

export type ComponentTokenMap = {
  component: string;
  file: string;
  rows: ComponentTokenRow[];
};

export const componentTokenMaps: ComponentTokenMap[] = [
  {
    component: "Button (default / default)",
    file: "src/components/ui/button.tsx",
    rows: [
      { part: "sfondo", classes: "bg-primary hover:bg-primary/90", tokens: "--primary" },
      { part: "testo", classes: "text-primary-foreground", tokens: "--primary-foreground" },
      { part: "raggio", classes: "rounded-md", tokens: "--radius-md (override Pipelean)" },
      { part: "altezza", classes: "h-9", tokens: "9 × --spacing" },
      { part: "padding orizz.", classes: "px-4", tokens: "4 × --spacing" },
      { part: "testo", classes: "text-sm font-medium", tokens: "--text-sm, --font-weight-medium" },
      { part: "focus ring", classes: "focus-visible:ring-ring/50", tokens: "--ring" },
    ],
  },
  {
    component: "Badge (outline)",
    file: "src/components/ui/badge.tsx",
    rows: [
      { part: "bordo", classes: "border", tokens: "--border" },
      { part: "raggio", classes: "rounded-md", tokens: "--radius-md (override Pipelean)" },
      { part: "padding", classes: "px-2 py-0.5", tokens: "2 / 0.5 × --spacing" },
      { part: "testo", classes: "text-xs font-medium", tokens: "--text-xs, --font-weight-medium" },
    ],
  },
  {
    component: "Card",
    file: "src/components/ui/card.tsx",
    rows: [
      { part: "sfondo", classes: "bg-card", tokens: "--card" },
      { part: "testo", classes: "text-card-foreground", tokens: "--card-foreground" },
      { part: "bordo", classes: "border", tokens: "--border" },
      { part: "raggio", classes: "rounded-xl", tokens: "--radius-xl (override Pipelean)" },
      { part: "ombra", classes: "shadow-sm", tokens: "--shadow-sm (stock Tailwind)" },
      { part: "padding vert.", classes: "py-6", tokens: "6 × --spacing" },
      { part: "gap sezioni", classes: "gap-6", tokens: "6 × --spacing" },
    ],
  },
  {
    component: "Input",
    file: "src/components/ui/input.tsx",
    rows: [
      { part: "bordo", classes: "border-input", tokens: "--input" },
      { part: "sfondo", classes: "bg-transparent", tokens: "—" },
      { part: "raggio", classes: "rounded-md", tokens: "--radius-md (override Pipelean)" },
      { part: "ombra", classes: "shadow-xs", tokens: "--shadow-xs (stock Tailwind)" },
      { part: "altezza", classes: "h-9", tokens: "9 × --spacing" },
      { part: "testo", classes: "text-base md:text-sm", tokens: "--text-base / --text-sm" },
      { part: "focus ring", classes: "focus-visible:ring-ring/50", tokens: "--ring" },
    ],
  },
  {
    component: "Switch (checked)",
    file: "src/components/ui/switch.tsx",
    rows: [
      { part: "sfondo on", classes: "data-[state=checked]:bg-primary", tokens: "--primary" },
      { part: "sfondo off", classes: "data-[state=unchecked]:bg-input", tokens: "--input" },
      { part: "raggio", classes: "rounded-full", tokens: "static, calc(infinity × 1px)" },
      { part: "focus ring", classes: "focus-visible:ring-ring/50", tokens: "--ring" },
    ],
  },
];
