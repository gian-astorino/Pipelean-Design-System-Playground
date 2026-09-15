import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  baseTokenGroups,
  semanticGroups,
  spacingScale,
  radiusScale,
  shadowScale,
  fontSizeScale,
  fontWeightScale,
  trackingScale,
  leadingScale,
  componentTokenMaps,
} from "@/lib/design-tokens";
import { BaseSwatch, SemanticSwatch } from "@/components/token-swatch";
import { ScaleTable } from "@/components/scale-table";
import { ComponentTokenTable } from "@/components/component-token-table";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sections = [
  { href: "#base", label: "1. Base" },
  { href: "#semantici", label: "2. Semantici" },
  { href: "#spacing", label: "3. Spacing" },
  { href: "#radius", label: "4. Radius" },
  { href: "#ombre", label: "5. Ombre" },
  { href: "#tipografia", label: "6. Tipografia" },
  { href: "#componenti", label: "7. Componenti" },
];

export default function TokensPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Button asChild variant="ghost" size="sm" className="w-fit -ml-2">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Home
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            Pipelean Design Tokens
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Ogni swatch legge dal vivo il valore CSS risolto della custom
            property. Modifica un token in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              src/app/globals.css
            </code>{" "}
            e ricarica: qui vedrai esattamente cosa è cambiato.
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

      <section id="base" className="flex scroll-mt-6 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold">1. Token base (primitive)</h2>
          <p className="text-sm text-muted-foreground">
            Valori grezzi, senza significato assegnato. La rampa brand è
            custom Pipelean; il resto arriva dalla palette Tailwind.
          </p>
        </div>
        {baseTokenGroups.map((group) => (
          <div key={group.name} className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <h3 className="font-medium">{group.name}</h3>
              <span className="text-xs text-muted-foreground">
                {group.description}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
              {group.steps.map((step) => (
                <BaseSwatch key={step} cssVar={group.cssVar} step={step} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <Separator />

      <section id="semantici" className="flex scroll-mt-6 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold">2. Token semantici (ruoli)</h2>
          <p className="text-sm text-muted-foreground">
            Nominati per scopo. Ogni ruolo punta a un token base — la freccia
            mostra a cosa punta nel tema chiaro / scuro attuale.
          </p>
        </div>
        {semanticGroups.map((group) => (
          <div key={group.category} className="flex flex-col gap-3">
            <h3 className="font-medium">{group.category}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.tokens.map((token) => (
                <SemanticSwatch key={token.name} {...token} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <Separator />

      <section id="spacing" className="flex scroll-mt-6 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold">3. Spacing &amp; sizing</h2>
          <p className="text-sm text-muted-foreground">
            Nessuna variabile per singolo step: ogni utility <code>p-*</code>,{" "}
            <code>size-*</code>, <code>gap-*</code> calcola{" "}
            <code>n × var(--spacing)</code> al volo. Cambiare il primitivo{" "}
            <code>--spacing</code> in <code>globals.css</code> risca­la tutto
            il sistema in un colpo solo.
          </p>
        </div>
        <ScaleTable
          title="Spacing scale"
          description="Misurata su un elemento reale con classe size-<n>: la larghezza è il valore risolto di n × --spacing."
          rows={spacingScale}
        />
      </section>

      <Separator />

      <section id="radius" className="flex scroll-mt-6 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold">4. Radius</h2>
          <p className="text-sm text-muted-foreground">
            Pipelean sovrascrive <code>sm/md/lg/xl</code> per derivarli dal
            primitivo <code>--radius</code> (vedi{" "}
            <code>@theme inline</code> in globals.css); <code>xs/2xl/3xl/4xl</code>{" "}
            restano gli originali di Tailwind.
          </p>
        </div>
        <ScaleTable
          title="Radius scale"
          description="border-radius risolto su un box reale con la classe rounded-<nome>."
          rows={radiusScale}
        />
      </section>

      <Separator />

      <section id="ombre" className="flex scroll-mt-6 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold">5. Ombre</h2>
          <p className="text-sm text-muted-foreground">
            Scala di default di Tailwind v4 (nessuna sovrascrittura Pipelean
            per ora). <code>Card</code> usa <code>shadow-sm</code>,{" "}
            <code>Input</code> usa <code>shadow-xs</code>.
          </p>
        </div>
        <ScaleTable
          title="Shadow scale"
          description="box-shadow risolto su un box reale con la classe shadow-<nome>."
          rows={shadowScale}
        />
      </section>

      <Separator />

      <section id="tipografia" className="flex scroll-mt-6 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold">6. Tipografia</h2>
          <p className="text-sm text-muted-foreground">
            Dimensione, peso, tracking e line-height: le quattro scale che
            insieme definiscono lo stile del testo in tutta l&apos;app.
          </p>
        </div>
        <ScaleTable
          title="Font size"
          description="font-size (+ line-height abbinata) risolto con la classe text-<nome>."
          rows={fontSizeScale}
        />
        <ScaleTable
          title="Font weight"
          description="font-weight risolto con la classe font-<nome>."
          rows={fontWeightScale}
        />
        <ScaleTable
          title="Letter spacing (tracking)"
          description="letter-spacing risolto con la classe tracking-<nome>."
          rows={trackingScale}
        />
        <ScaleTable
          title="Line height (leading)"
          description="line-height risolto con la classe leading-<nome>."
          rows={leadingScale}
        />
      </section>

      <Separator />

      <section id="componenti" className="flex scroll-mt-6 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold">7. Token dei componenti</h2>
          <p className="text-sm text-muted-foreground">
            Per ogni componente shadcn/ui in <code>src/components/ui</code>,
            quali token semantici e di scala determinano ciascuna sua parte
            visiva.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {componentTokenMaps.map((map) => (
            <ComponentTokenTable key={map.component} map={map} />
          ))}
        </div>
      </section>
    </div>
  );
}
