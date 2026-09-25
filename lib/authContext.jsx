"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
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
const REGISTERED_USERS_KEY = "cvpair_registered_users";

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
          const { data: { session } } = await supabaseClient.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
              avatar: session.user.user_metadata?.avatar_url || null,
              provider: session.user.app_metadata?.provider || "supabase",
            });
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("[Auth] Supabase session check error, checking local store:", err);
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
      const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const u = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
            avatar: session.user.user_metadata?.avatar_url || null,
            provider: session.user.app_metadata?.provider || "supabase",
          };
          setUser(u);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        } else {
          setUser(null);
          localStorage.removeItem(STORAGE_KEY);
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

  const triggerPostAuth = useCallback((authedUser) => {
    setUser(authedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authedUser));
    setAuthModalOpen(false);
    if (modalSuccessCallback) {
      modalSuccessCallback(authedUser);
      setModalSuccessCallback(null);
    }
  }, [modalSuccessCallback]);

  // Google / Gmail Sign In
  const signInWithGoogle = async () => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: typeof window !== "undefined" ? window.location.href : undefined,
          },
        });
        if (!error) return { success: true };
      } catch (err) {
        console.warn("[Auth] Supabase Google OAuth failed, continuing with simulated Google login:", err);
      }
    }

    // Interactive Google account picker simulation
    const promptEmail = window.prompt("Enter your Gmail address to sign in with Google:", "user@gmail.com");
    if (!promptEmail) return { success: false, error: "Sign-in cancelled" };

    const email = promptEmail.trim();
    const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
  const signInWithPassword = async (email, password) => {
    if (!email || !password) {
      return { success: false, error: "Please enter both email and password." };
    }

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data?.user) {
          const u = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name || email.split("@")[0],
            avatar: null,
            provider: "email",
          };
          triggerPostAuth(u);
          return { success: true, user: u };
        }
      } catch (err) {
        console.warn("[Auth] Supabase sign in failed, checking local users:", err.message);
      }
    }

    // Local authentication check
    let registered = [];
    try {
      registered = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || "[]");
    } catch {}

    const found = registered.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found && found.password !== password) {
      return { success: false, error: "Incorrect password. Please try again." };
    }

    const authedUser = {
      id: found?.id || `user-${Date.now()}`,
      email: email.trim(),
      name: found?.name || email.split("@")[0],
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=0f172a`,
      provider: "email",
    };

    triggerPostAuth(authedUser);
    return { success: true, user: authedUser };
  };

  // Sign Up with Email, Password & Name
  const signUpWithPassword = async (email, password, name = "") => {
    if (!email || !password) {
      return { success: false, error: "Please provide an email and password." };
    }
    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters." };
    }

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        if (data?.user) {
          const u = {
            id: data.user.id,
            email: data.user.email,
            name: name || email.split("@")[0],
            avatar: null,
            provider: "email",
          };
          triggerPostAuth(u);
          return { success: true, user: u };
        }
      } catch (err) {
        console.warn("[Auth] Supabase signup failed, creating local user:", err.message);
      }
    }

    // Local user store
    let registered = [];
    try {
      registered = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || "[]");
    } catch {}

    const existing = registered.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: "An account with this email already exists. Please sign in." };
    }

    const newUserRecord = {
      id: `user-${Date.now()}`,
      email: email.trim(),
      password,
      name: name.trim() || email.split("@")[0],
      created_at: new Date().toISOString(),
    };

    registered.push(newUserRecord);
    try {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registered));
    } catch {}

    const authedUser = {
      id: newUserRecord.id,
      email: newUserRecord.email,
      name: newUserRecord.name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newUserRecord.name)}&backgroundColor=0f172a`,
      provider: "email",
    };

    triggerPostAuth(authedUser);
    return { success: true, user: authedUser };
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
