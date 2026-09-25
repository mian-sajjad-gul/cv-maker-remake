import { BulletList, CertificationList, EducationBlock, TemplateSection, getOrder } from "./templateUtils";

const sections = {
  summary: (data) => data.summary ? (
    <TemplateSection key="summary" title="Profile">
      <p className="leading-relaxed text-slate-700">{data.summary}</p>
    </TemplateSection>
  ) : null,
  skills: () => null, // rendered in header strip
  experience: (data) => data.experience.length > 0 ? (
    <TemplateSection key="experience" title="Experience">
      <div className="space-y-5">
        {data.experience.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="font-black text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}{item.location ? ` · ${item.location}` : ""}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500 border border-slate-200">
                {[item.startDate, item.endDate].filter(Boolean).join(" – ")}
              </span>
            </div>
            <BulletList bullets={item.bullets} className="mt-2 text-slate-700" />
          </div>
        ))}
      </div>
    </TemplateSection>
  ) : null,
  projects: (data) => data.projects.length > 0 ? (
    <TemplateSection key="projects" title="Projects">
      <div className="grid grid-cols-2 gap-3">
        {data.projects.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 className="font-black text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
            {item.link && <p className="text-[11px] text-slate-400 mt-0.5">{item.link}</p>}
            <BulletList bullets={item.bullets} className="mt-2 text-slate-700" />
          </div>
        ))}
      </div>
    </TemplateSection>
  ) : null,
  education: (data) => data.education.length > 0 ? (
    <TemplateSection key="education" title="Education">
      <div className="space-y-3">{data.education.map((edu) => <EducationBlock key={edu.id} edu={edu} />)}</div>
    </TemplateSection>
  ) : null,
  certifications: (data) => data.certifications.length > 0 ? (
    <TemplateSection key="certifications" title="Certifications">
      <CertificationList certifications={data.certifications} />
    </TemplateSection>
  ) : null,
};

export function BoldTemplate({ data }) {
  return (
    <article className="resume-page bg-white font-sans text-sm text-slate-900 shadow-paper">
      <header className="px-10 py-9" style={{ background: "var(--resume-accent, #0f172a)" }}>
        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0">
            <h1 className="text-6xl font-black leading-none tracking-tight text-white break-words">
              {data.personal.name || "Your Name"}
            </h1>
            <p className="mt-3 text-lg font-semibold text-white/70">{data.personal.headline}</p>
          </div>
          {data.personal.photo && (
            <img src={data.personal.photo} alt={data.personal.name || "Profile"} className="h-24 w-24 shrink-0 rounded-2xl object-cover opacity-90 border-2 border-white/20" />
          )}
        </div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website, data.personal.linkedin, data.personal.github]
            .filter(Boolean).map((item, i) => <span key={i} className="text-xs text-white/60">{item}</span>)}
        </div>
      </header>

      {data.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 px-10 py-4" style={{ background: "color-mix(in srgb, var(--resume-accent, #0f172a) 12%, white)" }}>
          {data.skills.filter(Boolean).map((skill) => (
            <span key={skill} className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: "var(--resume-accent, #0f172a)" }}>{skill}</span>
          ))}
        </div>
      )}

      <div className="px-10 pb-10">
        {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
      </div>
    </article>
  );
}
