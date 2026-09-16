"use client";

import * as React from "react";

import { CATEGORY_LABELS, type TokenMatch } from "@/lib/token-dictionary";
import type { ThemeVarMapping } from "@/lib/parse-theme-vars";
import { semanticTokenGroup } from "@/lib/design-tokens";
import { PRESET_CLASS } from "@/lib/preset-theme";
import { TokenValueCell } from "@/components/catalog/token-value";

type ThemeMode = "light" | "dark" | "presetLight" | "presetDark";

/** Tracks which theme is applied to <html>, so the "Token primitivo"
 *  column shows only the active combination's primitive — not every mode
 *  stacked together — and flips live when either toggle changes the class.
 *  The preset matters here as much as dark mode: with it active `--primary`
 *  resolves through a different ramp, and a column still reading
 *  "brand-600" would be quietly wrong. */
function useThemeMode(): ThemeMode {
  const [mode, setMode] = React.useState<ThemeMode>("light");

  React.useEffect(() => {
    const read = () => {
      const cls = document.documentElement.classList;
      const dark = cls.contains("dark");
      const preset = cls.contains(PRESET_CLASS);
      setMode(preset ? (dark ? "presetDark" : "presetLight") : dark ? "dark" : "light");
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return mode;
}

/** For a color token, the "Token primitivo" column shows only what it
 *  points to in the currently active theme (e.g. picking "destructive"
 *  reads "red-600" in light mode, "red-500" once dark mode is on)
 *  instead of the opaque `--destructive` variable name. Falls back to
 *  "valore diretto" for a literal color (no named primitive) and to
 *  the raw cssVar for anything not a color at all. */
function primitiveLabel(match: TokenMatch, primitives: ThemeVarMapping, mode: ThemeMode): string {
  if (match.category !== "color") return match.cssVar;
  const entry = primitives[match.cssVar];
  if (!entry) return match.cssVar;
  return entry[mode] ?? "valore diretto";
}

export function AutoTokenTable({
  matches,
  file,
  primitives,
}: {
  matches: TokenMatch[];
  file: string;
  primitives: ThemeVarMapping;
}) {
  const mode = useThemeMode();

  if (matches.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nessun token base/semantico rilevato automaticamente in{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">{file}</code>.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border [contain:layout]">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
            <th className="px-3 py-2 font-medium">Parte</th>
            <th className="px-3 py-2 font-medium">Classe Tailwind</th>
            <th className="px-3 py-2 font-medium">Token primitivo</th>
            <th className="px-3 py-2 font-medium">Gruppo</th>
            <th className="px-3 py-2 font-medium">Valore</th>
            <th className="px-3 py-2 font-medium">Categoria</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m.className} className="border-b border-border last:border-0">
              <td className="whitespace-nowrap px-3 py-2 font-medium text-foreground">
                {m.part}
                {m.state ? <span className="font-normal text-muted-foreground"> ({m.state})</span> : null}
              </td>
              <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-foreground">
                {m.className}
              </td>
              <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-muted-foreground">
                {primitiveLabel(m, primitives, mode)}
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-xs text-muted-foreground">
                {semanticTokenGroup(m.cssVar) ?? "—"}
              </td>
              <td className="px-3 py-2">
                <TokenValueCell match={m} />
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-xs text-muted-foreground">
                {CATEGORY_LABELS[m.category]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
