import { r as useAuth } from "./AuthContext-CBh0WCTG.mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { E as CodeXml, F as ArrowRight, O as CircleCheck, _ as LockKeyhole, a as Sparkles, b as History, c as Search, f as Plug, h as MessageSquare, o as ShieldCheck, w as Database } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C4TqNOZ5.js
var import_jsx_runtime = require_jsx_runtime();
var features = [
	{
		icon: Database,
		title: "Multi-engine",
		body: "Connect PostgreSQL, MySQL, and SQLite workspaces from one quiet control surface."
	},
	{
		icon: ShieldCheck,
		title: "Verified SQL",
		body: "Generated queries are checked against schema context before they reach your results."
	},
	{
		icon: History,
		title: "Persistent history",
		body: "Every saved query is tied to your account so you can revisit SQL and verification status."
	}
];
var workflow = [
	{
		icon: Plug,
		title: "Connect",
		body: "Add a database connection and keep idle sources out of chat until they are ready."
	},
	{
		icon: MessageSquare,
		title: "Ask",
		body: "Use plain English prompts instead of remembering every table, join, and filter."
	},
	{
		icon: CodeXml,
		title: "Review",
		body: "Inspect SQL, verification, and result rows before acting on the answer."
	}
];
var databases = [
	"PostgreSQL",
	"MySQL",
	"SQLite",
	"Supabase"
];
function Landing() {
	const { loading, session } = useAuth();
	const isLoggedIn = !loading && !!session;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black_15%,transparent_78%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold tracking-tight",
							children: "Copilot"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-7 text-sm text-muted-foreground md:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#features",
								className: "hover:text-foreground",
								children: "Features"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#how",
								className: "hover:text-foreground",
								children: "Workflow"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#security",
								className: "hover:text-foreground",
								children: "Security"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#pricing",
								className: "hover:text-foreground",
								children: "Pricing"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [!isLoggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								children: "Sign in"
							})
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								children: "Open app"
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-14 md:grid-cols-[0.95fr_1.05fr] md:pb-28 md:pt-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-fade-up",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }), "Verified SQL generation for connected databases"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mt-6 max-w-2xl text-balance text-5xl font-semibold tracking-tight md:text-7xl",
									children: ["Chat with your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient",
										children: "databases."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 max-w-xl text-balance text-base text-muted-foreground md:text-lg",
									children: "AI Database Copilot turns plain English into SQL you can inspect, verify, execute, and save across your real database connections."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										className: "shadow-glow",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/dashboard",
											children: ["Start querying ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
										})
									}), !isLoggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										variant: "outline",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/auth",
											children: "Create account"
										})
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 grid max-w-lg grid-cols-3 gap-3 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
											value: "3",
											label: "engines"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
											value: "PASS",
											label: "verification"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
											value: "/history",
											label: "audit trail"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroConsole, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "features",
						className: "border-y border-border/70 bg-card/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3",
							children: features.map((feature, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "animate-fade-up rounded-lg border border-border bg-card/50 p-6 backdrop-blur",
								style: { animationDelay: `${index * 90}ms` },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(feature.icon, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 text-base font-semibold tracking-tight",
										children: feature.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: feature.body
									})
								]
							}, feature.title))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "how",
						className: "mx-auto max-w-6xl px-6 py-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							eyebrow: "Workflow",
							title: "From connection to answer in three moves",
							body: "The app keeps the loop clear: choose a live connection, ask a question, then inspect the generated SQL before using the result."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-4 md:grid-cols-3",
							children: workflow.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group rounded-lg border border-border bg-card/40 p-5 transition hover:border-primary/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs text-muted-foreground",
											children: ["0", index + 1]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-5 text-sm font-semibold",
										children: step.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: step.body
									})
								]
							}, step.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "overflow-hidden border-y border-border/70 bg-secondary/25 py-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "animate-marquee flex w-max gap-3",
							children: [
								...databases,
								...databases,
								...databases
							].map((name, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-4 py-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-4 w-4 text-primary" }), name]
							}, `${name}-${index}`))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "security",
						className: "mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-[0.9fr_1.1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							eyebrow: "Trust",
							title: "Built for real database work",
							body: "Copilot separates connection state, authentication, query history, and verification so the app stays usable as the data gets serious."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 space-y-3",
							children: [
								"Only connected databases appear inside chat.",
								"Authenticated API requests use the active Supabase session.",
								"History is loaded from your backend, not a browser mock."
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
							}, item))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card/50 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-b border-border pb-4 text-sm font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-4 w-4 text-primary" }), "Request flow"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 space-y-4",
								children: [
									"Supabase session",
									"FastAPI middleware",
									"Connection ownership",
									"Verified SQL response"
								].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 rounded-md border border-border/70 bg-background/50 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 font-mono text-xs text-primary",
											children: index + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm",
											children: item
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "ml-auto h-1.5 w-16 overflow-hidden rounded-full bg-secondary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "animate-progress h-full rounded-full bg-primary",
												style: { animationDelay: `${index * 220}ms` }
											})
										})
									]
								}, item))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "pricing",
						className: "mx-auto max-w-6xl px-6 pb-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card/60 p-8 md:flex md:items-center md:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase text-primary",
									children: "Ready when your database is"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 text-2xl font-semibold tracking-tight",
									children: "Start with your current connections."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-xl text-sm text-muted-foreground",
									children: "Use the existing app dashboard, connect a database, and keep every generated SQL query in your account history."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-3 md:mt-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/dashboard",
										children: ["Open dashboard ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
									})
								}), !isLoggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/auth",
										children: "Sign in"
									})
								}) : null]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative z-10 border-t border-border/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2026 Copilot Labs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Built for teams who love their data." })]
				})
			})
		]
	});
}
function HeroConsole() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "animate-float-panel rounded-lg border border-border/80 bg-card/70 p-2 shadow-glow backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-md border border-border bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border px-4 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-destructive/70" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-warning/70" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-success/70" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-3 font-mono text-xs text-muted-foreground",
					children: "copilot - employee.db"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative space-y-4 p-5 font-mono text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-scan-line absolute left-0 top-0 h-px w-full bg-primary/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 rounded-md bg-secondary/45 p-3 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mt-0.5 h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Who scored the highest marks?" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto rounded-md bg-secondary/60 p-4 text-xs leading-relaxed text-foreground/90",
						children: `SELECT name, marks
FROM students
ORDER BY marks DESC
LIMIT 1;`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-success",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }), " Verification PASS"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "1 row - ready"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 overflow-hidden rounded-md border border-border text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-r border-border bg-secondary/40 p-2 text-muted-foreground",
								children: "NAME"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border bg-secondary/40 p-2 text-muted-foreground",
								children: "MARKS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-r border-border p-2",
								children: "Jane Smith"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2",
								children: "92"
							})
						]
					})
				]
			})]
		})
	});
}
function Metric({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-card/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-sm text-foreground",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-[11px]",
			children: label
		})]
	});
}
function SectionHeader({ eyebrow, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase text-primary",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl font-semibold tracking-tight md:text-4xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-6 text-muted-foreground md:text-base",
				children: body
			})
		]
	});
}
//#endregion
export { Landing as component };
