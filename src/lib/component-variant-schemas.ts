/**
 * For the handful of components whose visual token set actually changes
 * per variant/size (i.e. their shadcn cva() definition assigns different
 * bg-, text- or border- classes per option), this mirrors that cva()
 * call's `base` string and `variants` object verbatim from the vendored
 * source in src/components/ui. The token table for these components
 * then only extracts tokens from `base + <selected options>`, instead
 * of the whole file, so picking "destructive" shows destructive's
 * tokens only — not every other variant's too.
 *
 * Only components where switching an option actually changes a
 * bg-/text-/border-/shadow-/radius-/font-* token are listed here; for
 * everything else (including variant dimensions driven by a plain
 * data-attribute rather than cva, like Avatar's size or Attachment's
 * state) the token table falls back to scanning the whole file.
 */

export type VariantSchema = {
  base: string;
  dimensions: Record<string, Record<string, string>>;
  defaults: Record<string, string>;
  labels: Record<string, string>;
};

const buttonSchema: VariantSchema = {
  base: "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  dimensions: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
      outline:
        "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2",
      xs: "h-6 gap-1 rounded-md px-2 text-xs",
      sm: "h-8 gap-1.5 rounded-md px-3",
      lg: "h-10 rounded-md px-6",
      icon: "size-9",
      "icon-xs": "size-6 rounded-md",
      "icon-sm": "size-8",
      "icon-lg": "size-10",
    },
  },
  defaults: { variant: "default", size: "default" },
  labels: { variant: "Variant", size: "Size" },
};

const badgeSchema: VariantSchema = {
  base: "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  dimensions: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      destructive:
        "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 hover:bg-destructive/90",
      outline: "border-border text-foreground hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
  },
  defaults: { variant: "default" },
  labels: { variant: "Variant" },
};

const alertSchema: VariantSchema = {
  // Includes AlertTitle's and AlertDescription's own static classes
  // (font-medium/tracking-tight, text-muted-foreground/leading-relaxed) —
  // the demo always renders both alongside Alert itself.
  base: "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm font-medium tracking-tight text-muted-foreground leading-relaxed",
  dimensions: {
    variant: {
      default: "bg-card text-card-foreground",
      // text-destructive/90 styles AlertDescription only in this variant
      destructive: "bg-card text-destructive text-destructive/90",
    },
  },
  defaults: { variant: "default" },
  labels: { variant: "Variant" },
};

const toggleSchema: VariantSchema = {
  base: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40",
  dimensions: {
    variant: {
      default: "bg-transparent",
      outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-9 min-w-9 px-2",
      sm: "h-8 min-w-8 px-1.5",
      lg: "h-10 min-w-10 px-2.5",
    },
  },
  defaults: { variant: "default", size: "default" },
  labels: { variant: "Variant", size: "Size" },
};

const markerSchema: VariantSchema = {
  // hover:text-foreground: styles a nested <a> on hover, from both
  // Marker's own base and MarkerContent's static classes.
  base: "group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-sm text-muted-foreground hover:text-foreground",
  dimensions: {
    variant: {
      default: "",
      separator: "before:bg-border after:bg-border",
      border: "border-b border-border pb-2",
    },
  },
  defaults: { variant: "default" },
  labels: { variant: "Variant" },
};

const itemSchema: VariantSchema = {
  // hover:bg-accent/50 comes from Item's own base (styles it on hover
  // when rendered as an <a> via asChild); the rest come from ItemTitle
  // and ItemDescription's static classes, always rendered by the demo.
  base: "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 hover:bg-accent/50 font-medium leading-snug leading-normal font-normal text-muted-foreground text-primary",
  dimensions: {
    variant: {
      default: "bg-transparent",
      outline: "border-border",
      muted: "bg-muted/50",
    },
    size: {
      default: "gap-4 p-4",
      sm: "gap-2.5 px-4 py-3",
    },
  },
  defaults: { variant: "default", size: "default" },
  labels: { variant: "Variant", size: "Size" },
};

const tabsSchema: VariantSchema = {
  // Includes TabsTrigger's own static classes (always rendered by the
  // demo alongside TabsList) — its colors/radius/ring aren't part of
  // tabsListVariants at all, and most of them apply regardless of
  // TabsList's variant (only the active-tab shadow differs by variant,
  // handled per-option below).
  base: "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground rounded-md border border-transparent text-sm font-medium text-foreground/60 hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-ring dark:text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 after:bg-foreground",
  dimensions: {
    variant: {
      // shadow-sm only styles the active trigger when TabsList is "default"
      default: "bg-muted data-[state=active]:shadow-sm",
      line: "gap-1 bg-transparent",
    },
  },
  defaults: { variant: "default" },
  labels: { variant: "Variant" },
};

const bubbleSchema: VariantSchema = {
  // Includes BubbleContent's own static classes (always rendered by
  // the demo inside Bubble) — its radius/ring aren't part of
  // bubbleVariants, which only styles color per variant.
  base: "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 rounded-xl text-sm leading-relaxed focus-visible:border-ring focus-visible:ring-ring/50",
  dimensions: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "bg-secondary text-secondary-foreground",
      muted: "bg-muted",
      tinted: "text-foreground",
      outline: "border-border bg-background hover:bg-muted hover:text-foreground dark:hover:bg-input/30",
      ghost: "border-none bg-transparent hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
      destructive: "bg-destructive/10 text-destructive dark:bg-destructive/20 hover:bg-destructive/20 dark:hover:bg-destructive/30",
    },
    // align only changes flexbox self-alignment — no token is tied to
    // it, but it stays a real dropdown alongside variant for parity
    // with the demo's existing controls.
    align: { start: "", end: "" },
  },
  defaults: { variant: "default", align: "end" },
  labels: { variant: "Variant", align: "Align" },
};

export const variantSchemas: Record<string, VariantSchema> = {
  button: buttonSchema,
  badge: badgeSchema,
  alert: alertSchema,
  toggle: toggleSchema,
  "toggle-group": toggleSchema,
  marker: markerSchema,
  item: itemSchema,
  tabs: tabsSchema,
  bubble: bubbleSchema,
};

export function activeClassesFor(schema: VariantSchema, selection: Record<string, string>): string {
  const parts = [schema.base];
  for (const [dim, value] of Object.entries(selection)) {
    const cls = schema.dimensions[dim]?.[value];
    if (cls) parts.push(cls);
  }
  return parts.join(" ");
}
