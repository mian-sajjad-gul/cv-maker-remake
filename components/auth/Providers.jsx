"use client";

import { AuthProvider } from "@/lib/authContext";
import { AuthModal } from "@/components/auth/AuthModal";

export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <AuthModal />
    </AuthProvider>
  );
}
