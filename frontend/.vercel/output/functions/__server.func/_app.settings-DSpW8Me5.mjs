import { r as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as cn, t as Button } from "./_ssr/button-DRsC1qZi.mjs";
import { t as Input } from "./_ssr/input-DicJzR9-.mjs";
import { a as getDisplayName, i as fetchCurrentUser, n as AvatarFallback, o as getInitials, r as Separator, t as Avatar } from "./_ssr/me-DQY029T2.mjs";
import { t as Label } from "./_ssr/label-B4PTMSG2.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./_ssr/card-CfEwGGLW.mjs";
import { n as SwitchThumb, t as Switch$1 } from "./_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.settings-DSpW8Me5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function SettingsPage() {
	const [dark, setDark] = (0, import_react.useState)(true);
	const [user, setUser] = (0, import_react.useState)(null);
	const [profileError, setProfileError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const el = document.documentElement;
		el.classList.toggle("dark", dark);
		el.classList.toggle("light", !dark);
	}, [dark]);
	(0, import_react.useEffect)(() => {
		let ignore = false;
		fetchCurrentUser().then((nextUser) => {
			if (!ignore) {
				setUser(nextUser);
				setProfileError(null);
			}
		}).catch((error) => {
			if (!ignore) setProfileError(error.message);
		});
		return () => {
			ignore = true;
		};
	}, []);
	const displayName = getDisplayName(user);
	const email = user?.email ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-8 p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Manage your account, workspace, and AI preferences."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "bg-card/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Profile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Your signed-in account from the API." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								className: "h-14 w-14",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									className: "bg-primary/15 text-primary",
									children: getInitials(user)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: displayName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: email || "No email claim returned"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						profileError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: profileError
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: displayName,
									readOnly: true
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: email,
									readOnly: true
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "bg-card/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Appearance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Customize how Copilot looks on this device." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Dark mode",
							hint: "Use a darker color palette across the app.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: dark,
								onCheckedChange: setDark
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Reduced motion",
							hint: "Minimize non-essential animations.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "bg-card/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "AI preferences"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Tune how Copilot generates SQL." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Verification",
							hint: "Run a static check on every generated query.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Auto-execute",
							hint: "Run queries automatically after verification passes.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Save history",
							hint: "Keep a searchable history of your queries.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-destructive/30 bg-destructive/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base text-destructive",
					children: "Danger zone"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Irreversible workspace actions." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Delete this workspace and all its data."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						children: "Delete workspace"
					})]
				})]
			})
		]
	});
}
function Row({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: hint
		})] }), children]
	});
}
//#endregion
export { SettingsPage as component };
