import { notFound } from "next/navigation";

import { allEntries, getEntry } from "@/lib/components-catalog";
import { readComponentSource } from "@/lib/read-component-source";
import { extractTokenMatches } from "@/lib/token-dictionary";
import { AutoTokenTable } from "@/components/catalog/auto-token-table";
import { ComponentDemo } from "@/components/catalog/demos";

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

  const source = readComponentSource(entry.file);
  const matches = extractTokenMatches(source);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-lg font-semibold">{entry.title}</h2>
        <code className="text-xs text-muted-foreground">src/components/ui/{entry.file}</code>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-muted-foreground">Demo</h3>
        <div className="flex min-h-32 items-center justify-center rounded-lg border border-border p-8">
          <ComponentDemo slug={entry.slug} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-muted-foreground">Token collegati</h3>
        <AutoTokenTable matches={matches} file={entry.file} />
      </div>
    </div>
  );
}
