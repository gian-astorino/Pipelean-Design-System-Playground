import type { ComponentTokenMap } from "@/lib/design-tokens";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ComponentPreview({ component }: { component: string }) {
  if (component.startsWith("Button")) {
    return <Button>Continua</Button>;
  }
  if (component.startsWith("Badge")) {
    return <Badge variant="outline">In corso</Badge>;
  }
  if (component.startsWith("Card")) {
    return (
      <Card className="w-56">
        <CardHeader>
          <CardTitle className="text-sm">Run #128</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">Completato</CardContent>
      </Card>
    );
  }
  if (component.startsWith("Input")) {
    return <Input placeholder="Cerca pipeline…" className="w-48" />;
  }
  if (component.startsWith("Switch")) {
    return <Switch defaultChecked />;
  }
  return null;
}

export function ComponentTokenTable({ map }: { map: ComponentTokenMap }) {
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-lg border border-border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
        <div>
          <h3 className="font-medium">{map.component}</h3>
          <code className="text-xs text-muted-foreground">{map.file}</code>
        </div>
        <div className="flex items-center">
          <ComponentPreview component={map.component} />
        </div>
      </div>
      <div className="overflow-x-auto px-4 pb-4">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="py-2 pr-3 font-medium">Parte</th>
              <th className="py-2 pr-3 font-medium">Classi</th>
              <th className="py-2 font-medium">Token coinvolti</th>
            </tr>
          </thead>
          <tbody>
            {map.rows.map((row) => (
              <tr key={row.part + row.classes} className="border-b border-border last:border-0">
                <td className="py-2 pr-3 align-top font-medium text-foreground">{row.part}</td>
                <td className="py-2 pr-3 align-top font-mono text-xs text-muted-foreground">
                  {row.classes}
                </td>
                <td className="py-2 align-top font-mono text-xs text-muted-foreground">
                  {row.tokens}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
