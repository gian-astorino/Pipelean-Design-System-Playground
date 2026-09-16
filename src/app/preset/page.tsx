"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Check, Palette, Play, Settings, Trash2 } from "lucide-react";

import { demoRegistry } from "@/components/catalog/demos";
import { PRESET_CLASS, PRESET_STORAGE_KEY } from "@/lib/preset-theme";
import { PresetToggle } from "@/components/preset-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const RAMP_STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

/** The roles that actually move when the brand ramp is swapped. Everything
 *  else in the system is neutral-based and identical in both themes. */
const AFFECTED_ROLES = [
  { role: "--primary", light: "600", dark: "400" },
  { role: "--primary-foreground", light: "50", dark: "950" },
  { role: "--accent", light: "50", dark: "— (neutral)" },
  { role: "--accent-foreground", light: "700", dark: "300" },
  { role: "--ring", light: "500", dark: "400" },
  { role: "--chart-1", light: "500", dark: "400" },
  { role: "--chart-2", light: "700", dark: "300" },
  { role: "--sidebar-primary", light: "600", dark: "400" },
  { role: "--sidebar-primary-foreground", light: "50", dark: "950" },
  { role: "--sidebar-ring", light: "500", dark: "400" },
];

/** The components the product confirmed are in scope for the redesign. */
const SHOWCASE = [
  { slug: "button", label: "Button" },
  { slug: "input", label: "Text input" },
  { slug: "checkbox", label: "Checkbox" },
  { slug: "radio-group", label: "Radio" },
  { slug: "switch", label: "Switch" },
  { slug: "select", label: "Select" },
  { slug: "dropdown-menu", label: "Dropdown" },
];

/** Drives the same <html> class and stored choice as the toggle in every
 *  page header, so the switch here isn't a second, competing source of
 *  truth — flipping it holds while you browse the rest of the playground,
 *  which is the whole point of evaluating a theme. */
function usePresetToggle() {
  const [on, setOn] = React.useState(false);

  React.useEffect(() => {
    const read = () => setOn(document.documentElement.classList.contains(PRESET_CLASS));
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const set = (next: boolean) => {
    document.documentElement.classList.toggle(PRESET_CLASS, next);
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, next ? "1" : "0");
    } catch {
      // private mode / blocked storage: the choice just won't survive a reload
    }
  };

  return { on, setOn: set };
}

