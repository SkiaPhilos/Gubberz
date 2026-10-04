import { useEffect, useState, useCallback, useMemo } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = useCallback(async (currentUser: User | null) => {
    if (!currentUser) {
      setIsAdmin(false);
      return;
    }

    // 1. Check environment variable (VITE_ADMIN_EMAILS)
    const adminEmails = (import.meta.env["VITE_ADMIN_EMAILS"] || "")
      .split(",")
      .map((e: string) => e.trim().toLowerCase())
      .filter(Boolean);

    const userEmail = (currentUser.email || "").toLowerCase().trim();
    if (userEmail && adminEmails.includes(userEmail)) {
      setIsAdmin(true);
      return;
    }

    // 2. Check user_roles table or metadata
    try {
      const { data } = await supabase.rpc("has_role", {
        _user_id: currentUser.id,
        _role: "admin",
      });
      if (data) {
        setIsAdmin(true);
        return;
      }
    } catch {
      // Ignore RPC error
    }

    setIsAdmin(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    // Fetch initial user session
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      if (!mounted) return;
      setUser(currentUser);
      checkAdminStatus(currentUser);
      setIsLoading(false);
    });

    // Subscribe to auth state updates
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        await checkAdminStatus(currentUser);
        setIsLoading(false);
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkAdminStatus]);

  const signInWithGoogle = useCallback(async (returnTo = "/") => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("auth_redirect", returnTo);
    }
    return supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { prompt: "select_account" },
      },
    });
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  }, []);

  return useMemo(
    () => ({
      user,
      isLoading,
      isAdmin,
      signInWithGoogle,
      signOut,
    }),
    [user, isLoading, isAdmin, signInWithGoogle, signOut],
  );
}
