import { CATEGORY_LABELS, type TokenMatch } from "@/lib/token-dictionary";

export function AutoTokenTable({ matches, file }: { matches: TokenMatch[]; file: string }) {
  if (matches.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nessun token base/semantico rilevato automaticamente in{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">{file}</code>.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
            <th className="px-3 py-2 font-medium">Categoria</th>
            <th className="px-3 py-2 font-medium">Classe Tailwind</th>
            <th className="px-3 py-2 font-medium">Token CSS</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m.className} className="border-b border-border last:border-0">
              <td className="whitespace-nowrap px-3 py-2 text-xs text-muted-foreground">
                {CATEGORY_LABELS[m.category]}
              </td>
              <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-foreground">
                {m.className}
              </td>
              <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-muted-foreground">
                {m.cssVar}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
