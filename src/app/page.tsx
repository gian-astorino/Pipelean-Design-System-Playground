import Link from "next/link";
import { ArrowRight, Palette } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const statuses = [
  { label: "Success", className: "bg-success text-success-foreground" },
  { label: "Warning", className: "bg-warning text-warning-foreground" },
  { label: "Info", className: "bg-info text-info-foreground" },
  { label: "Destructive", className: "bg-destructive text-destructive-foreground" },
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Palette className="size-4" />
          </div>
          <span className="font-semibold tracking-tight">Pipelean</span>
        </div>
        <ThemeToggle />
      </header>

      <section className="flex flex-col gap-4">
        <Badge variant="outline" className="w-fit">
          shadcn/ui · Tailwind CSS v4
        </Badge>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance">
          Il design system Pipelean, costruito su shadcn/ui.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Un playground per vedere, componente per componente, l&apos;effetto
          di ogni personalizzazione: token base (primitive) e token
          semantici (ruoli) vivono entrambi in un unico file,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-sm">
            src/app/globals.css
          </code>
          , cos&igrave; ogni modifica &egrave; una riga chiara nel diff.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/tokens">
              Esplora i token
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/components/button/">Libreria componenti</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dependencies">Dipendenze esterne</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Token base</CardTitle>
            <CardDescription>
              Rampa brand Pipelean + palette Tailwind (neutral, red, green,
              amber, blue). Nessun significato assegnato.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            {["bg-brand-300", "bg-brand-500", "bg-brand-700", "bg-brand-900"].map(
              (c) => (
                <div key={c} className={`size-8 rounded-md ${c}`} />
              )
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Token semantici</CardTitle>
            <CardDescription>
              Ruoli per stato pipeline: success, warning, info, oltre al
              destructive di default di shadcn.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <span
                key={s.label}
                className={`rounded-md px-2 py-1 text-xs font-medium ${s.className}`}
              >
                {s.label}
              </span>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dipendenze esterne</CardTitle>
            <CardDescription>
              Font, icon pack e librerie dietro ogni componente — quello che
              vive nel codice, non nei token.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {["Geist", "lucide-react", "radix-ui", "sonner"].map((s) => (
              <span
                key={s}
                className="rounded-md bg-muted px-2 py-1 font-mono text-xs font-medium text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
