"use client";

import { useEffect } from "react";
import { dummyAds } from "@/lib/dummyAds";

export function AdBlock({
  slot = "dummy-slot",
  type = "rectangle",
  className = "",
  format = "auto",
  responsive = true,
}) {
  const useDummyAds = process.env.NEXT_PUBLIC_USE_DUMMY_ADS === "true";
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;
  const ad = dummyAds[type] || dummyAds.rectangle;

  useEffect(() => {
    if (useDummyAds || !clientId) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {}
  }, [useDummyAds, clientId]);

  if (useDummyAds) {
    return (
      <div className={`no-print my-8 ${className}`}>
        <p className="mb-2 text-center text-[10px] uppercase tracking-[0.2em] text-slate-400">
          Advertisement · {ad.size}
        </p>

        {type === "leaderboard" && (
          <div className="mx-auto flex min-h-[90px] max-w-[728px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img
              src={ad.image}
              alt={ad.title}
              className="h-[90px] w-40 object-cover"
            />
            <div className="flex flex-1 items-center justify-between gap-4 px-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  {ad.sponsor}
                </p>
                <h3 className="text-base font-black text-slate-900">
                  {ad.title}
                </h3>
                <p className="text-xs text-slate-500">{ad.subtitle}</p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white">
                {ad.cta}
              </span>
            </div>
          </div>
        )}

        {type === "rectangle" && (
          <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img
              src={ad.image}
              alt={ad.title}
              className="h-32 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {ad.sponsor}
              </p>
              <h3 className="mt-1 text-lg font-black text-slate-900">
                {ad.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{ad.subtitle}</p>
              <span className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white">
                {ad.cta}
              </span>
            </div>
          </div>
        )}

        {type === "vertical" && (
          <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-sm">
            <img
              src={ad.image}
              alt={ad.title}
              className="h-64 w-full object-cover opacity-80"
            />
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">
                {ad.sponsor}
              </p>
              <h3 className="mt-2 text-2xl font-black">{ad.title}</h3>
              <p className="mt-2 text-sm text-white/70">{ad.subtitle}</p>
              <span className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900">
                {ad.cta}
              </span>
            </div>
          </div>
        )}

        {type === "native" && (
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:flex">
            <img
              src={ad.image}
              alt={ad.title}
              className="h-48 w-full object-cover md:h-auto md:w-56"
            />
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Sponsored · {ad.sponsor}
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                {ad.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{ad.subtitle}</p>
              <span className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white">
                {ad.cta}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!clientId) return null;

  return (
    <div className={`no-print my-8 overflow-hidden ${className}`}>
      <p className="mb-2 text-center text-[10px] uppercase tracking-[0.2em] text-slate-400">
        Advertisement
      </p>

      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
