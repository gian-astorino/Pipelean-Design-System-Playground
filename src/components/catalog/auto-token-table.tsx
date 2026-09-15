import { CATEGORY_LABELS, type TokenMatch } from "@/lib/token-dictionary";
import type { ThemeVarMapping } from "@/lib/parse-theme-vars";
import { TokenValueCell } from "@/components/catalog/token-value";

/** For a color token, the "Token CSS" column shows what it points to
 *  (light / dark), so picking "destructive" reads "red-600 / red-500"
 *  instead of the opaque `--destructive` variable name. Falls back to
 *  the raw cssVar for anything not resolvable to a named primitive
 *  (literal colors) or not a color at all. */
function primitiveLabel(match: TokenMatch, primitives: ThemeVarMapping): string {
  if (match.category !== "color") return match.cssVar;
  const entry = primitives[match.cssVar];
  if (!entry) return match.cssVar;
  const { light, dark } = entry;
  if (!light && !dark) return "valore diretto";
  if (light === dark) return light ?? "valore diretto";
  return `${light ?? "valore diretto"} / ${dark ?? "valore diretto"}`;
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
            <th className="px-3 py-2 font-medium">Parte</th>
            <th className="px-3 py-2 font-medium">Classe Tailwind</th>
            <th className="px-3 py-2 font-medium">Token primitivo</th>
            <th className="px-3 py-2 font-medium">Valore</th>
            <th className="px-3 py-2 font-medium">Categoria</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m.className} className="border-b border-border last:border-0">
              <td className="whitespace-nowrap px-3 py-2 font-medium text-foreground">{m.part}</td>
              <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-foreground">
                {m.className}
              </td>
              <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-muted-foreground">
                {primitiveLabel(m, primitives)}
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
