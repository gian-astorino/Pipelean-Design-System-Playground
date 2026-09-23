import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

import { getDependencyGroups } from "@/lib/dependencies";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sections = [
  { href: "#font", label: "1. Font" },
  { href: "#icone", label: "2. Icon pack" },
  { href: "#librerie", label: "3. Librerie" },
];

function TableShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
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
              <th className="px-3 py-2 font-medium">Pacchetto</th>
              <th className="px-3 py-2 font-medium">Versione</th>
              <th className="px-3 py-2 font-medium">Usato da</th>
              <th className="px-3 py-2 font-medium">Descrizione</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default function DependenciesPage() {
  const groups = getDependencyGroups();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Button asChild variant="ghost" size="sm" className="w-fit -ml-2">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Home
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Dipendenze esterne</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Oltre ai token e ai componenti, il design system si appoggia su font,
            un icon pack e diverse librerie esterne. Nessuna di queste vive nel
            sistema di token: sono scelte fatte a livello di codice, elencate qui
            per avere un quadro completo di cosa c&apos;è &quot;sotto il cofano&quot;.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <nav className="flex flex-wrap gap-x-4 gap-y-1 border-y border-border py-2 text-sm text-muted-foreground">
        {sections.map((s) => (
          <a key={s.href} href={s.href} className="hover:text-foreground">
            {s.label}
          </a>
        ))}
      </nav>

      <section id="font" className="flex scroll-mt-6 flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">1. Font</h2>
          <p className="text-sm text-muted-foreground">
            Caricati con <code className="rounded bg-muted px-1 py-0.5 text-xs">next/font/google</code> in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">src/app/layout.tsx</code>, esposti come
            CSS variable e collegati ai token primitivi{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">--font-sans</code> /{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">--font-mono</code> in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">globals.css</code>.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
            <span className="text-xs text-muted-foreground">Geist — font-sans</span>
            <span className="font-sans text-2xl">Pipelean Aa 123</span>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
            <span className="text-xs text-muted-foreground">Geist Mono — font-mono</span>
            <span className="font-mono text-2xl">Pipelean Aa 123</span>
          </div>
        </div>
      </section>

      <Separator />

      <section id="icone" className="flex scroll-mt-6 flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">2. Icon pack</h2>
          <p className="text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1 py-0.5 text-xs">@hugeicons/react</code> (glifi da{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">@hugeicons/core-free-icons</code>,
            stile Stroke Rounded) — usata in tutta l&apos;app, sia nei demo dei componenti che nella UI
            di questo stesso playground. Nessuna pagina dedicata elenca ancora le icone disponibili.
          </p>
        </div>
      </section>

      <Separator />

      <section id="librerie" className="flex scroll-mt-6 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold">3. Librerie</h2>
          <p className="text-sm text-muted-foreground">
            Versione letta dal vivo da <code className="rounded bg-muted px-1 py-0.5 text-xs">package.json</code>,
            così non va mai fuori sincrono con quella davvero installata.
          </p>
        </div>
        {groups.map((group) => (
          <TableShell key={group.category} title={group.category} description={group.description}>
            {group.items.map((item) => (
              <tr key={item.name} className="border-b border-border last:border-0">
                <td className="whitespace-nowrap px-3 py-2 font-mono text-sm font-medium text-foreground">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-muted-foreground">
                  {item.version}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-xs text-muted-foreground">
                  {item.usedBy ?? "—"}
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">{item.description}</td>
              </tr>
            ))}
          </TableShell>
        ))}
      </section>
    </div>
  );
}
