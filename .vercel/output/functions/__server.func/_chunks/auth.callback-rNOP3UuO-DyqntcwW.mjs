import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { x as useNavigate } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
import { t as supabase } from "./client-BpRE6ta9-DiENUv8t.mjs";
import { n as toast } from "./_libs/sonner-6wP9uXZa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.callback-rNOP3UuO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/auth.callback.tsx?tsr-split=component";
function AuthCallbackPage() {
	const navigate = useNavigate();
	const [status, setStatus] = (0, import_react.useState)("processing");
	const [errorMessage, setErrorMessage] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let mounted = true;
		async function handleAuth() {
			try {
				const params = new URLSearchParams(window.location.search);
				const code = params.get("code");
				const error = params.get("error_description") || params.get("error");
				if (error) throw new Error(error);
				if (code) {
					const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
					if (exchangeError) console.warn("Code exchange notice:", exchangeError.message);
				}
				const { data: { session }, error: sessionError } = await supabase.auth.getSession();
				if (sessionError) throw sessionError;
				if (!session?.user) {
					const { data: authListener } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
						if (currentSession?.user && mounted) {
							authListener.subscription.unsubscribe();
							proceedWithUser(currentSession.user);
						}
					});
					setTimeout(async () => {
						if (!mounted) return;
						const { data } = await supabase.auth.getUser();
						if (data?.user) proceedWithUser(data.user);
						else {
							setStatus("error");
							setErrorMessage("Could not complete sign in. Please try again.");
						}
					}, 3500);
					return;
				}
				if (mounted) proceedWithUser(session.user);
			} catch (err) {
				console.error("Auth callback error:", err);
				if (mounted) {
					setStatus("error");
					setErrorMessage(err?.message || "Failed to complete authentication.");
				}
			}
		}
		function proceedWithUser(user) {
			setStatus("success");
			const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "there";
			toast.success(`Welcome back, ${name}!`);
			const storedRedirect = sessionStorage.getItem("auth_redirect");
			sessionStorage.removeItem("auth_redirect");
			const queryReturn = new URLSearchParams(window.location.search).get("returnTo");
			const destination = storedRedirect || queryReturn;
			if (destination && destination !== "/auth") navigate({ to: destination });
			else {
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
		}
		handleAuth();
		return () => {
			mounted = false;
		};
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-[65vh] flex-col items-center justify-center px-5 py-24 text-center",
		children: [
			status === "processing" && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (void 0)("div", { className: "inline-block h-9 w-9 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("h2", {
						className: "text-xl font-bold",
						children: "Signing you in…"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
						children: "Verifying secure credentials"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 115,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 35
			}, this),
			status === "success" && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-success text-xl font-bold",
						children: "✓"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("h2", {
						className: "text-xl font-bold",
						children: "Signed in successfully!"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 124,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground",
						children: "Redirecting you to Gubberz…"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 120,
				columnNumber: 32
			}, this),
			status === "error" && /* @__PURE__ */ (void 0)("div", {
				className: "max-w-md space-y-4 rounded-3xl border bg-card p-8",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/15 text-destructive text-xl font-bold",
						children: "!"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("h2", {
						className: "text-xl font-bold",
						children: "Authentication Issue"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-sm text-muted-foreground",
						children: errorMessage
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "pt-2 flex justify-center gap-3",
						children: [/* @__PURE__ */ (void 0)("button", {
							onClick: () => navigate({ to: "/auth" }),
							className: "press rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-ink-foreground",
							children: "Back to Sign In"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 135,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("button", {
							onClick: () => navigate({ to: "/" }),
							className: "press rounded-full bg-surface px-5 py-2.5 text-xs font-semibold",
							children: "Go to Storefront"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 140,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 30
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 111,
		columnNumber: 10
	}, this);
}
//#endregion
export { AuthCallbackPage as component };
