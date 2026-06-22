import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { authFetch } from "@/lib/auth-fetch";
import { fetchConnections, toDBKind, type ApiConnection } from "@/lib/connections";
import { DBIcon } from "@/components/db-icon";
import { ArrowUp, CheckCircle2, ChevronDown, Circle, Copy, Database, FileSearch, Loader2, Play, Route as RouteIcon, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/chat")({
  head: () => ({ meta: [{ title: "Chat — Copilot" }] }),
  component: ChatPage,
});

type ResultRow = Record<string, string | number | boolean | null>;
type VerificationPayload = "PASS" | "FAIL" | { status?: string; reason?: string | null } | null | undefined;
type ActivityStep = {
  label: string;
  detail: string;
  Icon: typeof Sparkles;
};

type Msg =
  | {
      role: "user";
      text: string;
      id: string;
    }
  | {
      role: "assistant";
      id: string;
      sql: string;
      rows: ResultRow[];
      rowCount: number;
      durationMs: number;
      verification: "PASS" | "FAIL";
      explanation: string;
    };

type ChatHistoryItem = {
  id?: string | number;
  role?: string;
  content?: string | null;
  message?: string | null;
  created_at?: string;
};

const forbiddenOperations = [
  "DROP",
  "DELETE",
  "ALTER",
  "TRUNCATE",
  "INSERT",
  "UPDATE",
  "REPLACE",
  "CREATE",
];

const activitySteps: ActivityStep[] = [
  {
    label: "Understanding your question",
    detail: "Classifying the request and preparing context.",
    Icon: Sparkles,
  },
  {
    label: "Routing to the right agent",
    detail: "Choosing between database reasoning and general chat.",
    Icon: RouteIcon,
  },
  {
    label: "Inspecting database context",
    detail: "Using the selected connection and available tools.",
    Icon: Database,
  },
  {
    label: "Generating and running SQL",
    detail: "Building a query, executing it, and reading the result.",
    Icon: FileSearch,
  },
  {
    label: "Verifying the answer",
    detail: "Checking that the response matches the SQL result.",
    Icon: ShieldCheck,
  },
];

function verificationStatus(verification: VerificationPayload): "PASS" | "FAIL" {
  const status =
    typeof verification === "string"
      ? verification
      : verification?.status;

  return status?.trim().toUpperCase() === "PASS" ? "PASS" : "FAIL";
}

function getForbiddenOperation(value: string) {
  const upperValue = value.toUpperCase();

  return forbiddenOperations.find((operation) => new RegExp(`\\b${operation}\\b`).test(upperValue));
}

