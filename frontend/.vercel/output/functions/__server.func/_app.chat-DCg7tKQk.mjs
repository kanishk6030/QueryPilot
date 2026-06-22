import { r as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as cn, t as Button } from "./_ssr/button-DRsC1qZi.mjs";
import { D as Circle, N as ArrowUp, O as CircleCheck, S as FileSearch, T as Copy, a as Sparkles, i as Trash2, j as ChevronDown, l as Route, o as ShieldCheck, p as Play, v as LoaderCircle, w as Database } from "./_libs/lucide-react.mjs";
import { n as CollapsibleTrigger$1, r as Root, t as CollapsibleContent$1 } from "./_libs/@radix-ui/react-collapsible+[...].mjs";
import { t as authFetch } from "./_ssr/auth-fetch-DTXq4VkR.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Badge } from "./_ssr/badge-Cc0IblCb.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-D74UZ8HR.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-BQuBX6bn.mjs";
import { n as fetchConnections, r as toDBKind, t as DBIcon } from "./_ssr/db-icon-BIhP_att.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.chat-DCg7tKQk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Collapsible = Root;
var CollapsibleTrigger = CollapsibleTrigger$1;
var CollapsibleContent = CollapsibleContent$1;
var forbiddenOperations = [
	"DROP",
	"DELETE",
	"ALTER",
	"TRUNCATE",
	"INSERT",
	"UPDATE",
	"REPLACE",
	"CREATE"
];
var activitySteps = [
	{
		label: "Understanding your question",
		detail: "Classifying the request and preparing context.",
		Icon: Sparkles
	},
	{
		label: "Routing to the right agent",
		detail: "Choosing between database reasoning and general chat.",
		Icon: Route
	},
	{
		label: "Inspecting database context",
		detail: "Using the selected connection and available tools.",
		Icon: Database
	},
	{
		label: "Generating and running SQL",
		detail: "Building a query, executing it, and reading the result.",
		Icon: FileSearch
	},
	{
		label: "Verifying the answer",
		detail: "Checking that the response matches the SQL result.",
		Icon: ShieldCheck
	}
];
function verificationStatus(verification) {
	return (typeof verification === "string" ? verification : verification?.status)?.trim().toUpperCase() === "PASS" ? "PASS" : "FAIL";
}
function getForbiddenOperation(value) {
	const upperValue = value.toUpperCase();
	return forbiddenOperations.find((operation) => new RegExp(`\\b${operation}\\b`).test(upperValue));
}
function forbiddenOperationMessage(operation) {
	return `Can't perform this ${operation} operation`;
}
function ChatPage() {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [connections, setConnections] = (0, import_react.useState)([]);
	const [conn, setConn] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [historyLoading, setHistoryLoading] = (0, import_react.useState)(true);
	const [deletingHistory, setDeletingHistory] = (0, import_react.useState)(false);
	const [activityStep, setActivityStep] = (0, import_react.useState)(0);
	const [elapsedMs, setElapsedMs] = (0, import_react.useState)(0);
	const scrollRef = (0, import_react.useRef)(null);
	const selectedConnection = connections.find((connection) => connection.id === conn);
	(0, import_react.useEffect)(() => {
		fetchConnections().then((data) => {
			const connectedConnections = data.filter((connection) => connection.status === "connected");
			setConnections(connectedConnections);
			setConn((current) => connectedConnections.some((connection) => connection.id === current) ? current : connectedConnections[0]?.id || "");
		}).catch(() => toast.error("Failed to load connections"));
	}, []);
	(0, import_react.useEffect)(() => {
		const loadHistory = async () => {
			setHistoryLoading(true);
			try {
				const response = await authFetch(`http://localhost:8000/chat/history`);
				if (!response.ok) throw new Error("Failed to load chat history");
				setMessages((await response.json()).map(toMessage).filter((message) => Boolean(message)));
			} catch (error) {
				console.error(error);
				toast.error("Failed to load chat history");
			} finally {
				setHistoryLoading(false);
			}
		};
		loadHistory();
	}, []);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, busy]);
	(0, import_react.useEffect)(() => {
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
		const userMsg = {
			role: "user",
			id: crypto.randomUUID(),
			text
		};
		setMessages((m) => [...m, userMsg]);
		setInput("");
		setBusy(true);
		try {
			const response = await authFetch(`http://localhost:8000/chat`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					question: text,
					connection_id: conn || null
				})
			});
			const data = await response.json();
			if (!response.ok || data.error) {
				const unsafeOperation = typeof data.error === "string" ? getForbiddenOperation(data.error) : null;
				toast.error(unsafeOperation ? forbiddenOperationMessage(unsafeOperation) : data.error || "Failed to contact backend");
				return;
			}
			const unsafeOperation = getForbiddenOperation(data.answer ?? "") || getForbiddenOperation(data.sql_query ?? "");
			if (unsafeOperation) {
				toast.error(forbiddenOperationMessage(unsafeOperation));
				return;
			}
			const reply = {
				role: "assistant",
				id: crypto.randomUUID(),
				explanation: data.answer,
				sql: data.sql_query || "No SQL Generated",
				rows: data.sql_result?.rows ?? [],
				rowCount: data.sql_result?.rows?.length ?? 0,
				durationMs: 0,
				verification: verificationStatus(data.verification)
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
			if (!(await authFetch(`http://localhost:8000/chat/history`, { method: "DELETE" })).ok) throw new Error("Failed to delete chat history");
			setMessages([]);
			toast.success("Chat history deleted");
		} catch (error) {
			console.error(error);
			toast.error("Failed to delete chat history");
		} finally {
			setDeletingHistory(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[calc(100vh-3rem)] flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-6 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-sm font-semibold",
					children: "New conversation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Ask questions in plain English. Copilot will generate, verify, and run the SQL."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: deleteHistory,
						disabled: messages.length === 0 || deletingHistory,
						children: [deletingHistory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), "Delete history"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: conn,
						onValueChange: setConn,
						disabled: connections.length === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-[240px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "No connected databases" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: connections.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: c.id,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DBIcon, {
										kind: toDBKind(c.kind),
										size: "sm"
									}),
									" ",
									c.name
								]
							})
						}, c.id)) })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollRef,
				className: "flex-1 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl space-y-6 px-4 py-8",
					children: [
						historyLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Loading chat history..."]
						}),
						messages.map((m) => m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserBubble, { text: m.text }, m.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantBubble, { msg: m }, m.id)),
						busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentActivity, {
							activeStep: activityStep,
							connectionName: selectedConnection?.name,
							elapsedMs
						}),
						busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-3 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground",
											style: { animationDelay: "0ms" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground",
											style: { animationDelay: "150ms" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground",
											style: { animationDelay: "300ms" }
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Generating SQL…" })
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border bg-background/80 p-4 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative rounded-xl border border-border bg-card/70 focus-within:border-primary/50 focus-within:shadow-glow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: input,
							onChange: (e) => setInput(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									send();
								}
							},
							placeholder: "Ask anything about your data… e.g. 'Monthly active users by plan'",
							className: "min-h-[60px] resize-none border-0 bg-transparent pr-14 text-sm shadow-none focus-visible:ring-0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: send,
							size: "icon",
							disabled: !input.trim() || busy || !conn,
							className: "absolute bottom-2 right-2 h-8 w-8 rounded-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-center text-[11px] text-muted-foreground",
						children: "Copilot can make mistakes. Verify results before acting."
					})]
				})
			})
		]
	});
}
function UserBubble({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-end",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground",
			children: text
		})
	});
}
function toMessage(item) {
	const content = item.content ?? item.message ?? "";
	const id = String(item.id ?? `${item.role ?? "message"}-${item.created_at ?? crypto.randomUUID()}`);
	if (!content.trim()) return null;
	if (item.role === "user") return {
		role: "user",
		id,
		text: content
	};
	if (item.role === "assistant") return {
		role: "assistant",
		id,
		explanation: content,
		sql: "",
		rows: [],
		rowCount: 0,
		durationMs: 0,
		verification: "PASS"
	};
	return null;
}
function AgentActivity({ activeStep, connectionName, elapsedMs }) {
	const elapsedSeconds = Math.max(.1, elapsedMs / 1e3).toFixed(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1 rounded-lg border border-border bg-card/50 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-foreground",
						children: "Working on your request"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Agents and tools are coordinating behind the scenes."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "shrink-0 border-primary/30 text-primary",
						children: [elapsedSeconds, "s"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: activitySteps.map((step, index) => {
						const isDone = index < activeStep;
						const isActive = index === activeStep;
						const StepIcon = step.Icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center",
								children: isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-success" }) : isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIcon, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 text-muted-foreground/50" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: isActive ? "text-sm font-medium text-foreground" : "text-sm text-muted-foreground",
									children: step.label
								}), isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: step.detail
								})]
							})]
						}, step.label);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapsible, {
					className: "mt-3 border-t border-border pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							className: "h-7 px-2 text-xs text-muted-foreground",
							children: ["Advanced details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "ml-1 h-3 w-3" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid gap-1 px-2 pb-1 pt-2 text-xs text-muted-foreground sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-medium text-foreground/80",
								children: "Connection"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: connectionName ?? "Selected database" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-medium text-foreground/80",
								children: "Endpoint"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "/chat" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-medium text-foreground/80",
								children: "Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Sanitized activity trace" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-medium text-foreground/80",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Waiting for backend response" })] })
						]
					}) })]
				})
			]
		})]
	});
}
function AssistantBubble({ msg }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1 space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-foreground/90",
				children: msg.explanation
			}), msg.sql ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-lg border border-border bg-secondary/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
							children: "SQL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								className: "h-6 px-2 text-xs",
								onClick: () => {
									navigator.clipboard.writeText(msg.sql);
									toast.success("Copied SQL");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "mr-1 h-3 w-3" }), " Copy"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								className: "h-6 px-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "mr-1 h-3 w-3" }), " Re-run"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto p-3 font-mono text-xs leading-relaxed text-foreground/90",
						children: msg.sql
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: msg.verification === "PASS" ? "border-success/40 text-success" : "border-destructive/40 text-destructive",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mr-1 h-3 w-3" }),
							" Verification ",
							msg.verification
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [
							msg.rowCount,
							" rows · ",
							msg.durationMs,
							"ms"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-lg border border-border bg-card/40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: Object.keys(msg.rows[0] ?? {}).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "font-mono text-[11px] uppercase tracking-wider",
						children: k
					}, k)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: msg.rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: Object.values(r).map((v, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-mono text-xs",
						children: String(v)
					}, j)) }, i)) })] })
				})
			] }) : null]
		})]
	});
}
//#endregion
export { ChatPage as component };
