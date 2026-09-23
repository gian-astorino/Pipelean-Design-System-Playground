# Pipelean Design System

Playground per il design system di Pipelean, basato su [shadcn/ui](https://ui.shadcn.com) + Tailwind CSS v4, Next.js 16 e React 19.

L'obiettivo di questo repo **non** è essere l'app finale, ma un ambiente in cui:

1. tutti i design token (base + semantici) vivono in un unico file, versionato;
2. ogni personalizzazione del brand Pipelean è una modifica leggibile in `git diff`;
3. una pagina `/tokens` mostra dal vivo il valore risolto di ogni token, cosicché sia immediato vedere **cosa** è stato modificato e **come**.

## Avvio rapido

```bash
pnpm install
pnpm dev
```

- `/` — home del design system, con un assaggio dei componenti e dei ruoli.
- `/tokens` — il playground dei token: rampe base (primitive) e token semantici (ruoli), tema chiaro/scuro incluso.

## Architettura dei token

Tutto risiede in [`src/app/globals.css`](./src/app/globals.css), diviso in tre sezioni commentate:

### 1. Token base ("primitive")

Valori grezzi, senza significato assegnato — dichiarati in un blocco `@theme static`:

- **`--color-brand-50…950`** — rampa brand Pipelean (attualmente un **placeholder** in oklch, hue indigo). Da sostituire con la vera palette del brand: cambiando questi 11 valori, ogni token semantico che vi fa riferimento (`primary`, `ring`, `accent`, i `chart-*`, ecc.) si aggiorna automaticamente.
- **`--radius`** — raggio di base da cui derivano `--radius-sm/md/lg/xl`.
- **`--font-sans` / `--font-mono`** — collegati alle variabili di `next/font` (Geist) impostate in `layout.tsx`.
- Il resto della palette (neutral, red, green, amber, blue, ...) arriva gratis da Tailwind stesso (`@import "tailwindcss"`).

### 2. Token semantici ("ruoli")

Nominati per **scopo**, non per valore: `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `chart-1..5`, `sidebar-*`. Ogni ruolo punta a un token base, sia in light (`:root`) che in dark (`.dark`) — cambiare tema significa solo ripuntare gli stessi ruoli a valori diversi, mai rinominarli.

In aggiunta ai ruoli standard di shadcn, per Pipelean sono stati introdotti tre ruoli di **stato pipeline**, pensati per run/step di un workflow:

| Ruolo | Uso |
| --- | --- |
| `success` | step/run completato con successo |
| `warning` | step degradato / richiede attenzione |
| `info` | step in esecuzione / informativo |
| `destructive` (già in shadcn) | step fallito |

### 3. Theme bridge

Un blocco `@theme inline` espone i token semantici come utility Tailwind (`bg-background`, `text-primary-foreground`, `border-border`, ...) e deriva la scala dei radius dal singolo primitivo `--radius`.

## Come personalizzare

- **Ricolorare tutto il brand** → cambia i 11 stop di `--color-brand-*` in `@theme static`. `primary`, `ring`, `accent`, i chart legati al brand seguono a cascata.
- **Cambiare un solo ruolo** (es. solo `warning` in dark mode) → modifica quella singola riga dentro `.dark { ... }`, senza toccare la rampa base.
- **Aggiungere un nuovo ruolo** → aggiungilo sia in `:root`/`.dark` sia nel blocco `@theme inline` (per ottenere le utility `bg-*`/`text-*`), poi in `src/lib/design-tokens.ts` per farlo comparire in `/tokens`.

Ogni modifica di questo tipo resta isolata a poche righe in `globals.css`: il diff stesso documenta "quale token è cambiato e come".

## Componenti

I componenti in `src/components/ui` (Button, Badge, Card, Input, Label, Separator, Switch, Tabs) seguono le convenzioni shadcn/ui (stile *new-york*, `cn()` da `@/lib/utils`, varianti via `class-variance-authority`, primitive da [`radix-ui`](https://www.npmjs.com/package/radix-ui)). Per aggiungerne altri dal registro ufficiale, quando l'ambiente ha accesso di rete a `ui.shadcn.com`:

```bash
pnpm dlx shadcn@latest add <componente>
```

> **Nota sull'ambiente di questa sessione:** in questo sandbox `ui.shadcn.com` era bloccato dalla policy di rete, quindi `shadcn init`/`add` non erano eseguibili direttamente. `components.json` e i componenti in `src/components/ui` sono stati quindi ricostruiti a mano seguendo esattamente le convenzioni shadcn/ui correnti (stile *new-york*, Tailwind v4, `radix-ui`), verificate contro il repository sorgente di shadcn/ui. In un ambiente con accesso a `ui.shadcn.com` i comandi CLI standard funzionano regolarmente.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com) (config CSS-first, nessun `tailwind.config.js`)
- [shadcn/ui](https://ui.shadcn.com) (stile new-york)
- [next-themes](https://github.com/pacocoursey/next-themes) per il toggle chiaro/scuro
- [Hugeicons](https://hugeicons.com) (`@hugeicons/react` + `@hugeicons/core-free-icons`) per le icone
