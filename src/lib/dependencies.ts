import fs from "node:fs";
import path from "node:path";

export type DependencyInfo = {
  name: string;
  version: string;
  description: string;
  usedBy?: string;
};

export type DependencyGroup = {
  category: string;
  description: string;
  items: DependencyInfo[];
};

/** Package name -> description + (optional) which component it backs.
 *  Kept separate from package.json since versions there can't carry
 *  free-text, but versions ARE read live from package.json below so
 *  this list can never drift out of date on the number itself. */
const DEPENDENCY_INFO: Record<string, { description: string; usedBy?: string }> = {
  "radix-ui": {
    description: "Primitive UI accessibili e senza stile: la base della maggior parte dei componenti.",
    usedBy: "Dialog, Dropdown Menu, Tooltip, Accordion, Popover, Select, Tabs, ...",
  },
  "@base-ui/react": {
    description: "Primitive UI alternativa, usata dove Radix non ha un equivalente diretto.",
    usedBy: "Combobox",
  },
  "@shadcn/react": {
    description: "Pacchetto ufficiale shadcn per i componenti più recenti del registro.",
    usedBy: "Message Scroller",
  },
  cmdk: {
    description: "Motore di ricerca e filtro per command palette.",
    usedBy: "Command",
  },
  "react-day-picker": {
    description: "Motore del calendario: navigazione mesi, selezione singola/range.",
    usedBy: "Calendar",
  },
  "date-fns": {
    description: "Formattazione e calcolo date.",
    usedBy: "Calendar",
  },
  "embla-carousel-react": {
    description: "Motore dello slider: drag, snap, autoplay.",
    usedBy: "Carousel",
  },
  recharts: {
    description: "Libreria di grafici basata su D3.",
    usedBy: "Chart",
  },
  "react-resizable-panels": {
    description: "Pannelli ridimensionabili via drag.",
    usedBy: "Resizable",
  },
  vaul: {
    description: "Drawer con gesture da mobile (swipe-to-dismiss).",
    usedBy: "Drawer",
  },
  "input-otp": {
    description: "Input a caselle per codici OTP.",
    usedBy: "Input OTP",
  },
  sonner: {
    description: "Sistema di notifiche toast.",
    usedBy: "Sonner / Toaster",
  },
  "lucide-react": {
    description: "Icon pack usato in tutta l'app — ogni icona nei demo e nella UI arriva da qui.",
  },
  "next-themes": {
    description: "Gestisce il toggle light/dark/system e la persistenza della preferenza.",
  },
  "class-variance-authority": {
    description: "Definisce le varianti (variant, size, ...) di ogni componente via cva().",
  },
  clsx: {
    description: "Unisce classi condizionalmente — metà dell'utility cn() usata ovunque.",
  },
  "tailwind-merge": {
    description: "Risolve i conflitti tra classi Tailwind sovrapposte — l'altra metà di cn().",
  },
  "tw-animate-css": {
    description: "Utility di animazione per Tailwind v4 (apertura/chiusura di Accordion, Collapsible, ...).",
  },
};

const GROUPS: { category: string; description: string; packages: string[] }[] = [
  {
    category: "Primitive UI",
    description: "Comportamento e accessibilità (focus, tastiera, ARIA), senza stile proprio — lo stile arriva sempre dai token Pipelean.",
    packages: ["radix-ui", "@base-ui/react", "@shadcn/react"],
  },
  {
    category: "Librerie per componente specifico",
    description: "Ogni componente che serve una capacità che Radix non copre nativamente (date, grafici, drag, ...) si appoggia a una libreria dedicata.",
    packages: [
      "cmdk",
      "react-day-picker",
      "date-fns",
      "embla-carousel-react",
      "recharts",
      "react-resizable-panels",
      "vaul",
      "input-otp",
      "sonner",
      "lucide-react",
    ],
  },
  {
    category: "Infrastruttura trasversale",
    description: "Non legate a un componente preciso: usate nel modo in cui ogni componente è costruito.",
    packages: ["next-themes", "class-variance-authority", "clsx", "tailwind-merge", "tw-animate-css"],
  },
];

let cached: DependencyGroup[] | null = null;

/** Reads package.json live so the version column can never drift from
 *  what's actually installed — only the description/usedBy text above
 *  is hand-maintained. */
export function getDependencyGroups(): DependencyGroup[] {
  if (cached) return cached;

  const pkg = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8")
  ) as { dependencies: Record<string, string>; devDependencies: Record<string, string> };
  const allVersions = { ...pkg.dependencies, ...pkg.devDependencies };

  cached = GROUPS.map((group) => ({
    category: group.category,
    description: group.description,
    items: group.packages.map((name) => ({
      name,
      version: allVersions[name] ?? "?",
      description: DEPENDENCY_INFO[name]?.description ?? "",
      usedBy: DEPENDENCY_INFO[name]?.usedBy,
    })),
  }));
  return cached;
}
