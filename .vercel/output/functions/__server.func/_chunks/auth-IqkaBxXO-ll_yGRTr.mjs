import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { x as useNavigate } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
import { t as supabase } from "./client-BpRE6ta9-DiENUv8t.mjs";
import { n as toast } from "./_libs/sonner-6wP9uXZa.mjs";
import { t as Button } from "./button-CL26GRh8-BmVf9hhg.mjs";
import { t as sitter_default } from "./sitter-YlL7wGNE-DEiTACFb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-IqkaBxXO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/auth.tsx?tsr-split=component";
function AuthPage() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [isSignUp, setIsSignUp] = (0, import_react.useState)(false);
	const [showEmailForm, setShowEmailForm] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data: { user } }) => {
			if (user) {
				const returnTo = new URLSearchParams(window.location.search).get("returnTo");
				if (returnTo && returnTo !== "/auth") {
					navigate({ to: returnTo });
					return;
				}
				const adminEmails = ({
					"BASE_URL": "/",
					"DEV": true,
					"MODE": "production",
					"PROD": false,
					"SSR": true,
					"TSS_DEV_SERVER": "false",
					"TSS_DEV_SSR_STYLES_BASEPATH": "/",
					"TSS_DEV_SSR_STYLES_ENABLED": "true",
					"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
					"TSS_INLINE_CSS_ENABLED": "false",
					"TSS_ROUTER_BASEPATH": "",
					"TSS_SERVER_FN_BASE": "/_serverFn/",
					"VITE_ADMIN_EMAILS": "maniacphilos@gmail.com",
					"VITE_SUPABASE_PROJECT_ID": "csvnjedaklqwgwyeidkm",
					"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_p_FlIPIEnKJ49VbCeRsjzA_0MVh3gR9",
					"VITE_SUPABASE_URL": "https://csvnjedaklqwgwyeidkm.supabase.co/"
				}["VITE_ADMIN_EMAILS"] || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
				if (user.email && adminEmails.includes(user.email.toLowerCase())) navigate({ to: "/admin" });
				else navigate({ to: "/" });
			}
		});
	}, [navigate]);
	async function signInWithGoogle() {
		setBusy(true);
		try {
			const returnTo = new URLSearchParams(window.location.search).get("returnTo") || "/";
			sessionStorage.setItem("auth_redirect", returnTo);
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `${window.location.origin}/auth/callback`,
					queryParams: { prompt: "select_account" }
				}
			});
			if (error) {
				toast.error(error.message);
				setBusy(false);
			}
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Google sign in failed");
			setBusy(false);
		}
	}
	async function handleEmailAuth(e) {
		e.preventDefault();
		if (!email || !password) {
			toast.error("Please provide email and password");
			return;
		}
		setBusy(true);
		try {
			const returnTo = new URLSearchParams(window.location.search).get("returnTo");
			if (isSignUp) {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: { data: { full_name: fullName.trim() || void 0 } }
				});
				if (error) {
					toast.error(error.message);
					setBusy(false);
					return;
				}
				if (data.session) {
					toast.success("Account created and signed in!");
					navigateAfterAuth(data.user, returnTo);
				} else {
					toast.success("Account created! Please check your email to confirm or sign in.");
					setIsSignUp(false);
				}
			} else {
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) {
					toast.error(error.message);
					setBusy(false);
					return;
				}
				if (data?.user) {
					toast.success("Signed in successfully!");
					navigateAfterAuth(data.user, returnTo);
				}
			}
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Authentication error");
		} finally {
			setBusy(false);
		}
	}
	function navigateAfterAuth(user, returnTo) {
		if (returnTo && returnTo !== "/auth") {
			navigate({ to: returnTo });
			return;
		}
		const adminEmails = ({
			"BASE_URL": "/",
			"DEV": true,
			"MODE": "production",
			"PROD": false,
			"SSR": true,
			"TSS_DEV_SERVER": "false",
			"TSS_DEV_SSR_STYLES_BASEPATH": "/",
			"TSS_DEV_SSR_STYLES_ENABLED": "true",
			"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
			"TSS_INLINE_CSS_ENABLED": "false",
			"TSS_ROUTER_BASEPATH": "",
			"TSS_SERVER_FN_BASE": "/_serverFn/",
			"VITE_ADMIN_EMAILS": "maniacphilos@gmail.com",
			"VITE_SUPABASE_PROJECT_ID": "csvnjedaklqwgwyeidkm",
			"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_p_FlIPIEnKJ49VbCeRsjzA_0MVh3gR9",
			"VITE_SUPABASE_URL": "https://csvnjedaklqwgwyeidkm.supabase.co/"
		}["VITE_ADMIN_EMAILS"] || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
		if (user?.email && adminEmails.includes(user.email.toLowerCase())) navigate({ to: "/admin" });
		else navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto grid min-h-[70vh] max-w-5xl items-center gap-10 px-5 py-16 md:grid-cols-[1fr_320px] md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
				children: "Gubberz Account"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 153,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "mt-4 max-w-2xl text-4xl font-extrabold leading-[0.95] md:text-6xl",
				children: "Welcome to Gubberz."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 156,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-4 max-w-md text-base text-muted-foreground",
				children: "Sign in to automatically prefill delivery details at checkout, track orders, or manage the store workspace."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 159,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 space-y-4 max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: signInWithGoogle,
						disabled: busy,
						size: "lg",
						className: "w-full min-h-12 rounded-full bg-ink px-7 text-ink-foreground hover:bg-primary font-bold text-sm shadow-sm",
						children: busy && !showEmailForm ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 166,
								columnNumber: 17
							}, this), "Connecting to Google…"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 39
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
								className: "h-4 w-4",
								viewBox: "0 0 24 24",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "currentColor",
										d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 170,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "currentColor",
										d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 171,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "currentColor",
										d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 172,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "currentColor",
										d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 173,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 17
							}, this), "Continue with Google"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 168,
							columnNumber: 25
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "pt-2 flex items-center justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setShowEmailForm(!showEmailForm),
							className: "font-mono text-muted-foreground hover:text-foreground underline",
							children: showEmailForm ? "Hide email form" : "Or use email & password →"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 180,
							columnNumber: 13
						}, this), showEmailForm && /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setIsSignUp(!isSignUp),
							className: "font-semibold text-primary hover:underline",
							children: isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 184,
							columnNumber: 31
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 179,
						columnNumber: 11
					}, this),
					showEmailForm && /* @__PURE__ */ (void 0)("form", {
						onSubmit: handleEmailAuth,
						className: "space-y-3 pt-3 border-t border-border",
						children: [
							isSignUp && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-mono text-muted-foreground uppercase mb-1",
								children: "Your Name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								required: true,
								value: fullName,
								onChange: (e) => setFullName(e.target.value),
								placeholder: "e.g. Asad Khan",
								className: "h-11 w-full rounded-2xl bg-surface px-4 text-sm outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 194,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 28
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-mono text-muted-foreground uppercase mb-1",
								children: "Email Address"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "you@domain.com",
								className: "h-11 w-full rounded-2xl bg-surface px-4 text-sm outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 201,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-mono text-muted-foreground uppercase mb-1",
								children: "Password"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "password",
								required: true,
								minLength: 6,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "••••••••",
								className: "h-11 w-full rounded-2xl bg-surface px-4 text-sm outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 208,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Button, {
								type: "submit",
								disabled: busy,
								className: "w-full min-h-11 rounded-full bg-surface text-foreground hover:bg-muted font-bold text-xs uppercase tracking-wider",
								children: busy ? "Processing…" : isSignUp ? "Create Gubberz Account" : "Sign in with password"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 189,
						columnNumber: 29
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 163,
				columnNumber: 9
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 152,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
			src: sitter_default,
			alt: "A Gubberz character sitting",
			className: "mx-auto w-64 object-contain"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 217,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 151,
		columnNumber: 10
	}, this);
}
//#endregion
export { AuthPage as component };