function forbiddenOperationMessage(operation: string) {
  return `Can't perform this ${operation} operation`;
}

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [connections, setConnections] = useState<ApiConnection[]>([]);
  const [conn, setConn] = useState("");
  const [busy, setBusy] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [deletingHistory, setDeletingHistory] = useState(false);
  const [activityStep, setActivityStep] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedConnection = connections.find((connection) => connection.id === conn);

  useEffect(() => {
    fetchConnections()
      .then((data) => {
        const connectedConnections = data.filter((connection) => connection.status === "connected");

        setConnections(connectedConnections);
        setConn((current) =>
          connectedConnections.some((connection) => connection.id === current)
            ? current
            : connectedConnections[0]?.id || "",
        );
      })
      .catch(() => toast.error("Failed to load connections"));
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      setHistoryLoading(true);

      try {
        const response = await authFetch(`${import.meta.env.VITE_API_URL}/chat/history`);

        if (!response.ok) {
          throw new Error("Failed to load chat history");
        }

        const history: ChatHistoryItem[] = await response.json();

        setMessages(history.map(toMessage).filter((message): message is Msg => Boolean(message)));
      } catch (error) {
        console.error(error);
        toast.error("Failed to load chat history");
      } finally {
        setHistoryLoading(false);
      }
    };

    loadHistory();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    if (!busy) {
      setActivityStep(0);
      setElapsedMs(0);
      return;
    }

    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;

      setElapsedMs(elapsed);
      setActivityStep(Math.min(Math.floor(elapsed / 1400), activitySteps.length - 1));
    }, 250);

    return () => window.clearInterval(interval);
  }, [busy]);

  const send = async () => {
     const text = input.trim();

      if (!text || busy) return;

      const forbiddenOperation = getForbiddenOperation(text);

      if (forbiddenOperation) {
        toast.error(forbiddenOperationMessage(forbiddenOperation));
        return;
      }

      if (!conn) {
        toast.error("Connect a database before starting a chat");
        return;
      }

      const userMsg: Msg = {
        role: "user",
        id: crypto.randomUUID(),
        text,
      };

      setMessages((m) => [...m, userMsg]);

      setInput("");

      setBusy(true);

      try {

        const response = await authFetch(
          `${import.meta.env.VITE_API_URL}/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question: text,
              connection_id: conn || null,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok || data.error) {
          const unsafeOperation =
            typeof data.error === "string"
              ? getForbiddenOperation(data.error)
              : null;

          toast.error(
            unsafeOperation
              ? forbiddenOperationMessage(unsafeOperation)
              : data.error || "Failed to contact backend",
          );
          return;
        }

        const unsafeOperation =
          getForbiddenOperation(data.answer ?? "") ||
          getForbiddenOperation(data.sql_query ?? "");

        if (unsafeOperation) {
          toast.error(forbiddenOperationMessage(unsafeOperation));
          return;
        }

        const reply: Msg = {
          role: "assistant",
          id: crypto.randomUUID(),

          explanation: data.answer,

          sql: data.sql_query || "No SQL Generated",

          rows: data.sql_result?.rows ?? [],

          rowCount: data.sql_result?.rows?.length ?? 0,

          durationMs: 0,

          verification: verificationStatus(data.verification),
        };

        setMessages((m) => [...m, reply]);

      } catch (error) {

        console.error(error);

        toast.error("Failed to contact backend");

      } finally {

        setBusy(false);

      }
  };

  const deleteHistory = async () => {
    if (deletingHistory) return;

    setDeletingHistory(true);

    try {
      const response = await authFetch(`${import.meta.env.VITE_API_URL}/chat/history`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete chat history");
      }

      setMessages([]);
      toast.success("Chat history deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat history");
    } finally {
      setDeletingHistory(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3rem)] flex-col">
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <div>
          <h1 className="text-sm font-semibold">New conversation</h1>
          <p className="text-xs text-muted-foreground">Ask questions in plain English. Copilot will generate, verify, and run the SQL.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={deleteHistory}
            disabled={messages.length === 0 || deletingHistory}
          >
            {deletingHistory ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
            Delete history
          </Button>
          <Select value={conn} onValueChange={setConn} disabled={connections.length === 0}>
            <SelectTrigger className="w-[240px]"><SelectValue placeholder="No connected databases" /></SelectTrigger>
            <SelectContent>
              {connections.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  <span className="flex items-center gap-2"><DBIcon kind={toDBKind(c.kind)} size="sm" /> {c.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
          {historyLoading && (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading chat history...
            </div>
          )}
          {messages.map((m) => m.role === "user" ? <UserBubble key={m.id} text={m.text} /> : <AssistantBubble key={m.id} msg={m} />)}
          {busy && (
            <AgentActivity
              activeStep={activityStep}
              connectionName={selectedConnection?.name}
              elapsedMs={elapsedMs}
            />
          )}
          {busy && (
            <div className="hidden items-center gap-3 text-sm text-muted-foreground">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
              </span>
              <span>Generating SQL…</span>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border bg-background/80 p-4 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <div className="relative rounded-xl border border-border bg-card/70 focus-within:border-primary/50 focus-within:shadow-glow">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask anything about your data… e.g. 'Monthly active users by plan'"
              className="min-h-[60px] resize-none border-0 bg-transparent pr-14 text-sm shadow-none focus-visible:ring-0"
            />
            <Button onClick={send} size="icon" disabled={!input.trim() || busy || !conn} className="absolute bottom-2 right-2 h-8 w-8 rounded-md">
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">Copilot can make mistakes. Verify results before acting.</p>
        </div>
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
        {text}
      </div>
    </div>
  );
}

function toMessage(item: ChatHistoryItem): Msg | null {
  const content = item.content ?? item.message ?? "";
  const id = String(item.id ?? `${item.role ?? "message"}-${item.created_at ?? crypto.randomUUID()}`);

  if (!content.trim()) {
    return null;
  }

  if (item.role === "user") {
    return {
      role: "user",
      id,
      text: content,
    };
  }

  if (item.role === "assistant") {
    return {
      role: "assistant",
      id,
      explanation: content,
      sql: "",
      rows: [],
      rowCount: 0,
      durationMs: 0,
      verification: "PASS",
    };
  }

  return null;
}

function AgentActivity({
  activeStep,
  connectionName,
  elapsedMs,
}: {
  activeStep: number;
  connectionName?: string;
  elapsedMs: number;
}) {
  const elapsedSeconds = Math.max(0.1, elapsedMs / 1000).toFixed(1);

  return (
    <div className="flex gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
      </div>
      <div className="min-w-0 flex-1 rounded-lg border border-border bg-card/50 p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-foreground">Working on your request</p>
            <p className="text-xs text-muted-foreground">Agents and tools are coordinating behind the scenes.</p>
          </div>
          <Badge variant="outline" className="shrink-0 border-primary/30 text-primary">
            {elapsedSeconds}s
          </Badge>
        </div>

        <div className="space-y-2">
          {activitySteps.map((step, index) => {
            const isDone = index < activeStep;
            const isActive = index === activeStep;
            const StepIcon = step.Icon;

            return (
              <div key={step.label} className="flex gap-2.5">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : isActive ? (
                    <StepIcon className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-muted-foreground/50" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className={isActive ? "text-sm font-medium text-foreground" : "text-sm text-muted-foreground"}>
                    {step.label}
                  </p>
                  {isActive && <p className="text-xs text-muted-foreground">{step.detail}</p>}
                </div>
              </div>
            );
          })}
        </div>

        <Collapsible className="mt-3 border-t border-border pt-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground">
              Advanced details
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <dl className="grid gap-1 px-2 pb-1 pt-2 text-xs text-muted-foreground sm:grid-cols-2">
              <div>
                <dt className="font-medium text-foreground/80">Connection</dt>
                <dd>{connectionName ?? "Selected database"}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground/80">Endpoint</dt>
                <dd>/chat</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground/80">Mode</dt>
                <dd>Sanitized activity trace</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground/80">Status</dt>
                <dd>Waiting for backend response</dd>
              </div>
            </dl>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

function AssistantBubble({ msg }: { msg: Extract<Msg, { role: "assistant" }> }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <p className="text-sm leading-relaxed text-foreground/90">{msg.explanation}</p>

        {msg.sql ? (
          <>
        <div className="overflow-hidden rounded-lg border border-border bg-secondary/40">
          <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">SQL</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => { navigator.clipboard.writeText(msg.sql); toast.success("Copied SQL"); }}>
                <Copy className="mr-1 h-3 w-3" /> Copy
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <Play className="mr-1 h-3 w-3" /> Re-run
              </Button>
            </div>
          </div>
          <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed text-foreground/90">{msg.sql}</pre>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Badge variant="outline" className={msg.verification === "PASS" ? "border-success/40 text-success" : "border-destructive/40 text-destructive"}>
            <ShieldCheck className="mr-1 h-3 w-3" /> Verification {msg.verification}
          </Badge>
          <span className="text-muted-foreground">{msg.rowCount} rows · {msg.durationMs}ms</span>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card/40">
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(msg.rows[0] ?? {}).map((k) => (
                  <TableHead key={k} className="font-mono text-[11px] uppercase tracking-wider">{k}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {msg.rows.map((r, i) => (
                <TableRow key={i}>
                  {Object.values(r).map((v, j) => <TableCell key={j} className="font-mono text-xs">{String(v)}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
