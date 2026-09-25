import Link from "next/link";
import { loginAdmin } from "../actions";
import { Shield, Lock, Mail, ArrowLeft, KeyRound } from "lucide-react";

export const metadata = {
  title: "Admin Portal Login | CVPair",
  description: "Secure administrative login for CVPair CV Maker.",
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const isError = params?.error === "invalid";

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
          {isError && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 flex items-center gap-2">
              <KeyRound className="h-4 w-4 shrink-0 text-red-600" />
              <span>Invalid email or password. Please check your credentials.</span>
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
                  defaultValue="admin@cvpair.com"
                  placeholder="admin@cvpair.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                  defaultValue="admin123"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 shadow-sm transition"
            >
              Sign In to Admin
            </button>
          </form>

          {/* Development Credential Notice */}
          <div className="mt-6 rounded-2xl bg-indigo-50/60 p-4 border border-indigo-100 text-xs text-indigo-900">
            <p className="font-bold flex items-center gap-1.5 mb-1 text-indigo-950">
              <KeyRound className="h-3.5 w-3.5 text-indigo-600" />
              Default Admin Credentials:
            </p>
            <div className="font-mono text-[11px] space-y-0.5 text-indigo-800">
              <p>Email: <span className="font-bold text-slate-900">admin@cvpair.com</span></p>
              <p>Password: <span className="font-bold text-slate-900">admin123</span></p>
            </div>
            <p className="mt-1 text-[10px] text-indigo-600">
              Configured via ADMIN_EMAIL and ADMIN_PASSWORD in environment.
            </p>
          </div>

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
