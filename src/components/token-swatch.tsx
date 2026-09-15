"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Reads the live, resolved value of a CSS custom property from the DOM. */
function useComputedVar(cssVar: string) {
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    const read = () =>
      setValue(
        getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
      );
    read();

    // Re-read on theme toggles (class="dark" flips on <html>) and on any
    // globals.css edit picked up by fast refresh.
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [cssVar]);

  return value;
}

export function BaseSwatch({
  cssVar,
  step,
}: {
  cssVar: string;
  step: string;
}) {
  const varName = `${cssVar}-${step}`;
  const value = useComputedVar(varName);

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-12 w-full rounded-md border border-border"
        style={{ background: `var(${varName})` }}
      />
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="font-medium text-foreground">{step}</span>
        <code className="truncate text-muted-foreground" title={value}>
          {value || "…"}
        </code>
      </div>
    </div>
  );
}

export function SemanticSwatch({
  name,
  cssVar,
  foregroundVar,
  mapsTo,
  description,
}: {
  name: string;
  cssVar: string;
  foregroundVar?: string;
  mapsTo: string;
  description: string;
}) {
  const value = useComputedVar(cssVar);
  const fgValue = useComputedVar(foregroundVar ?? cssVar);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border">
      <div
        className={cn(
          "flex h-16 items-center justify-center text-sm font-medium"
        )}
        style={{
          background: `var(${cssVar})`,
          color: foregroundVar ? `var(${foregroundVar})` : undefined,
        }}
      >
        Aa
      </div>
      <div className="flex flex-col gap-1 bg-card p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-sm font-medium text-foreground">
            {name}
          </span>
          <span className="text-xs text-muted-foreground">→ {mapsTo}</span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <code className="truncate text-[11px] text-muted-foreground" title={value}>
          {cssVar}: {value || "…"}
        </code>
        {foregroundVar && (
          <code className="truncate text-[11px] text-muted-foreground" title={fgValue}>
            {foregroundVar}: {fgValue || "…"}
          </code>
        )}
      </div>
    </div>
  );
}
