import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import sitter from "@/assets/characters/sitter.png";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — Gubberz" },
      { name: "description", content: "Sign in to your Gubberz account to track orders and checkout faster." },
      { property: "og:title", content: "Sign in — Gubberz" },
      { property: "og:description", content: "Sign in to your Gubberz account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  // If already authenticated, redirect
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get("returnTo");
        if (returnTo && returnTo !== "/auth") {
          navigate({ to: returnTo as any });
          return;
        }

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
    });
  }, [navigate]);

  async function signInWithGoogle() {
    setBusy(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get("returnTo") || "/";
      sessionStorage.setItem("auth_redirect", returnTo);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: { prompt: "select_account" },
        },
      });

      if (error) {
        toast.error(error.message);
        setBusy(false);
      }
      // Browser redirects to Google consent
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Google sign in failed");
      setBusy(false);
    }
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please provide email and password");
      return;
    }
    setBusy(true);

    try {
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get("returnTo");

      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName.trim() || undefined,
            },
          },
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
          password,
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

  function navigateAfterAuth(user: any, returnTo?: string | null) {
    if (returnTo && returnTo !== "/auth") {
      navigate({ to: returnTo as any });
      return;
    }

    const adminEmails = (import.meta.env["VITE_ADMIN_EMAILS"] || "")
      .split(",")
      .map((e: string) => e.trim().toLowerCase())
      .filter(Boolean);

    const isAdmin = user?.email && adminEmails.includes(user.email.toLowerCase());
    if (isAdmin) {
      navigate({ to: "/admin" });
    } else {
      navigate({ to: "/" });
    }
  }

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-5xl items-center gap-10 px-5 py-16 md:grid-cols-[1fr_320px] md:px-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Gubberz Account
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[0.95] md:text-6xl">
          Welcome to Gubberz.
        </h1>
        <p className="mt-4 max-w-md text-base text-muted-foreground">
          Sign in to automatically prefill delivery details at checkout, track orders, or manage the store workspace.
        </p>

        <div className="mt-8 space-y-4 max-w-md">
          <Button
            onClick={signInWithGoogle}
            disabled={busy}
            size="lg"
            className="w-full min-h-12 rounded-full bg-ink px-7 text-ink-foreground hover:bg-primary font-bold text-sm shadow-sm"
          >
            {busy && !showEmailForm ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                Connecting to Google…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </span>
            )}
          </Button>

          <div className="pt-2 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setShowEmailForm(!showEmailForm)}
              className="font-mono text-muted-foreground hover:text-foreground underline"
            >
              {showEmailForm ? "Hide email form" : "Or use email & password →"}
            </button>

            {showEmailForm && (
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-semibold text-primary hover:underline"
              >
                {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
              </button>
            )}
          </div>

          {showEmailForm && (
            <form onSubmit={handleEmailAuth} className="space-y-3 pt-3 border-t border-border">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Asad Khan"
                    className="h-11 w-full rounded-2xl bg-surface px-4 text-sm outline-none ring-primary focus:ring-2"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="h-11 w-full rounded-2xl bg-surface px-4 text-sm outline-none ring-primary focus:ring-2"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-2xl bg-surface px-4 text-sm outline-none ring-primary focus:ring-2"
                />
              </div>

              <Button
                type="submit"
                disabled={busy}
                className="w-full min-h-11 rounded-full bg-surface text-foreground hover:bg-muted font-bold text-xs uppercase tracking-wider"
              >
                {busy ? "Processing…" : isSignUp ? "Create Gubberz Account" : "Sign in with password"}
              </Button>
            </form>
          )}
        </div>
      </div>
      <img src={sitter} alt="A Gubberz character sitting" className="mx-auto w-64 object-contain" />
    </div>
  );
}