function Ramp({ name, cssVar }: { name: string; cssVar: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="font-mono text-xs text-muted-foreground">{name}</span>
      <div className="flex overflow-hidden rounded-md border border-border">
        {RAMP_STEPS.map((step) => (
          <div
            key={step}
            className="h-9 flex-1"
            style={{ background: `var(${cssVar}-${step})` }}
            title={`${cssVar}-${step}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function PresetPage() {
  const { on, setOn } = usePresetToggle();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-10">
      <header className="flex min-w-0 items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Home
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Preset in valutazione</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Confronto A/B fra la rampa brand attuale e la rampa{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">blue</code> del preset{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">b1aIcFPlK</code>. Il tema live non
            viene toccato: il preset è definito su una classe separata e si applica solo qui.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PresetToggle />
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Switch id="preset-toggle" checked={on} onCheckedChange={setOn} />
          <Label htmlFor="preset-toggle" className="text-sm">
            {on ? "Preset — blue" : "Attuale — brand (placeholder indigo)"}
          </Label>
        </div>
        <p className="text-xs text-muted-foreground">
          La scelta vale su <strong className="text-foreground">tutto il playground</strong> e resta
          attiva mentre navighi: vai su Token o su un componente qualsiasi e li vedi con questo tema,
          tabelle dei valori comprese. La trovi anche nell&apos;icona{" "}
          <span className="inline-flex align-middle">
            <Palette className="size-3.5 text-primary" />
          </span>{" "}
          in cima a ogni pagina. Si combina col tema chiaro/scuro, e poiché la classe sta su{" "}
          <code className="rounded bg-muted px-1 py-0.5">&lt;html&gt;</code> cambiano anche i pannelli
          flottanti di select e dropdown, che vivono in un portale fuori dalla pagina.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">1. Le due rampe</h2>
          <p className="text-sm text-muted-foreground">
            Valori presi alla lettera dal pacchetto della CLI shadcn, non ricostruiti a mano.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Ramp name="attuale — brand-* (placeholder, hue 262)" cssVar="--color-brand" />
          <Ramp name="preset — blue" cssVar="--color-preset" />
        </div>
      </section>

      <Separator />

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">2. Cosa cambia davvero</h2>
          <p className="text-sm text-muted-foreground">
            Solo i ruoli che puntano alla rampa brand. Tutto il resto del sistema — superfici, stati,
            struttura — è basato sui neutri ed è identico nei due temi.
          </p>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border [contain:layout]">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
                <th className="px-3 py-2 font-medium">Ruolo</th>
                <th className="px-3 py-2 font-medium">Step (chiaro)</th>
                <th className="px-3 py-2 font-medium">Step (scuro)</th>
                <th className="px-3 py-2 font-medium">Anteprima</th>
              </tr>
            </thead>
            <tbody>
              {AFFECTED_ROLES.map((r) => (
                <tr key={r.role} className="border-b border-border last:border-0">
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-foreground">
                    {r.role}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-muted-foreground">
                    {r.light}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-muted-foreground">
                    {r.dark}
                  </td>
                  <td className="px-3 py-2">
                    <div
                      className="size-6 rounded border border-border"
                      style={{ background: `var(${r.role})` }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Sono <strong className="text-foreground">10 ruoli su 24</strong>. È la misura di quanto il
          brand penetra nel sistema — ed è bassa proprio perché l&apos;architettura a due livelli
          tiene i neutri separati dal colore di marca.
        </p>
      </section>

      <Separator />

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">3. I componenti in perimetro</h2>
          <p className="text-sm text-muted-foreground">
            Quelli confermati dal prodotto. Aziona l&apos;interruttore sopra e guarda cosa si muove.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {SHOWCASE.map(({ slug, label }) => {
            const Demo = demoRegistry[slug];
            if (!Demo) return null;
            return (
              <div key={slug} className="flex min-w-0 flex-col gap-3 rounded-lg border border-border p-4">
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
                <div className="flex min-w-0 flex-1 items-center justify-center">
                  <Demo />
                </div>
              </div>
            );
          })}
          <div className="flex min-w-0 flex-col gap-3 rounded-lg border border-border p-4">
            <span className="text-xs font-medium text-muted-foreground">Icone</span>
            <div className="flex flex-1 items-center justify-center gap-4 text-primary">
              <Play className="size-6" />
              <Check className="size-6" />
              <Settings className="size-6" />
              <Trash2 className="size-6" />
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">4. Cosa questa pagina non mostra</h2>
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <p>
            Il preset <code className="rounded bg-muted px-1 py-0.5 text-xs">b1aIcFPlK</code> contiene
            altre tre cose che <strong className="text-foreground">non</strong> sono riprodotte qui,
            perché richiedono il registry di shadcn che questo ambiente non può raggiungere:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>
              lo stile <code className="rounded bg-muted px-1 py-0.5 text-xs">luma</code>, che cambia
              le ricette dei componenti (e con esse i valori di{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">menuAccent</code> /{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">menuColor</code>);
            </li>
            <li>
              il font <code className="rounded bg-muted px-1 py-0.5 text-xs">inter</code> al posto di
              Geist;
            </li>
            <li>
              l&apos;icon pack <code className="rounded bg-muted px-1 py-0.5 text-xs">phosphor</code> al
              posto di lucide, che da solo tocca 29 file.
            </li>
          </ul>
          <p className="mt-2">
            Quello che vedi è quindi il cambio di colore — la parte visivamente dominante — applicato
            preservando l&apos;architettura a due livelli. Il preset vero, applicato dalla CLI,
            scriverebbe invece i valori direttamente sui ruoli, togliendo lo strato dei primitivi.
          </p>
        </div>
      </section>
    </div>
  );
}
