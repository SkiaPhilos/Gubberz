import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Verifying Authentication — Gubberz" },
      { name: "description", content: "Completing secure sign in…" },
    ],
  }),
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function handleAuth() {
      try {
        // Handle code exchange if PKCE code is in search params
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const error = params.get("error_description") || params.get("error");

        if (error) {
          throw new Error(error);
        }

        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.warn("Code exchange notice:", exchangeError.message);
          }
        }

        // Get the resolved session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (!session?.user) {
          // Listen once for auth state change in case hash is being parsed
          const { data: authListener } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
            if (currentSession?.user && mounted) {
              authListener.subscription.unsubscribe();
              proceedWithUser(currentSession.user);
            }
          });

          // Timeout fallback
          setTimeout(async () => {
            if (!mounted) return;
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
              proceedWithUser(data.user);
            } else {
              setStatus("error");
              setErrorMessage("Could not complete sign in. Please try again.");
            }
          }, 3500);
          return;
        }

        if (mounted) {
          proceedWithUser(session.user);
        }
      } catch (err: any) {
        console.error("Auth callback error:", err);
        if (mounted) {
          setStatus("error");
          setErrorMessage(err?.message || "Failed to complete authentication.");
        }
      }
    }

    function proceedWithUser(user: any) {
      setStatus("success");
      const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "there";
      toast.success(`Welcome back, ${name}!`);

      // Determine where to redirect
      const storedRedirect = sessionStorage.getItem("auth_redirect");
      sessionStorage.removeItem("auth_redirect");

      // Check URL query returnTo
      const params = new URLSearchParams(window.location.search);
      const queryReturn = params.get("returnTo");

      const destination = storedRedirect || queryReturn;

      if (destination && destination !== "/auth") {
        navigate({ to: destination as any });
      } else {
        // Check if user is admin
        const adminEmails = (import.meta.env["VITE_ADMIN_EMAILS"] || "")
          .split(",")
          .map((e: string) => e.trim().toLowerCase())
          .filter(Boolean);

        const isAdmin = user.email && adminEmails.includes(user.email.toLowerCase());
        if (isAdmin) {
          navigate({ to: "/admin" });
        } else {
          navigate({ to: "/" });
        }
      }
    }

    handleAuth();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-5 py-24 text-center">
      {status === "processing" && (
        <div className="space-y-4">
          <div className="inline-block h-9 w-9 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
          <h2 className="text-xl font-bold">Signing you in…</h2>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Verifying secure credentials
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-success text-xl font-bold">
            ✓
          </div>
          <h2 className="text-xl font-bold">Signed in successfully!</h2>
          <p className="text-xs text-muted-foreground">Redirecting you to Gubberz…</p>
        </div>
      )}

      {status === "error" && (
        <div className="max-w-md space-y-4 rounded-3xl border bg-card p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/15 text-destructive text-xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold">Authentication Issue</h2>
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate({ to: "/auth" })}
              className="press rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-ink-foreground"
            >
              Back to Sign In
            </button>
            <button
              onClick={() => navigate({ to: "/" })}
              className="press rounded-full bg-surface px-5 py-2.5 text-xs font-semibold"
            >
              Go to Storefront
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
