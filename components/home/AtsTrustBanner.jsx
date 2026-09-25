import { ShieldCheck } from "lucide-react";

export function AtsTrustBanner() {
  const atsSystems = [
    { name: "Workday", tag: "Enterprise ATS" },
    { name: "Greenhouse", tag: "High-Growth ATS" },
    { name: "Lever", tag: "Talent Platform" },
    { name: "Taleo / Oracle", tag: "Corporate Standard" },
    { name: "iCIMS", tag: "Recruitment Cloud" },
    { name: "BambooHR", tag: "HR & Hiring" },
  ];

  return (
    <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Guaranteed ATS Compliance
              </p>
              <p className="text-sm font-black text-slate-900">
                Tested against top Applicant Tracking Systems
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center gap-4 sm:gap-8 text-center">
            {atsSystems.map((item) => (
              <div key={item.name} className="flex flex-col items-center">
                <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-slate-950 transition">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
