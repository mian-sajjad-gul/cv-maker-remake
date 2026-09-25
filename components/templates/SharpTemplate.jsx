import { BulletList, CertificationList, ContactLine, SkillsList } from "./templateUtils";

function SharpSection({ title, children }) {
  if (!children) return null;
  return (
    <section className="mt-6 pl-4" style={{ borderLeft: "3px solid var(--resume-accent, #0f172a)" }}>
      <h2
        className="mb-2 text-[10px] font-black uppercase tracking-[0.3em]"
        style={{ color: "var(--resume-accent, #0f172a)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SharpTemplate({ data }) {
  return (
    <article className="resume-page bg-white p-10 font-sans text-sm text-slate-900 shadow-paper">
      {/* Header */}
      <header className="pb-6 mb-2">
        <div className="flex justify-between items-end gap-6">
          <div>
            <h1
              className="text-5xl font-black tracking-tight leading-none"
              style={{ color: "var(--resume-accent, #0f172a)" }}
            >
              {data.personal.name || "Your Name"}
            </h1>
            <p className="mt-2 text-base font-semibold text-slate-600">
              {data.personal.headline}
            </p>
          </div>
          {data.personal.photo && (
            <img
              src={data.personal.photo}
              alt={data.personal.name || "Profile"}
              className="h-20 w-20 shrink-0 object-cover rounded-xl"
            />
          )}
        </div>
        <div
          className="mt-4 h-[3px] w-16 rounded-full"
          style={{ background: "var(--resume-accent, #0f172a)" }}
        />
        <ContactLine personal={data.personal} className="mt-3 text-slate-500" />
      </header>

      <div className="grid grid-cols-[1fr_200px] gap-8">
        {/* Main */}
        <div>
          {data.summary && (
            <SharpSection title="Summary">
              <p className="leading-relaxed text-slate-700">{data.summary}</p>
            </SharpSection>
          )}

          {data.experience.length > 0 && (
            <SharpSection title="Experience">
              <div className="space-y-4">
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
                    <BulletList bullets={item.bullets} className="mt-1" />
                  </div>
                ))}
              </div>
            </SharpSection>
          )}

          {data.projects.length > 0 && (
            <SharpSection title="Projects">
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
                    <BulletList bullets={item.bullets} className="mt-1" />
                  </div>
                ))}
              </div>
            </SharpSection>
          )}
        </div>

        {/* Right sidebar */}
        <div className="border-l border-slate-100 pl-6">
          {data.skills.length > 0 && (
            <SharpSection title="Skills">
              <div className="space-y-1">
                {data.skills.filter(Boolean).map((skill) => (
                  <p key={skill} className="text-xs text-slate-700 before:mr-1.5 before:content-['▸']" style={{ "--tw-before-content": "var(--resume-accent)" }}>
                    {skill}
                  </p>
                ))}
              </div>
            </SharpSection>
          )}

          {data.education.length > 0 && (
            <SharpSection title="Education">
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
            </SharpSection>
          )}

          {data.certifications.length > 0 && (
            <SharpSection title="Certs">
              <CertificationList certifications={data.certifications} className="text-xs text-slate-700" />
            </SharpSection>
          )}
        </div>
      </div>
    </article>
  );
}
