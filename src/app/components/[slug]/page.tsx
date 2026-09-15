import { notFound } from "next/navigation";

import { allEntries, getEntry } from "@/lib/components-catalog";
import { readComponentSourceForTokens } from "@/lib/read-component-source";
import { extractTokenMatches } from "@/lib/token-dictionary";
import { getThemeVarPrimitives } from "@/lib/parse-theme-vars";
import { ComponentDemo } from "@/components/catalog/component-demo";

export function generateStaticParams() {
  return allEntries.map((e) => ({ slug: e.slug }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const source = readComponentSourceForTokens(entry.slug, entry.file);
  const matches = extractTokenMatches(source);
  const primitives = getThemeVarPrimitives();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-lg font-semibold">{entry.title}</h2>
        <code className="text-xs text-muted-foreground">src/components/ui/{entry.file}</code>
      </div>

      <ComponentDemo slug={entry.slug} file={entry.file} matches={matches} primitives={primitives} />
    </div>
  );
}
