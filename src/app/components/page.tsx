import Link from "next/link";

import { catalog, unavailableEntries } from "@/lib/components-catalog";

export default function ComponentsIndexPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold">Libreria componenti Pipelean</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Ogni componente qui sotto è quello vendorizzato in{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">src/components/ui</code>. Scegline
          uno dalla barra laterale per vedere la demo dal vivo e la tabella dei token che
          determinano il suo aspetto.
        </p>
      </div>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((group) => (
          <div key={group.category} className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">{group.category}</h3>
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => (
                <li key={item.slug}>
                  <Link href={`/components/${item.slug}/`} className="text-sm hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Non disponibili come componente singolo nel registro shadcn/ui: {unavailableEntries.join(", ")}{" "}
        — Data Table e Date Picker sono pattern di composizione documentati (Table/Calendar +
        altri componenti), Toast è stato sostituito da Sonner (qui elencato come &quot;Toast&quot;).
      </p>
    </div>
  );
}
