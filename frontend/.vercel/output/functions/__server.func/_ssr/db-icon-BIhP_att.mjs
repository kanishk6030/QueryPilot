import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as authFetch } from "./auth-fetch-DTXq4VkR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db-icon-BIhP_att.js
var import_jsx_runtime = require_jsx_runtime();
function toDBKind(kind) {
	if (kind === "mysql" || kind === "sqlite") return kind;
	return "postgres";
}
async function fetchConnections() {
	const response = await authFetch(`http://localhost:8000/connections`);
	if (!response.ok) throw new Error("Failed to fetch connections");
	return response.json();
}
var palette = {
	postgres: {
		bg: "bg-sky-500/15",
		fg: "text-sky-400",
		label: "PG"
	},
	mysql: {
		bg: "bg-amber-500/15",
		fg: "text-amber-400",
		label: "MY"
	},
	sqlite: {
		bg: "bg-violet-500/15",
		fg: "text-violet-400",
		label: "SQ"
	}
};
function DBIcon({ kind, size = "md" }) {
	const p = palette[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex ${size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs"} items-center justify-center rounded-md ${p.bg} ${p.fg} font-mono font-semibold ring-1 ring-inset ring-white/5`,
		children: p.label
	});
}
//#endregion
export { fetchConnections as n, toDBKind as r, DBIcon as t };
