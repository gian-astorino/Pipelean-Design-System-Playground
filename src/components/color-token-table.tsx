"use client";

import * as React from "react";

import type { BaseTokenGroup, SemanticToken } from "@/lib/design-tokens";

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

/**
 * Semantic tokens are re-pointed inside `.dark { ... }` in globals.css, so
 * light and dark can genuinely differ. `.dark` is a plain class selector
 * (not scoped to <html>), so a hidden element carrying that class — placed
 * anywhere in the document — resolves the dark-mode value via ordinary CSS
 * variable inheritance, no theme switch required. See ColorProbes below.
 */
function useComputedVarBothModes(cssVar: string) {
  const [values, setValues] = React.useState({ light: "", dark: "" });

  React.useEffect(() => {
    const read = () => {
      const light = document.getElementById("token-probe-light");
      const dark = document.getElementById("token-probe-dark");
      setValues({
        light: light ? getComputedStyle(light).getPropertyValue(cssVar).trim() : "",
        dark: dark ? getComputedStyle(dark).getPropertyValue(cssVar).trim() : "",
      });
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });
    return () => observer.disconnect();
  }, [cssVar]);

  return values;
}

/** Two hidden, always-mounted probe elements the dual-mode hook reads
 *  from — render this once near the top of the /tokens page. */
export function ColorProbes() {
  return (
    <>
      <div id="token-probe-light" className="hidden" />
      <div id="token-probe-dark" className="dark hidden" />
    </>
  );
}

function TableShell({
  title,
  description,
  headers,
  children,
}: {
  title: string;
  description: string;
  headers: string[];
  children: React.ReactNode;
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
              {headers.map((h) => (
                <th key={h} className="px-3 py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function BaseColorRow({ cssVar, step }: { cssVar: string; step: string }) {
  const varName = `${cssVar}-${step}`;
  const value = useComputedVar(varName);

  return (
    <tr className="border-b border-border last:border-0">
      <td className="whitespace-nowrap px-3 py-2 font-mono text-sm font-medium text-foreground">
        {step}
      </td>
      <td className="px-3 py-2">
        <div
          className="h-8 w-16 rounded-md border border-border"
          style={{ background: `var(${varName})` }}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-muted-foreground">
        {varName}
      </td>
      <td className="px-3 py-2 font-mono text-xs text-muted-foreground" title={value}>
        {value || "…"}
      </td>
    </tr>
  );
}

export function BaseColorTable({ group }: { group: BaseTokenGroup }) {
  return (
    <TableShell
      title={group.name}
      description={group.description}
      headers={["Token", "Anteprima", "CSS var", "Valore risolto"]}
    >
      {group.steps.map((step) => (
        <BaseColorRow key={step} cssVar={group.cssVar} step={step} />
      ))}
    </TableShell>
  );
}

function ModeValue({ values }: { values: { light: string; dark: string } }) {
  return (
    <div className="flex flex-col gap-0.5">
      <code className="whitespace-nowrap font-mono text-xs text-muted-foreground" title={values.light}>
        ☀ {values.light || "…"}
      </code>
      <code className="whitespace-nowrap font-mono text-xs text-muted-foreground" title={values.dark}>
        ☾ {values.dark || "…"}
      </code>
    </div>
  );
}

function SemanticColorRow({
  token,
  showForegroundColumn,
}: {
  token: SemanticToken;
  showForegroundColumn: boolean;
}) {
  const values = useComputedVarBothModes(token.cssVar);
  const fgValues = useComputedVarBothModes(token.foregroundVar ?? token.cssVar);
  // Live-follows the page's actual current theme, for the preview swatch.
  const liveValue = useComputedVar(token.cssVar);
  const liveFg = useComputedVar(token.foregroundVar ?? token.cssVar);

  return (
    <tr className="border-b border-border last:border-0">
      <td className="whitespace-nowrap px-3 py-2 font-mono text-sm font-medium text-foreground">
        {token.name}
      </td>
      <td className="px-3 py-2">
        <div
          className="flex h-8 w-16 items-center justify-center rounded-md border border-border text-xs font-medium"
          style={{
            background: liveValue ? `var(${token.cssVar})` : undefined,
            color: token.foregroundVar && liveFg ? `var(${token.foregroundVar})` : undefined,
          }}
        >
          Aa
        </div>
      </td>
      <td className="px-3 py-2">
        <span className="font-mono text-xs text-muted-foreground">{token.cssVar}</span>
      </td>
      <td className="px-3 py-2">
        <ModeValue values={values} />
      </td>
      {showForegroundColumn && (
        <td className="px-3 py-2">
          {token.foregroundVar ? (
            <ModeValue values={fgValues} />
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
        </td>
      )}
      <td className="px-3 py-2 text-xs text-muted-foreground">{token.description}</td>
    </tr>
  );
}

export function SemanticColorTable({
  category,
  tokens,
}: {
  category: string;
  tokens: SemanticToken[];
}) {
  const hasForeground = tokens.some((t) => t.foregroundVar);
  return (
    <TableShell
      title={category}
      description="Valore risolto in tema chiaro (☀) e scuro (☾), letto dal vivo senza dover cambiare tema."
      headers={[
        "Token",
        "Anteprima",
        "CSS var",
        "Valore",
        ...(hasForeground ? ["Foreground"] : []),
        "Descrizione",
      ]}
    >
      {tokens.map((token) => (
        <SemanticColorRow key={token.name} token={token} showForegroundColumn={hasForeground} />
      ))}
    </TableShell>
  );
}
