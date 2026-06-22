import { r as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./_ssr/button-DRsC1qZi.mjs";
import { I as Activity, P as ArrowUpRight, h as MessageSquare, o as ShieldCheck, t as Zap, w as Database } from "./_libs/lucide-react.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./_ssr/badge-Cc0IblCb.mjs";
import { n as fetchConnections, r as toDBKind, t as DBIcon } from "./_ssr/db-icon-Bsjxp3lv.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./_ssr/card-CfEwGGLW.mjs";
import { i as getVerificationStatus, t as fetchHistory } from "./_ssr/history-CfKlSGUV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-8DNPYMHE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const [connections, setConnections] = (0, import_react.useState)([]);
	const [history, setHistory] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		fetchConnections().then(setConnections).catch(() => setConnections([]));
		fetchHistory().then(setHistory).catch(() => setHistory([]));
	}, []);
	const liveConnections = connections.filter((c) => c.status === "connected").length;
	const stats = getStats(connections.length, liveConnections, history);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-8 p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: "Welcome back"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Here is what is happening across your data today."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "shadow-glow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/chat",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "mr-1.5 h-4 w-4" }), " New chat"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "bg-card/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: s.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4 text-muted-foreground" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl font-semibold tracking-tight",
								children: s.value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: s.delta
							})]
						})]
					})
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "bg-card/60 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex flex-row items-center justify-between space-y-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "Recent queries"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/history",
								children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-1 h-3.5 w-3.5" })]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-2",
						children: [history.slice(0, 5).map((q) => {
							const status = getVerificationStatus(q.verification);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border border-border/60 p-3 transition hover:bg-accent/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: q.question
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 truncate text-xs text-muted-foreground",
										children: q.connection_id ?? "Unknown connection"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: status === "PASS" ? "border-success/40 text-success" : "border-destructive/40 text-destructive",
									children: status
								})]
							}, q.id);
						}), history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-center text-sm text-muted-foreground",
							children: "No query history yet"
						}) : null]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "bg-card/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex flex-row items-center justify-between space-y-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "Connections"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/connections",
								children: "Manage"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-2",
						children: [connections.slice(0, 4).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-lg border border-border/60 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DBIcon, {
									kind: toDBKind(c.kind),
									size: "sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: c.database
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${c.status === "connected" ? "bg-success" : c.status === "error" ? "bg-destructive" : "bg-muted-foreground"}` })
							]
						}, c.id)), connections.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-center text-sm text-muted-foreground",
							children: "No connections yet"
						}) : null]
					})]
				})]
			})
		]
	});
}
function getStats(connectionCount, liveConnections, history) {
	const today = (/* @__PURE__ */ new Date()).toDateString();
	const queriesToday = history.filter((item) => {
		if (!item.created_at) return false;
		const createdAt = new Date(item.created_at);
		return !Number.isNaN(createdAt.getTime()) && createdAt.toDateString() === today;
	}).length;
	const verifiedCount = history.filter((item) => getVerificationStatus(item.verification) === "PASS").length;
	const verificationRate = history.length === 0 ? "0%" : `${Math.round(verifiedCount / history.length * 100)}%`;
	return [
		{
			label: "Queries today",
			value: String(queriesToday),
			delta: `${history.length} total`,
			icon: Activity
		},
		{
			label: "Connected DBs",
			value: String(connectionCount),
			delta: `${liveConnections} live`,
			icon: Database
		},
		{
			label: "Verification rate",
			value: verificationRate,
			delta: `${verifiedCount}/${history.length} passed`,
			icon: ShieldCheck
		},
		{
			label: "Recent queries",
			value: String(Math.min(history.length, 5)),
			delta: "shown below",
			icon: Zap
		}
	];
}
//#endregion
export { Dashboard as component };
