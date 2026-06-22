import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  fetchHistory,
  formatHistoryDate,
  getVerificationReason,
  getVerificationStatus,
  type QueryHistoryItem,
} from "@/lib/history";
import { Search, ShieldCheck, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/history")({
  head: () => ({ meta: [{ title: "History - Copilot" }] }),
  component: HistoryPage,
});

function HistoryPage() {
  const [q, setQ] = useState("");
  const [history, setHistory] = useState<QueryHistoryItem[]>([]);
  const [active, setActive] = useState<QueryHistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = () => {
    setLoading(true);
    setError(null);

    fetchHistory()
      .then(setHistory)
      .catch((nextError: Error) => {
        setHistory([]);
        setError(nextError.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const filtered = history.filter((h) => {
    const query = q.toLowerCase();

    return (
      h.question.toLowerCase().includes(query) ||
      (h.sql_query ?? "").toLowerCase().includes(query) ||
      (h.connection_id ?? "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Query history</h1>
          <p className="mt-1 text-sm text-muted-foreground">Every stored query and verification result from your backend.</p>
        </div>
        <div className="flex max-w-full items-center gap-2">
          <div className="relative w-80 max-w-full">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search history..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon" onClick={loadHistory} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="overflow-hidden rounded-xl border border-border bg-card/40">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Question</TableHead>
              <TableHead>Connection</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((h) => {
              const status = getVerificationStatus(h.verification);

              return (
                <TableRow key={h.id} className="cursor-pointer" onClick={() => setActive(h)}>
                  <TableCell className="max-w-[560px]">
                    <p className="truncate font-medium">{h.question}</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">{h.sql_query || "No SQL stored"}</p>
                  </TableCell>
                  <TableCell className="max-w-[220px] truncate text-sm text-muted-foreground">
                    {h.connection_id ?? "Unknown"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={status === "PASS" ? "border-success/40 text-success" : "border-destructive/40 text-destructive"}>
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatHistoryDate(h.created_at)}</TableCell>
                </TableRow>
              );
            })}
            {loading && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                  Loading history...
                </TableCell>
              </TableRow>
            )}
            {!loading && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                  No matching queries
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <SheetContent className="w-[640px] overflow-y-auto sm:max-w-[640px]">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle>{active.question}</SheetTitle>
                <SheetDescription>
                  {active.connection_id ?? "Unknown connection"} - {formatHistoryDate(active.created_at)}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      getVerificationStatus(active.verification) === "PASS"
                        ? "border-success/40 text-success"
                        : "border-destructive/40 text-destructive"
                    }
                  >
                    <ShieldCheck className="mr-1 h-3 w-3" /> {getVerificationStatus(active.verification)}
                  </Badge>
                </div>

                {getVerificationReason(active.verification) ? (
                  <p className="rounded-lg border border-border bg-secondary/40 p-3 text-sm text-muted-foreground">
                    {getVerificationReason(active.verification)}
                  </p>
                ) : null}

                <div className="overflow-hidden rounded-lg border border-border bg-secondary/40">
                  <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-1.5">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">SQL</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      disabled={!active.sql_query}
                      onClick={() => {
                        navigator.clipboard.writeText(active.sql_query ?? "");
                        toast.success("Copied SQL");
                      }}
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Copy
                    </Button>
                  </div>
                  <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed">{active.sql_query || "No SQL stored"}</pre>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
