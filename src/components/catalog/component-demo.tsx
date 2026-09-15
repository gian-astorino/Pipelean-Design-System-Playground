"use client";

import * as React from "react";

import { extractTokenMatches, type TokenMatch } from "@/lib/token-dictionary";
import type { ThemeVarMapping } from "@/lib/parse-theme-vars";
import { activeClassesFor, variantSchemas } from "@/lib/component-variant-schemas";
import { AutoTokenTable } from "@/components/catalog/auto-token-table";
import { DemoControls, VariantSelect } from "@/components/catalog/demo-controls";
import { demoRegistry, variantRenderers } from "@/components/catalog/demos";

function VariantShowcase({
  slug,
  file,
  primitives,
}: {
  slug: string;
  file: string;
  primitives: ThemeVarMapping;
}) {
  const schema = variantSchemas[slug];
  const [selection, setSelection] = React.useState<Record<string, string>>(schema.defaults);

  const matches: TokenMatch[] = React.useMemo(
    () => extractTokenMatches(activeClassesFor(schema, selection)),
    [schema, selection]
  );

  const renderDemo = variantRenderers[slug];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-muted-foreground">Demo</h3>
        <div className="flex min-h-32 flex-col items-center justify-center gap-6 rounded-lg border border-border p-8">
          <DemoControls>
            {Object.entries(schema.dimensions).map(([dim, options]) => (
              <VariantSelect
                key={dim}
                label={schema.labels[dim] ?? dim}
                value={selection[dim]}
                onValueChange={(v) => setSelection((s) => ({ ...s, [dim]: v }))}
                options={Object.keys(options)}
              />
            ))}
          </DemoControls>
          {renderDemo ? renderDemo(selection) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-muted-foreground">Token collegati</h3>
        <AutoTokenTable matches={matches} file={file} primitives={primitives} />
      </div>
    </div>
  );
}

/** Single client-side entry point for a component page's Demo + Token
 *  collegati sections. Kept as one component (rather than page.tsx
 *  rendering each section separately) so both the schema-driven and the
 *  whole-file-scan components share one place that indexes demoRegistry
 *  / variantRenderers — a Server Component must never index a plain
 *  object exported from a "use client" module itself. */
export function ComponentDemo({
  slug,
  file,
  matches,
  primitives,
}: {
  slug: string;
  file: string;
  matches: TokenMatch[];
  primitives: ThemeVarMapping;
}) {
  if (variantSchemas[slug]) {
    return <VariantShowcase slug={slug} file={file} primitives={primitives} />;
  }

  const Demo = demoRegistry[slug];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-muted-foreground">Demo</h3>
        <div className="flex min-h-32 items-center justify-center rounded-lg border border-border p-8">
          {Demo ? <Demo /> : <p className="text-sm text-muted-foreground">Demo non disponibile.</p>}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-muted-foreground">Token collegati</h3>
        <AutoTokenTable matches={matches} file={file} primitives={primitives} />
      </div>
    </div>
  );
}
