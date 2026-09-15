import fs from "node:fs";
import path from "node:path";

/** Some components use real design tokens without ever writing a plain
 *  bg-/text-/border-/rounded-* Tailwind class for them, so the regex
 *  scan over their own file text finds nothing even though the token
 *  genuinely applies. Each entry appends equivalent Tailwind classes
 *  purely so extraction can find them — it changes nothing about what
 *  actually renders. Two shapes so far:
 *   - Pagination and Calendar style themselves entirely by calling
 *     another component's exported cva variants function (e.g.
 *     button.tsx's `buttonVariants(...)`) — the appended text is
 *     exactly the base + variant + size branches that component really
 *     invokes (verified against its call sites and demo), not the
 *     other variants it never uses (e.g. Button's destructive/link).
 *   - Sonner sets its background/text/border/radius via inline
 *     `style={{ "--normal-bg": "var(--popover)", ... }}` custom
 *     properties instead of Tailwind classes at all.
 *  Keep in sync with the referenced source if it changes. */
const EXTRA_TOKEN_SOURCE: Record<string, string> = {
  // PaginationLink calls buttonVariants({variant: isActive ? "outline" : "ghost", size}),
  // and the demo renders both an active (outline) and inactive (ghost) link,
  // plus PaginationPrevious/Next (size="default") and the default size="icon".
  pagination:
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 dark:hover:bg-accent/50",
  // Calendar's nav buttons call buttonVariants({variant: buttonVariant}),
  // buttonVariant defaulting to "ghost" and never overridden by the demo.
  calendar:
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
  // --normal-bg/--normal-text/--normal-border map 1:1 to these classes'
  // cssVar. --border-radius: var(--radius) has no matching named scale
  // step (bare "rounded" would resolve to --radius-sm, a different var),
  // so it's intentionally left unrepresented rather than shown wrong.
  sonner: "bg-popover text-popover-foreground border-border",
};

/** Reads a vendored ui component's source. Server-only (build-time with
 *  `output: "export"`) — never import this from a "use client" file. */
export function readComponentSource(file: string): string {
  const abs = path.join(process.cwd(), "src/components/ui", file);
  return fs.readFileSync(abs, "utf-8");
}

/** Like readComponentSource, but also appends any extra token classes
 *  the component doesn't spell out as plain Tailwind classes in its own
 *  file (see EXTRA_TOKEN_SOURCE) — use this for token extraction; use
 *  the plain function when showing the source itself. */
export function readComponentSourceForTokens(slug: string, file: string): string {
  const extra = EXTRA_TOKEN_SOURCE[slug];
  return extra ? `${readComponentSource(file)}\n${extra}` : readComponentSource(file);
}
