"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { catalog } from "@/lib/components-catalog";
import { cn } from "@/lib/utils";

export function CatalogNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 text-sm">
      {catalog.map((group) => (
        <div key={group.category} className="flex flex-col gap-1">
          <span className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {group.category}
          </span>
          {group.items.map((item) => {
            const href = `/components/${item.slug}/`;
            const active = pathname === href || pathname === `/components/${item.slug}`;
            return (
              <Link
                key={item.slug}
                href={href}
                className={cn(
                  "rounded-md px-2 py-1.5 transition-colors",
                  active
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
