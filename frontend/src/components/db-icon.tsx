import type { DBKind } from "@/lib/connections";
import { Database } from "lucide-react";

const palette: Record<DBKind, { bg: string; fg: string; label: string }> = {
  postgres: { bg: "bg-sky-500/15", fg: "text-sky-400", label: "PG" },
  mysql: { bg: "bg-amber-500/15", fg: "text-amber-400", label: "MY" },
  sqlite: { bg: "bg-violet-500/15", fg: "text-violet-400", label: "SQ" },
};

export function DBIcon({ kind, size = "md" }: { kind: DBKind; size?: "sm" | "md" }) {
  const p = palette[kind];
  const dim = size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs";
  return (
    <div className={`flex ${dim} items-center justify-center rounded-md ${p.bg} ${p.fg} font-mono font-semibold ring-1 ring-inset ring-white/5`}>
      {p.label}
    </div>
  );
}

export function DBIconGeneric() {
  return <Database className="h-4 w-4 text-muted-foreground" />;
}
