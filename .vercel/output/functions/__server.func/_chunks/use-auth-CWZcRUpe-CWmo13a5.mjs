import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { t as supabase } from "./client-BpRE6ta9-DiENUv8t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-CWZcRUpe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAuth() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const checkAdminStatus = (0, import_react.useCallback)(async (currentUser) => {
		if (!currentUser) {
			setIsAdmin(false);
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
		const userEmail = (currentUser.email || "").toLowerCase().trim();
		if (userEmail && adminEmails.includes(userEmail)) {
			setIsAdmin(true);
			return;
		}
		try {
			const { data } = await supabase.rpc("has_role", {
				_user_id: currentUser.id,
				_role: "admin"
			});
			if (data) {
				setIsAdmin(true);
				return;
			}
		} catch {}
		setIsAdmin(false);
	}, []);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
			if (!mounted) return;
			setUser(currentUser);
			checkAdminStatus(currentUser);
			setIsLoading(false);
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
			if (!mounted) return;
			const currentUser = session?.user ?? null;
			setUser(currentUser);
			await checkAdminStatus(currentUser);
			setIsLoading(false);
		});
		return () => {
			mounted = false;
			subscription.unsubscribe();
		};
	}, [checkAdminStatus]);
	const signInWithGoogle = (0, import_react.useCallback)(async (returnTo = "/") => {
		if (typeof window !== "undefined") sessionStorage.setItem("auth_redirect", returnTo);
		return supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
				queryParams: { prompt: "select_account" }
			}
		});
	}, []);
	const signOut = (0, import_react.useCallback)(async () => {
		await supabase.auth.signOut();
		setUser(null);
		setIsAdmin(false);
	}, []);
	return (0, import_react.useMemo)(() => ({
		user,
		isLoading,
		isAdmin,
		signInWithGoogle,
		signOut
	}), [
		user,
		isLoading,
		isAdmin,
		signInWithGoogle,
		signOut
	]);
}
//#endregion
export { useAuth as t };
