import { createFileRoute } from "@tanstack/react-router";
import { useState , useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { authFetch } from "@/lib/auth-fetch";
import { fetchConnections as fetchApiConnections, toDBKind, type ApiConnection } from "@/lib/connections";
import { DBIcon } from "@/components/db-icon";
import { Plus, MoreHorizontal, Plug, Trash2, Unplug } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/connections")({
  head: () => ({ meta: [{ title: "Connections — Copilot" }] }),
  component: ConnectionsPage,
});

function statusDot(s: string) {
  if (s === "connected") return "bg-success";
  if (s === "error") return "bg-destructive";
  return "bg-muted-foreground";
}

function ConnectionsPage() {
  const [items, setItems] = useState<ApiConnection[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", 
    kind: "postgres", 
    host: "", 
    database: "" ,
    username: "",
    password: "",
    port: "",
    lastUsed: ""
  });
  const [pendingConnectionId, setPendingConnectionId] = useState<string | null>(null);

  const fetchConnections = async () => {
    const data = await fetchApiConnections()
    setItems(data)
  }

  const add = async () => {

    if (!form.name || !form.database) return

    const connection = {
      id: crypto.randomUUID(),
      name: form.name,
      kind: form.kind,
      host: form.host,
      database: form.database,
      status: "idle",
      username: form.username,
      password: form.password,
      port: form.port ? Number(form.port) : null,
      lastUsed: new Date().toISOString()
    }

    await authFetch(
      `${import.meta.env.VITE_API_URL}/connections`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(connection)
      }
    )

    await fetchConnections()

    toast.success(
      `Connected to ${form.name}`
    )

    setForm({
      name: "",
      kind: "postgres",
      host: "",
      database: "",
      username: "",
      password: "",
      port: "",
      lastUsed: ""
    })

    setOpen(false)

  }

  const connect = async (connection: ApiConnection) => {
    setPendingConnectionId(connection.id)

    try {
      const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/connections/test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(connection)
        }
      )

      const data = await response.json()

      await fetchConnections()

      if (!response.ok || data.message?.toLowerCase().includes("failed")) {
        toast.error(data.message ?? `Failed to connect ${connection.name}`)
        return
      }

      toast.success(data.message ?? `Connected ${connection.name}`)
    } finally {
      setPendingConnectionId(null)
    }
  }

  const disconnect = async (connection: ApiConnection) => {
    setPendingConnectionId(connection.id)

    try {
      const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/connections/${connection.id}/disconnect`,
        {
          method: "POST",
        }
      )

      const data = await response.json()

      await fetchConnections()

      if (!response.ok || data.message?.toLowerCase().includes("failed")) {
        toast.error(data.message ?? `Failed to disconnect ${connection.name}`)
        return
      }

      toast.success(data.message ?? `Disconnected ${connection.name}`)
    } finally {
      setPendingConnectionId(null)
    }
  }

  const remove = async (connection: ApiConnection) => {
    await authFetch(
      `${import.meta.env.VITE_API_URL}/connections/${connection.id}`,
      {
        method: "DELETE",
      }
    )

    await fetchConnections()

    toast.success(
      `Deleted ${connection.name}`
    )
  }
  

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Connections</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage the databases Copilot can query.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-1.5 h-4 w-4" /> New connection</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a database</DialogTitle>
              <DialogDescription>Credentials are encrypted at rest and never sent to the model.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2"><Label>Display name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Production" /></div>
              <div className="space-y-2">
                <Label>Engine</Label>
                <Select value={form.kind} onValueChange={(v) => setForm({ ...form, kind: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="postgres">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="sqlite">SQLite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Host</Label><Input value={form.host} onChange={(e) => setForm({ ...form, host: e.target.value })} placeholder="db.acme.io" /></div>
                <div className="space-y-2"><Label>Port</Label><Input type="number" value={form.port} onChange={(e) => setForm({ ...form, port: e.target.value })} placeholder="5432" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Database</Label><Input value={form.database} onChange={(e) => setForm({ ...form, database: e.target.value })} placeholder="acme_prod" /></div>
                <div className="space-y-2"><Label>Username</Label><Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="readonly_user" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Password</Label><Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" /></div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={add}>Connect</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((c) => (
          <Card key={c.id} className="group bg-card/60 transition hover:border-primary/40">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <DBIcon kind={toDBKind(c.kind)} />
                  <div>
                    <p className="font-medium leading-tight">{c.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">{c.host}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 transition group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => remove(c)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{c.database}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`h-1.5 w-1.5 rounded-full ${statusDot(c.status ?? "idle")}`} />
                    <span className="capitalize text-muted-foreground">{c.status ?? "idle"}</span>
                  </div>
                  {c.status === "connected" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      disabled={pendingConnectionId === c.id}
                      onClick={() => disconnect(c)}
                    >
                      <Unplug className="mr-1.5 h-3.5 w-3.5" />
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      disabled={pendingConnectionId === c.id}
                      onClick={() => connect(c)}
                    >
                      <Plug className="mr-1.5 h-3.5 w-3.5" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{c.kind}</Badge>
                <span className="text-xs text-muted-foreground">Last used {c.lastUsed}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
