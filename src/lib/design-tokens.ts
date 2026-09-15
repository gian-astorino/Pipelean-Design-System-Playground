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
