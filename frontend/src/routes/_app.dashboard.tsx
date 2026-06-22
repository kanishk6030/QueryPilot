import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchConnections, toDBKind, type ApiConnection } from "@/lib/connections";
import { fetchHistory, getVerificationStatus, type QueryHistoryItem } from "@/lib/history";
import { DBIcon } from "@/components/db-icon";
import { Activity, Database, ShieldCheck, Zap, ArrowUpRight, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard - Copilot" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [connections, setConnections] = useState<ApiConnection[]>([]);
  const [history, setHistory] = useState<QueryHistoryItem[]>([]);

  useEffect(() => {
    fetchConnections()
      .then(setConnections)
      .catch(() => setConnections([]));

    fetchHistory()
      .then(setHistory)
      .catch(() => setHistory([]));
  }, []);

  const liveConnections = connections.filter((c) => c.status === "connected").length;
  const stats = getStats(connections.length, liveConnections, history);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here is what is happening across your data today.</p>
        </div>
        <Button asChild className="shadow-glow">
          <Link to="/chat">
            <MessageSquare className="mr-1.5 h-4 w-4" /> New chat
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-card/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-semibold tracking-tight">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.delta}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-card/60 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Recent queries</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/history">
                View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {history.slice(0, 5).map((q) => {
              const status = getVerificationStatus(q.verification);

              return (
                <div key={q.id} className="flex items-center justify-between rounded-lg border border-border/60 p-3 transition hover:bg-accent/40">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{q.question}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{q.connection_id ?? "Unknown connection"}</p>
                  </div>
                  <Badge variant="outline" className={status === "PASS" ? "border-success/40 text-success" : "border-destructive/40 text-destructive"}>
                    {status}
                  </Badge>
                </div>
              );
            })}
            {history.length === 0 ? <p className="py-6 text-center text-sm text-muted-foreground">No query history yet</p> : null}
          </CardContent>
        </Card>

        <Card className="bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Connections</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/connections">Manage</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {connections.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-lg border border-border/60 p-3">
                <DBIcon kind={toDBKind(c.kind)} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.database}</p>
                </div>
                <span className={`h-1.5 w-1.5 rounded-full ${c.status === "connected" ? "bg-success" : c.status === "error" ? "bg-destructive" : "bg-muted-foreground"}`} />
              </div>
            ))}
            {connections.length === 0 ? <p className="py-6 text-center text-sm text-muted-foreground">No connections yet</p> : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getStats(connectionCount: number, liveConnections: number, history: QueryHistoryItem[]) {
  const today = new Date().toDateString();
  const queriesToday = history.filter((item) => {
    if (!item.created_at) {
      return false;
    }

    const createdAt = new Date(item.created_at);

    return !Number.isNaN(createdAt.getTime()) && createdAt.toDateString() === today;
  }).length;
  const verifiedCount = history.filter((item) => getVerificationStatus(item.verification) === "PASS").length;
  const verificationRate = history.length === 0 ? "0%" : `${Math.round((verifiedCount / history.length) * 100)}%`;

  return [
    { label: "Queries today", value: String(queriesToday), delta: `${history.length} total`, icon: Activity },
    { label: "Connected DBs", value: String(connectionCount), delta: `${liveConnections} live`, icon: Database },
    { label: "Verification rate", value: verificationRate, delta: `${verifiedCount}/${history.length} passed`, icon: ShieldCheck },
    { label: "Recent queries", value: String(Math.min(history.length, 5)), delta: "shown below", icon: Zap },
  ];
}
