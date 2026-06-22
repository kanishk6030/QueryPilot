import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  History,
  LockKeyhole,
  MessageSquare,
  Plug,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Database Copilot - Chat with your data" },
      { name: "description", content: "Connect Postgres, MySQL and SQLite. Ask questions in plain English. Ship trusted SQL with AI verification." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Database, title: "Multi-engine", body: "Connect PostgreSQL, MySQL, and SQLite workspaces from one quiet control surface." },
  { icon: ShieldCheck, title: "Verified SQL", body: "Generated queries are checked against schema context before they reach your results." },
  { icon: History, title: "Persistent history", body: "Every saved query is tied to your account so you can revisit SQL and verification status." },
];

const workflow = [
  { icon: Plug, title: "Connect", body: "Add a database connection and keep idle sources out of chat until they are ready." },
  { icon: MessageSquare, title: "Ask", body: "Use plain English prompts instead of remembering every table, join, and filter." },
  { icon: Code2, title: "Review", body: "Inspect SQL, verification, and result rows before acting on the answer." },
];

const databases = ["PostgreSQL", "MySQL", "SQLite", "Supabase"];

function Landing() {
  const { loading, session } = useAuth();
  const isLoggedIn = !loading && !!session;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black_15%,transparent_78%)]" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Copilot</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">Workflow</a>
          <a href="#security" className="hover:text-foreground">Security</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          {!isLoggedIn ? <Button asChild variant="ghost" size="sm"><Link to="/auth">Sign in</Link></Button> : null}
          <Button asChild size="sm"><Link to="/dashboard">Open app</Link></Button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-14 md:grid-cols-[0.95fr_1.05fr] md:pb-28 md:pt-24">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Verified SQL generation for connected databases
            </div>
            <h1 className="mt-6 max-w-2xl text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              Chat with your <span className="text-gradient">databases.</span>
            </h1>
            <p className="mt-5 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
              AI Database Copilot turns plain English into SQL you can inspect, verify, execute, and save across your real database connections.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="shadow-glow">
                <Link to="/dashboard">Start querying <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              {!isLoggedIn ? (
                <Button asChild size="lg" variant="outline">
                  <Link to="/auth">Create account</Link>
                </Button>
              ) : null}
            </div>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 text-xs text-muted-foreground">
              <Metric value="3" label="engines" />
              <Metric value="PASS" label="verification" />
              <Metric value="/history" label="audit trail" />
            </div>
          </div>

          <HeroConsole />
        </section>

        <section id="features" className="border-y border-border/70 bg-card/20">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.title} className="animate-fade-up rounded-lg border border-border bg-card/50 p-6 backdrop-blur" style={{ animationDelay: `${index * 90}ms` }}>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
                  <feature.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeader
            eyebrow="Workflow"
            title="From connection to answer in three moves"
            body="The app keeps the loop clear: choose a live connection, ask a question, then inspect the generated SQL before using the result."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {workflow.map((step, index) => (
              <div key={step.title} className="group rounded-lg border border-border bg-card/40 p-5 transition hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary">
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-sm font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden border-y border-border/70 bg-secondary/25 py-5">
          <div className="animate-marquee flex w-max gap-3">
            {[...databases, ...databases, ...databases].map((name, index) => (
              <span key={`${name}-${index}`} className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-4 py-2 text-sm">
                <Database className="h-4 w-4 text-primary" />
                {name}
              </span>
            ))}
          </div>
        </section>

        <section id="security" className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="Trust"
              title="Built for real database work"
              body="Copilot separates connection state, authentication, query history, and verification so the app stays usable as the data gets serious."
            />
            <div className="mt-8 space-y-3">
              {[
                "Only connected databases appear inside chat.",
                "Authenticated API requests use the active Supabase session.",
                "History is loaded from your backend, not a browser mock.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card/50 p-5">
            <div className="flex items-center gap-2 border-b border-border pb-4 text-sm font-medium">
              <LockKeyhole className="h-4 w-4 text-primary" />
              Request flow
            </div>
            <div className="mt-5 space-y-4">
              {["Supabase session", "FastAPI middleware", "Connection ownership", "Verified SQL response"].map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-md border border-border/70 bg-background/50 p-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 font-mono text-xs text-primary">{index + 1}</span>
                  <span className="text-sm">{item}</span>
                  <div className="ml-auto h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                    <div className="animate-progress h-full rounded-full bg-primary" style={{ animationDelay: `${index * 220}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-lg border border-border bg-card/60 p-8 md:flex md:items-center md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-primary">Ready when your database is</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Start with your current connections.</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Use the existing app dashboard, connect a database, and keep every generated SQL query in your account history.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
              <Button asChild size="lg">
                <Link to="/dashboard">Open dashboard <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              {!isLoggedIn ? (
                <Button asChild size="lg" variant="outline">
                  <Link to="/auth">Sign in</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>2026 Copilot Labs</span>
          <span>Built for teams who love their data.</span>
        </div>
      </footer>
    </div>
  );
}

function HeroConsole() {
  return (
    <div className="animate-float-panel rounded-lg border border-border/80 bg-card/70 p-2 shadow-glow backdrop-blur">
      <div className="overflow-hidden rounded-md border border-border bg-background">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
          <span className="ml-3 font-mono text-xs text-muted-foreground">copilot - employee.db</span>
        </div>
        <div className="relative space-y-4 p-5 font-mono text-sm">
          <div className="animate-scan-line absolute left-0 top-0 h-px w-full bg-primary/60" />
          <div className="flex items-start gap-3 rounded-md bg-secondary/45 p-3 text-muted-foreground">
            <Search className="mt-0.5 h-4 w-4 text-primary" />
            <span>Who scored the highest marks?</span>
          </div>
          <pre className="overflow-x-auto rounded-md bg-secondary/60 p-4 text-xs leading-relaxed text-foreground/90">
{`SELECT name, marks
FROM students
ORDER BY marks DESC
LIMIT 1;`}
          </pre>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-success">
              <ShieldCheck className="h-3 w-3" /> Verification PASS
            </span>
            <span className="text-muted-foreground">1 row - ready</span>
          </div>
          <div className="grid grid-cols-2 overflow-hidden rounded-md border border-border text-xs">
            <div className="border-b border-r border-border bg-secondary/40 p-2 text-muted-foreground">NAME</div>
            <div className="border-b border-border bg-secondary/40 p-2 text-muted-foreground">MARKS</div>
            <div className="border-r border-border p-2">Jane Smith</div>
            <div className="p-2">92</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md border border-border bg-card/40 p-3">
      <div className="font-mono text-sm text-foreground">{value}</div>
      <div className="mt-1 text-[11px]">{label}</div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-medium uppercase text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">{body}</p>
    </div>
  );
}
