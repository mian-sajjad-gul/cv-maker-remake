import Link from "next/link";
import { loginAdmin } from "../actions";
import { Shield, Lock, Mail, ArrowLeft, KeyRound, ShieldAlert, Clock } from "lucide-react";

export const metadata = {
  title: "Admin Portal Login | CVPair",
  description: "Secure administrative login for CVPair CV Maker.",
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const isBlocked = params?.error === "blocked";
  const retryAfter = params?.retryAfter || "15";
  const isInvalid = params?.error === "invalid";
  const isUnauthorized = params?.error === "unauthorized";
  const remaining = params?.remaining;

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
            <Shield className="h-6 w-6 text-indigo-400" />
          </div>
        </div>
        <h1 className="mt-4 text-center text-3xl font-black tracking-tight text-slate-900">
          CVPair Admin Portal
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          Administrative control center for blog, comments moderation, and inquiries inbox.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Security Lockout Banner */}
          {isBlocked && (
            <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-xs text-rose-900 shadow-xs">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-rose-950 text-sm">Security Lockout Active</h4>
                  <p className="mt-1 text-rose-800 leading-relaxed">
                    Too many failed login attempts were detected from your IP address. For your security, admin login is temporarily locked.
                  </p>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-rose-100 px-2.5 py-1 text-[11px] font-bold text-rose-900">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Try again in approximately {retryAfter} minute(s)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Unauthorized Role Banner */}
          {isUnauthorized && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-xs text-amber-900 shadow-xs">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-sm">Unauthorized Account</h4>
                  <p className="mt-1 text-amber-800 leading-relaxed">
                    This account is authenticated but does not possess administrative access privileges. Please sign in with authorized administrator credentials.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Invalid Credentials Banner */}
          {isInvalid && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-xs text-amber-900 shadow-xs">
              <div className="flex items-start gap-3">
                <KeyRound className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-sm">Authentication Failed</h4>
                  <p className="mt-1 text-amber-800 leading-relaxed">
                    Invalid email address or password. Please verify your credentials.
                  </p>
                  {remaining !== undefined && (
                    <p className="mt-2 text-[11px] font-semibold text-amber-900">
                      Rate limiting: <span className="font-bold text-rose-700">{remaining} attempt(s) remaining</span> before 15-minute temporary lockout.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <form action={loginAdmin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  required
                  disabled={isBlocked}
                  defaultValue=""
                  placeholder="admin@cvpair.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:bg-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  name="password"
                  type="password"
                  required
                  disabled={isBlocked}
                  defaultValue=""
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:bg-slate-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isBlocked}
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBlocked ? "Access Suspended (Rate Limited)" : "Sign In to Admin"}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-slate-100 pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Public Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
