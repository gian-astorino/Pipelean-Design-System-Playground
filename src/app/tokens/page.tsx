import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { baseTokenGroups, semanticGroups } from "@/lib/design-tokens";
import { BaseSwatch, SemanticSwatch } from "@/components/token-swatch";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

      <section className="flex flex-col gap-6">
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

      <section className="flex flex-col gap-6">
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
    </div>
  );
}
