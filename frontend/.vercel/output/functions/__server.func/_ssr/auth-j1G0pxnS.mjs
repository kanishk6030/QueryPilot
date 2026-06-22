import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as loginWithGithub, r as useAuth } from "./AuthContext-CBh0WCTG.mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { a as Sparkles, x as Github } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-j1G0pxnS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function AuthPage() {
	const navigate = useNavigate();
	const { login, signup } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [signinForm, setSigninForm] = (0, import_react.useState)({
		email: "",
		password: ""
	});
	const [signupForm, setSignupForm] = (0, import_react.useState)({
		name: "",
		email: "",
		password: ""
	});
	const submitSignin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { error } = await login(signinForm.email, signinForm.password);
			if (error) {
				toast.error(error.message);
				return;
			}
			toast.success("Signed in successfully");
			navigate({ to: "/dashboard" });
		} finally {
			setLoading(false);
		}
	};
	const submitSignup = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { error } = await signup(signupForm.email, signupForm.password, signupForm.name);
			if (error) {
				toast.error(error.message);
				return;
			}
			toast.success("Account created successfully");
			navigate({ to: "/dashboard" });
		} finally {
			setLoading(false);
		}
	};
	const submitGithub = async () => {
		setLoading(true);
		try {
			const { error } = await loginWithGithub();
			if (error) toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden overflow-hidden border-r border-border bg-sidebar lg:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-full flex-col justify-between p-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold tracking-tight",
							children: "Copilot"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "space-y-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-balance text-lg leading-relaxed text-foreground/90",
							children: "\"We replaced three internal BI tools with Copilot. Our analysts ship answers in minutes, not hours.\""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
							className: "text-muted-foreground",
							children: "Priya Shah · Head of Data, Northwind"
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center p-6 lg:p-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 text-center lg:text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-semibold tracking-tight",
							children: "Welcome back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Sign in to your workspace to continue."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "signin",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid w-full grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signin",
									children: "Sign in"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signup",
									children: "Create account"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "signin",
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: submitSignin,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "email",
												children: "Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "email",
												type: "email",
												value: signinForm.email,
												onChange: (e) => setSigninForm({
													...signinForm,
													email: e.target.value
												}),
												placeholder: "you@company.com",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "password",
													children: "Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													className: "text-xs text-muted-foreground hover:text-foreground",
													href: "#",
													children: "Forgot?"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "password",
												type: "password",
												value: signinForm.password,
												onChange: (e) => setSigninForm({
													...signinForm,
													password: e.target.value
												}),
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "w-full",
											disabled: loading,
											children: loading ? "Signing in..." : "Sign in"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "signup",
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: submitSignup,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "name",
												children: "Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "name",
												value: signupForm.name,
												onChange: (e) => setSignupForm({
													...signupForm,
													name: e.target.value
												}),
												placeholder: "Alex Morgan",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "email2",
												children: "Work email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "email2",
												type: "email",
												value: signupForm.email,
												onChange: (e) => setSignupForm({
													...signupForm,
													email: e.target.value
												}),
												placeholder: "you@company.com",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "password2",
												children: "Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "password2",
												type: "password",
												value: signupForm.password,
												onChange: (e) => setSignupForm({
													...signupForm,
													password: e.target.value
												}),
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "w-full",
											disabled: loading,
											children: loading ? "Creating account..." : "Create account"
										})
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative flex justify-center text-xs uppercase tracking-wider",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-background px-2 text-muted-foreground",
								children: "Or continue with"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "w-full",
						disabled: loading,
						onClick: submitGithub,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "mr-2 h-4 w-4" }), " GitHub"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: "By continuing you agree to our Terms and Privacy Policy."
					})
				]
			})
		})]
	});
}
//#endregion
export { AuthPage as component };
