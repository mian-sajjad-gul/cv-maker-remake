import { BulletList, CertificationList, SkillsList } from "./templateUtils";

function ColSection({ title, children }) {
  if (!children) return null;
  return (
    <section className="mt-5">
      <h2
        className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] pb-1.5 border-b"
        style={{ color: "var(--resume-accent, #0f172a)", borderColor: "var(--resume-accent, #e2e8f0)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function TwoColumnTemplate({ data }) {
  return (
    <article className="resume-page grid grid-cols-[42%_1fr] bg-white font-sans text-sm text-slate-900 shadow-paper">
      {/* Left column */}
      <aside className="border-r border-slate-100 bg-slate-50 px-7 py-9">
        {/* Photo */}
        {data.personal.photo && (
          <div className="mb-5 flex justify-center">
            <img
              src={data.personal.photo}
              alt={data.personal.name || "Profile"}
              className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
        )}

        {/* Name + headline */}
        <h1 className="text-2xl font-black leading-tight text-slate-900">
          {data.personal.name || "Your Name"}
        </h1>
        <p
          className="mt-1.5 text-sm font-semibold"
          style={{ color: "var(--resume-accent, #475569)" }}
        >
          {data.personal.headline}
        </p>

        {/* Contact */}
        <ColSection title="Contact">
          <ul className="space-y-1.5 text-xs text-slate-600">
            {[
              { icon: "✉", val: data.personal.email },
              { icon: "☎", val: data.personal.phone },
              { icon: "⌖", val: data.personal.location },
              { icon: "🔗", val: data.personal.website },
              { icon: "in", val: data.personal.linkedin },
              { icon: "⌥", val: data.personal.github },
            ]
              .filter((x) => x.val)
              .map((x, i) => (
                <li key={i} className="flex gap-2">
                  <span className="w-4 shrink-0 text-center text-[10px] text-slate-400">{x.icon}</span>
                  <span className="break-all">{x.val}</span>
                </li>
              ))}
          </ul>
        </ColSection>

        {data.skills.length > 0 && (
          <ColSection title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {data.skills.filter(Boolean).map((skill) => (
                <span
                  key={skill}
                  className="rounded-md px-2 py-0.5 text-[11px] font-semibold"
                  style={{ background: "var(--resume-accent, #0f172a)", color: "#fff" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </ColSection>
        )}

        {data.education.length > 0 && (
          <ColSection title="Education">
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-xs text-slate-600">{edu.school}</p>
                  <p className="text-[11px] text-slate-400">
                    {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                  </p>
                </div>
              ))}
            </div>
          </ColSection>
        )}

        {data.certifications.length > 0 && (
          <ColSection title="Certifications">
            <CertificationList certifications={data.certifications} className="text-xs text-slate-600" />
          </ColSection>
        )}
      </aside>

      {/* Right column */}
      <main className="px-8 py-9">
        {data.summary && (
          <ColSection title="About Me">
            <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
          </ColSection>
        )}

        {data.experience.length > 0 && (
          <ColSection title="Work Experience">
            <div className="space-y-5">
              {data.experience.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-500">{item.subtitle}{item.location ? ` · ${item.location}` : ""}</p>
                    </div>
                    <span className="shrink-0 text-[11px] text-slate-400">
                      {[item.startDate, item.endDate].filter(Boolean).join(" – ")}
                    </span>
                  </div>
                  <BulletList bullets={item.bullets} className="text-xs mt-1" />
                </div>
              ))}
            </div>
          </ColSection>
        )}

        {data.projects.length > 0 && (
          <ColSection title="Projects">
            <div className="space-y-4">
              {data.projects.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-500">{item.subtitle}</p>
                    </div>
                    {item.link && (
                      <span className="shrink-0 text-[11px] text-slate-400">{item.link}</span>
                    )}
                  </div>
                  <BulletList bullets={item.bullets} className="text-xs mt-1" />
                </div>
              ))}
            </div>
          </ColSection>
        )}
      </main>
    </article>
  );
}
