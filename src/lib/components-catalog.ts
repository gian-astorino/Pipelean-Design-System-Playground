export type CatalogEntry = {
  slug: string;
  title: string;
  file: string;
};

export type CatalogCategory = {
  category: string;
  items: CatalogEntry[];
};

function entry(title: string, slug: string, file?: string): CatalogEntry {
  return { title, slug, file: file ?? `${slug}.tsx` };
}

export const catalog: CatalogCategory[] = [
  {
    category: "Layout",
    items: [
      entry("Aspect Ratio", "aspect-ratio"),
      entry("Resizable", "resizable"),
      entry("Scroll Area", "scroll-area"),
      entry("Separator", "separator"),
      entry("Sidebar", "sidebar"),
      entry("Skeleton", "skeleton"),
    ],
  },
  {
    category: "Navigazione",
    items: [
      entry("Breadcrumb", "breadcrumb"),
      entry("Menubar", "menubar"),
      entry("Navigation Menu", "navigation-menu"),
      entry("Pagination", "pagination"),
      entry("Tabs", "tabs"),
    ],
  },
  {
    category: "Form & Input",
    items: [
      entry("Button", "button"),
      entry("Button Group", "button-group"),
      entry("Checkbox", "checkbox"),
      entry("Combobox", "combobox"),
      entry("Field", "field"),
      entry("Input", "input"),
      entry("Input Group", "input-group"),
      entry("Input OTP", "input-otp"),
      entry("Label", "label"),
      entry("Native Select", "native-select"),
      entry("Radio Group", "radio-group"),
      entry("Select", "select"),
      entry("Slider", "slider"),
      entry("Switch", "switch"),
      entry("Textarea", "textarea"),
      entry("Toggle", "toggle"),
      entry("Toggle Group", "toggle-group"),
    ],
  },
  {
    category: "Overlay",
    items: [
      entry("Alert Dialog", "alert-dialog"),
      entry("Context Menu", "context-menu"),
      entry("Dialog", "dialog"),
      entry("Drawer", "drawer"),
      entry("Dropdown Menu", "dropdown-menu"),
      entry("Hover Card", "hover-card"),
      entry("Popover", "popover"),
      entry("Sheet", "sheet"),
      entry("Tooltip", "tooltip"),
    ],
  },
  {
    category: "Data display",
    items: [
      entry("Accordion", "accordion"),
      entry("Avatar", "avatar"),
      entry("Badge", "badge"),
      entry("Calendar", "calendar"),
      entry("Card", "card"),
      entry("Carousel", "carousel"),
      entry("Chart", "chart"),
      entry("Collapsible", "collapsible"),
      entry("Empty", "empty"),
      entry("Item", "item"),
      entry("Kbd", "kbd"),
      entry("Marker", "marker"),
      entry("Table", "table"),
    ],
  },
  {
    category: "Feedback",
    items: [
      entry("Alert", "alert"),
      entry("Progress", "progress"),
      entry("Toast", "sonner"),
      entry("Spinner", "spinner"),
    ],
  },
  {
    category: "AI / Chat",
    items: [
      entry("Attachment", "attachment"),
      entry("Bubble", "bubble"),
      entry("Message", "message"),
      entry("Message Scroller", "message-scroller"),
    ],
  },
  {
    category: "Comandi & utility",
    items: [
      entry("Command", "command"),
      entry("Direction", "direction"),
    ],
  },
];

export const allEntries: CatalogEntry[] = catalog.flatMap((c) => c.items);

export function getEntry(slug: string): CatalogEntry | undefined {
  return allEntries.find((e) => e.slug === slug);
}

/** Requested but not present in the shadcn/ui registry as a standalone
 *  component — Data Table and Date Picker are composition guides (Table
 *  + TanStack Table, Calendar + Popover), not single importable files;
 *  Toast was replaced by Sonner (listed above as "Toast"). */
export const unavailableEntries = ["Data Table", "Date Picker", "QuestionnaireNew"];
