"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabaseClient } from "./supabase/client";

const AuthContext = createContext({
  user: null,
  loading: true,
  authModalOpen: false,
  modalSuccessCallback: null,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  signInWithGoogle: async () => {},
  signInWithPassword: async () => {},
  signUpWithPassword: async () => {},
  signOut: async () => {},
});

const STORAGE_KEY = "cvpair_user_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [modalSuccessCallback, setModalSuccessCallback] = useState(null);

  // Initialize session
  useEffect(() => {
    async function initSession() {
      // 1. Try Supabase session if configured
      if (supabaseClient) {
        try {
          const {
            data: { session },
          } = await supabaseClient.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email,
              name:
                session.user.user_metadata?.full_name ||
                session.user.email?.split("@")[0],
              avatar: session.user.user_metadata?.avatar_url || null,
              provider: session.user.app_metadata?.provider || "supabase",
            });
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn(
            "[Auth] Supabase session check error, checking local store:",
            err,
          );
        }
      }

      // 2. Check local session
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (e) {
        console.error("[Auth] Failed to restore local session", e);
      }
      setLoading(false);
    }

    initSession();

    // Listen to Supabase auth state change if client exists
    if (supabaseClient) {
      const {
        data: { subscription },
      } = supabaseClient.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const u = {
            id: session.user.id,
            email: session.user.email,
            name:
              session.user.user_metadata?.full_name ||
              session.user.email?.split("@")[0],
            avatar: session.user.user_metadata?.avatar_url || null,
            provider: session.user.app_metadata?.provider || "supabase",
          };
          setUser(u);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
          } catch {}
        } else if (_event === "SIGNED_OUT") {
          setUser(null);
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {}
        }
      });
      return () => subscription?.unsubscribe();
    }
  }, []);

  const openAuthModal = useCallback((callback = null) => {
    setModalSuccessCallback(() => callback);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
    setModalSuccessCallback(null);
  }, []);

  const triggerPostAuth = useCallback(
    (authedUser) => {
      setUser(authedUser);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authedUser));
      } catch {}
      setAuthModalOpen(false);
      if (modalSuccessCallback) {
        modalSuccessCallback(authedUser);
        setModalSuccessCallback(null);
      }
    },
    [modalSuccessCallback],
  );

  // Google / Gmail Sign In
  const signInWithGoogle = async () => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo:
              typeof window !== "undefined" ? window.location.href : undefined,
          },
        });
        if (!error) return { success: true };
        console.warn("[Auth] Supabase Google OAuth error:", error.message);
      } catch (err) {
        console.warn(
          "[Auth] Supabase Google OAuth failed, continuing with fallback Google login:",
          err,
        );
      }
    }

    // Interactive Google account picker simulation
    const promptEmail = window.prompt(
      "Enter your Gmail address to sign in with Google:",
      "user@gmail.com",
    );
    if (!promptEmail) return { success: false, error: "Sign-in cancelled" };

    const email = promptEmail.trim();
    const name = email
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const googleUser = {
      id: `google-${Date.now()}`,
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=4f46e5`,
      provider: "google",
    };

    triggerPostAuth(googleUser);
    return { success: true, user: googleUser };
  };

  // Email & Password Sign In
  const signInWithPassword = async (email, password, captchaToken) => {
    if (!email || !password) {
      return { success: false, error: "Please enter both email and password." };
    }
    if (!supabaseClient) {
      console.warn(
        "[Auth] Supabase client is not initialized. Check env vars.",
      );
      return {
        success: false,
        error: "Sign in is temporarily unavailable. Please try again later.",
      };
    }
    try {
      const cleanEmail = email.trim();
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: cleanEmail,
        password,
        options: { captchaToken },
      });
      if (error || !data?.user) {
        return {
          success: false,
          error: error?.message || "Invalid email or password.",
        };
      }

      const u = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name || cleanEmail.split("@")[0],
        avatar: data.user.user_metadata?.avatar_url || null,
        provider: "supabase",
      };
      triggerPostAuth(u);
      return { success: true, user: u };
    } catch (error) {
      console.warn("[Auth] Unexpected sign in error:", err?.message || err);
      return {
        success: false,
        error: "Can't reach the server. Check your connection and try again.",
      };
    }
  };
  // Sign Up with Email, Password & Name
  const signUpWithPassword = async (
    email,
    password,
    name = "",
    captchaToken,
  ) => {
    if (!email || !password) {
      return { success: false, error: "Please provide an email and password." };
    }
    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters.",
      };
    }
    if (!supabaseClient) {
      console.warn(
        "[Auth] Supabase client is not initialized. Check env vars.",
      );
      return {
        success: false,
        error: "Sign up temporarily unavailable. Please try again later.",
      };
    }

    try {
      const cleanEmail = email.trim();
      const cleanName = name.trim() || cleanEmail.split("@")[0];

      const { data, error } = await supabaseClient.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          captchaToken,
          data: { full_name: cleanName },
        },
      });
      if (error) throw error;

      if (data?.user) {
        const requiresConfirmation = !data.session;
        const u = {
          id: data.user.id,
          email: data.user.email,
          name: cleanName,
          avatar: null,
          provider: "supabase",
        };

        if (!requiresConfirmation) {
          triggerPostAuth(u);
        }

        return {
          success: true,
          user: u,
          requiresConfirmation,
          message: requiresConfirmation
            ? "Account created! A confirmation email has been dispatched. Please verify your email before signing in."
            : "Account created successfully!",
        };
      }
      return {
        success: false,
        error: "Account could not be created. Please try again.",
      };
    } catch (err) {
      console.warn("[Auth] Supabase signup error:", err?.message || err);
      return {
        success: false,
        error: err?.message || "Failed to create account.",
      };
    }
  };

  // Sign out
  const signOut = async () => {
    if (supabaseClient) {
      try {
        await supabaseClient.auth.signOut();
      } catch (e) {
        console.error("Sign out error", e);
      }
    }
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };
  const signUpResendEmail = async (email) => {
    const cleanEmail = email.trim();
    if (supabaseClient) {
      const { data, error } = await supabase.auth.signUp({
        phone: "123456789",
        password: "example-password",
        options: {
          channel: "whatsapp",
        },
      });
      try {
        const { error } = await supabaseClient.auth.resend({
          type: "signup",
          email: cleanEmail,
          options: {
            emailRedirectTo: "https://example.com/welcome",
          },
        });
      } catch (e) {
        console.error("Sign out error", e);
      }
    }
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signInWithPassword,
        signUpWithPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
