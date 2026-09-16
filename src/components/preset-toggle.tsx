"use client";

import * as React from "react";
import { Palette } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PRESET_CLASS, PRESET_STORAGE_KEY } from "@/lib/preset-theme";

/** Reads the preset flag off <html> rather than from its own state, so it
 *  agrees with the inline script that applied the class before first paint
 *  (see layout.tsx) and with any other copy of this control on the page. */
function useIsPresetActive() {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const read = () => setActive(document.documentElement.classList.contains(PRESET_CLASS));
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return active;
}

/**
 * Switches the whole playground between the live brand ramp and the preset
 * under evaluation. Applies the class to <html>, which is what makes the
 * change reach every page, and also the floating panels of select and
 * dropdown — they render in a portal on document.body, outside the page.
 */
export function PresetToggle() {
  const active = useIsPresetActive();

  const toggle = () => {
    const next = !document.documentElement.classList.contains(PRESET_CLASS);
    document.documentElement.classList.toggle(PRESET_CLASS, next);
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, next ? "1" : "0");
    } catch {
      // private mode / blocked storage: the choice just won't survive a reload
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      aria-pressed={active}
      aria-label={active ? "Torna al tema brand" : "Prova il preset in valutazione"}
      title={active ? "Preset blue — attivo" : "Tema brand — attivo"}
      onClick={toggle}
    >
      <Palette className="size-4 text-primary" />
    </Button>
  );
}
