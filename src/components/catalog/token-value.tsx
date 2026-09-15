"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import type { TokenMatch } from "@/lib/token-dictionary";
import { formatBorderRadius, formatBoxShadow } from "@/lib/format-css-value";

/**
 * Converts any valid CSS color string (oklch(), lab(), rgb(), #hex, ...)
 * to sRGB hex by letting a 1x1 canvas do the color-space math — far more
 * robust than regex-parsing rgb()/oklch() ourselves, and it's exactly
 * what the browser itself uses to paint the color.
 */
let probeCtx: CanvasRenderingContext2D | null = null;
function cssColorToHex(value: string): string {
  if (!value) return "";
  if (!probeCtx) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    probeCtx = canvas.getContext("2d", { willReadFrequently: true });
  }
  if (!probeCtx) return value;
  probeCtx.clearRect(0, 0, 1, 1);
  probeCtx.fillStyle = "#000";
  probeCtx.fillStyle = value; // silently ignored if `value` isn't a valid color
  probeCtx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = probeCtx.getImageData(0, 0, 1, 1).data;
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 255 ? `${hex}${toHex(a)}` : hex;
}

/** Tailwind's `/NN` opacity modifier isn't stored in the CSS variable —
 *  it's applied by the utility at use-site — so pull it back out of the
 *  class name and fold it into the hex's alpha byte ourselves. */
function applyOpacityModifier(hex: string, className: string): string {
  const m = className.match(/\/(\d{1,3})$/);
  if (!m || hex.length < 7) return hex;
  const modifier = Math.max(0, Math.min(100, parseInt(m[1], 10))) / 100;
  const baseAlpha = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;
  const alphaByte = Math.round(baseAlpha * modifier * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex.slice(0, 7)}${alphaByte}`;
}

/** Reads the resolved (px) value of a size-ish token by applying the
 *  real Tailwind class to a visually hidden element — a raw `rem`/`em`
 *  CSS-variable value (e.g. ".875rem") isn't what "equals 14px" means. */
function usePixelValue(match: TokenMatch) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [value, setValue] = React.useState("");

  const styleProp = React.useMemo((): keyof CSSStyleDeclaration => {
    switch (match.category) {
      case "radius":
        return "borderRadius";
      case "shadow":
        return "boxShadow";
      case "font-size":
        return "fontSize";
      case "tracking":
        return "letterSpacing";
      case "leading":
      default:
        return "lineHeight";
    }
  }, [match.category]);

  React.useEffect(() => {
    const read = () => {
      if (!ref.current) return;
      setValue(String(getComputedStyle(ref.current)[styleProp] ?? ""));
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [styleProp]);

  return { ref, value };
}

function formatPixelValue(match: TokenMatch, value: string) {
  if (match.category === "radius") return formatBorderRadius(value);
  if (match.category === "shadow") return formatBoxShadow(value, 70);
  return value;
}

function ColorValue({ match }: { match: TokenMatch }) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const read = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue(match.cssVar)
        .trim();
      setValue(applyOpacityModifier(cssColorToHex(raw), match.className));
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [match]);

  return (
    <code className="whitespace-nowrap font-mono text-xs text-foreground" title={value}>
      {value || "…"}
    </code>
  );
}

function FontWeightValue({ match }: { match: TokenMatch }) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const read = () =>
      setValue(
        getComputedStyle(document.documentElement).getPropertyValue(match.cssVar).trim()
      );
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [match]);

  return (
    <code className="whitespace-nowrap font-mono text-xs text-foreground" title={value}>
      {value || "…"}
    </code>
  );
}

function PixelValue({ match }: { match: TokenMatch }) {
  const { ref, value } = usePixelValue(match);
  const formatted = formatPixelValue(match, value);

  return (
    <>
      <span ref={ref} aria-hidden className={cn("sr-only", match.className)}>
        Aa
      </span>
      <code className="whitespace-nowrap font-mono text-xs text-foreground" title={value}>
        {formatted || "…"}
      </code>
    </>
  );
}

export function TokenValueCell({ match }: { match: TokenMatch }) {
  if (match.category === "color") return <ColorValue match={match} />;
  if (match.category === "font-weight") return <FontWeightValue match={match} />;
  return <PixelValue match={match} />;
}
