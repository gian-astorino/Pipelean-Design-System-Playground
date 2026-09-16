"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import type { ScaleRow } from "@/lib/design-tokens";
import { formatBorderRadius, formatBoxShadow } from "@/lib/format-css-value";

/** Reads a live computed style property off a real DOM node rendered with
 *  the row's actual Tailwind class — so a customization anywhere in
 *  globals.css (or the Tailwind theme) shows up here without duplicating
 *  Tailwind's own math. */
function useComputedProp(prop: ScaleRow["prop"]) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const read = () => {
      if (!ref.current) return;
      setValue(getComputedStyle(ref.current)[prop]);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [prop]);

  return { ref, value };
}

function formatValue(prop: ScaleRow["prop"], value: string) {
  if (prop === "borderRadius") return formatBorderRadius(value);
  if (prop === "boxShadow") return formatBoxShadow(value, 90);
  return value;
}

/** Renders the row's actual Tailwind class on the exact node being
 *  measured — the measurement ref must sit on this node, not a wrapper,
 *  or getComputedStyle reads the wrong box. */
function Preview({ row, measureRef }: { row: ScaleRow; measureRef: React.Ref<HTMLElement> }) {
  if (row.prop === "width") {
    return (
      <div className="flex h-8 w-32 items-center bg-muted/40">
        <div ref={measureRef as React.Ref<HTMLDivElement>} className={cn(row.className, "bg-brand-500")} />
      </div>
    );
  }
  if (row.prop === "borderRadius") {
    return (
      <div
        ref={measureRef as React.Ref<HTMLDivElement>}
        className={cn(row.className, "size-10 border-2 border-primary bg-accent")}
      />
    );
  }
  if (row.prop === "boxShadow") {
    return (
      <div
        ref={measureRef as React.Ref<HTMLDivElement>}
        className={cn(row.className, "size-10 rounded-md bg-card")}
      />
    );
  }
  // typography props: fontSize, fontWeight, letterSpacing, lineHeight
  return (
    <span ref={measureRef as React.Ref<HTMLSpanElement>} className={cn(row.className, "text-foreground")}>
      Pipelean Aa
    </span>
  );
}

function ScaleTableRow({ row }: { row: ScaleRow }) {
  const { ref, value } = useComputedProp(row.prop);

  return (
    <tr className="border-b border-border last:border-0">
      <td className="whitespace-nowrap px-3 py-2 font-mono text-sm font-medium text-foreground">
        {row.name}
      </td>
      <td className="px-3 py-2">
        <Preview row={row} measureRef={ref} />
      </td>
      <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-muted-foreground">
        {row.className}
      </td>
      <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-muted-foreground">
        {row.cssVar ?? "—"}
      </td>
      <td className="px-3 py-2 font-mono text-xs text-muted-foreground" title={value}>
        {formatValue(row.prop, value) || "…"}
      </td>
      <td className="px-3 py-2 text-xs text-muted-foreground">{row.note ?? ""}</td>
    </tr>
  );
}

export function ScaleTable({
  title,
  description,
  rows,
}: {
  title: string;
  description: string;
  rows: ScaleRow[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border [contain:layout]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
              <th className="px-3 py-2 font-medium">Token</th>
              <th className="px-3 py-2 font-medium">Anteprima</th>
              <th className="px-3 py-2 font-medium">Classe Tailwind</th>
              <th className="px-3 py-2 font-medium">CSS var</th>
              <th className="px-3 py-2 font-medium">Valore risolto</th>
              <th className="px-3 py-2 font-medium">Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <ScaleTableRow key={row.name} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
