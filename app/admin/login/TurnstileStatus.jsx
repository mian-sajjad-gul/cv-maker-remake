"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState, useRef } from "react";

export default function CaptchaSubmit({ isBlocked }) {
  const [captchaToken, setCaptchaToken] = useState(null);
  const turnstileRef = useRef(null);

  return (
    <>
      {/* Sent with the form so the server action can read it */}
      <input type="hidden" name="captcha_token" value={captchaToken ?? ""} />

      <div className="flex justify-center">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          onSuccess={setCaptchaToken}
          onExpire={() => setCaptchaToken(null)}
          onError={() => setCaptchaToken(null)}
          options={{ theme: "auto" }}
        />
      </div>

      <button
        type="submit"
        disabled={isBlocked || !captchaToken}
        className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isBlocked
          ? "Access Suspended (Rate Limited)"
          : !captchaToken
            ? "Verifying you're human..."
            : "Sign In to Admin"}
      </button>
    </>
  );
}
