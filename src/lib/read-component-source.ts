import fs from "node:fs";
import path from "node:path";

/** Reads a vendored ui component's source. Server-only (build-time with
 *  `output: "export"`) — never import this from a "use client" file. */
export function readComponentSource(file: string): string {
  const abs = path.join(process.cwd(), "src/components/ui", file);
  return fs.readFileSync(abs, "utf-8");
}
