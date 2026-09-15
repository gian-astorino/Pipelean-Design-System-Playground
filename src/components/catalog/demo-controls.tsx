"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function VariantSelect<T extends string>({
  label,
  value,
  onValueChange,
  options,
}: {
  label: string;
  value: T;
  onValueChange: (value: T) => void;
  options: readonly T[];
}) {
  return (
    <div className="flex items-center gap-2">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={(v) => onValueChange(v as T)}>
        <SelectTrigger size="sm" className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ErrorToggle({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Switch id="error-toggle" checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor="error-toggle" className="text-xs text-muted-foreground">
        Stato di errore
      </Label>
    </div>
  );
}

export function DemoStack({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center gap-4">{children}</div>;
}

export function DemoControls({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center justify-center gap-4">{children}</div>;
}
