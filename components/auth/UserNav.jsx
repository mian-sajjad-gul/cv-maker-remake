"use client";

import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { User, LogOut, FileText, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";

export function UserNav() {
  const { user, loading, openAuthModal, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) {
    return <div className="h-8 w-20 animate-pulse rounded-full bg-slate-100" />;
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => openAuthModal()}
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition shadow-2xs"
      >
        <User className="h-3.5 w-3.5 text-slate-500" />
        <span>Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50 transition shadow-2xs"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || "User"}
            className="h-6 w-6 rounded-full object-cover border border-slate-200"
          />
        ) : (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
            {(user.name || user.email || "U").charAt(0).toUpperCase()}
          </div>
        )}
        <span className="max-w-[100px] truncate sm:max-w-[140px]">
          {user.name || user.email.split("@")[0]}
        </span>
        <ChevronDown className="h-3 w-3 text-slate-400" />
      </button>

      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setDropdownOpen(false)}
          />
          <div className="absolute right-0 top-10 z-30 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-100">
            <div className="border-b border-slate-100 px-3 py-2">
              <p className="text-xs font-bold text-slate-900 truncate">
                {user.name || "Signed In"}
              </p>
              <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
              <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Verified {user.provider === "google" ? "Google" : "Email"} User</span>
              </div>
            </div>

            <div className="py-1">
              <Link
                href="/resume"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition"
              >
                <FileText className="h-3.5 w-3.5 text-slate-400" />
                <span>My CV Editor</span>
              </Link>
            </div>

            <div className="border-t border-slate-100 pt-1">
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  signOut();
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
