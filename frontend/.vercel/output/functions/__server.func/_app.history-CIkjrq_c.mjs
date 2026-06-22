import { r as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./_ssr/button-DRsC1qZi.mjs";
import { t as Input } from "./_ssr/input-DicJzR9-.mjs";
import { T as Copy, c as Search, o as ShieldCheck, u as RefreshCw } from "./_libs/lucide-react.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, r as SheetDescription, t as Sheet } from "./_ssr/sheet-BAnSRBdC.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Badge } from "./_ssr/badge-Cc0IblCb.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./_ssr/table-BQuBX6bn.mjs";
import { i as getVerificationStatus, n as formatHistoryDate, r as getVerificationReason, t as fetchHistory } from "./_ssr/history-D41I0xfV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.history-CIkjrq_c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [history, setHistory] = (0, import_react.useState)([]);
	const [active, setActive] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const loadHistory = () => {
		setLoading(true);
		setError(null);
		fetchHistory().then(setHistory).catch((nextError) => {
			setHistory([]);
			setError(nextError.message);
		}).finally(() => setLoading(false));
	};
	(0, import_react.useEffect)(() => {
		loadHistory();
	}, []);
	const filtered = history.filter((h) => {
		const query = q.toLowerCase();
		return h.question.toLowerCase().includes(query) || (h.sql_query ?? "").toLowerCase().includes(query) || (h.connection_id ?? "").toLowerCase().includes(query);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6 p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: "Query history"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Every stored query and verification result from your backend."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex max-w-full items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-80 max-w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search history...",
							className: "pl-8"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						onClick: loadHistory,
						disabled: loading,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-4 w-4 ${loading ? "animate-spin" : ""}` })
					})]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-card/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					className: "hover:bg-transparent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Question" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Connection" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "When" })
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [
					filtered.map((h) => {
						const status = getVerificationStatus(h.verification);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							className: "cursor-pointer",
							onClick: () => setActive(h),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									className: "max-w-[560px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-medium",
										children: h.question
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-mono text-xs text-muted-foreground",
										children: h.sql_query || "No SQL stored"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "max-w-[220px] truncate text-sm text-muted-foreground",
									children: h.connection_id ?? "Unknown"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: status === "PASS" ? "border-success/40 text-success" : "border-destructive/40 text-destructive",
									children: status
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-sm text-muted-foreground",
									children: formatHistoryDate(h.created_at)
								})
							]
						}, h.id);
					}),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: 4,
						className: "py-10 text-center text-sm text-muted-foreground",
						children: "Loading history..."
					}) }),
					!loading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: 4,
						className: "py-10 text-center text-sm text-muted-foreground",
						children: "No matching queries"
					}) })
				] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: !!active,
				onOpenChange: (open) => !open && setActive(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					className: "w-[640px] overflow-y-auto sm:max-w-[640px]",
					children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: active.question }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: [
						active.connection_id ?? "Unknown connection",
						" - ",
						formatHistoryDate(active.created_at)
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: getVerificationStatus(active.verification) === "PASS" ? "border-success/40 text-success" : "border-destructive/40 text-destructive",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mr-1 h-3 w-3" }),
										" ",
										getVerificationStatus(active.verification)
									]
								})
							}),
							getVerificationReason(active.verification) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-lg border border-border bg-secondary/40 p-3 text-sm text-muted-foreground",
								children: getVerificationReason(active.verification)
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden rounded-lg border border-border bg-secondary/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
										children: "SQL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										className: "h-6 px-2 text-xs",
										disabled: !active.sql_query,
										onClick: () => {
											navigator.clipboard.writeText(active.sql_query ?? "");
											toast.success("Copied SQL");
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "mr-1 h-3 w-3" }), "Copy"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
									className: "overflow-x-auto p-3 font-mono text-xs leading-relaxed",
									children: active.sql_query || "No SQL stored"
								})]
							})
						]
					})] })
				})
			})
		]
	});
}
//#endregion
export { HistoryPage as component };
