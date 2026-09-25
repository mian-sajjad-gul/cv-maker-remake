import { BulletList, CertificationList, SkillsList, getOrder } from "./templateUtils";

function NordicSection({ title, children }) {
  if (!children) return null;
  return (
    <section className="mt-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="block h-4 w-[3px] rounded-full shrink-0" style={{ background: "var(--resume-accent, #0f172a)" }} />
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "var(--resume-accent, #64748b)" }}>
          {title}
        </h2>
        <span className="flex-1 block h-px bg-slate-100" />
      </div>
      <div>{children}</div>
    </section>
  );
}

function NordicExpBlock({ item }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}{item.location ? ` · ${item.location}` : ""}</p>
        </div>
        <span className="text-[11px] text-slate-400 shrink-0 mt-0.5">
          {[item.startDate, item.endDate].filter(Boolean).join(" – ")}
        </span>
      </div>
      <BulletList bullets={item.bullets} className="text-xs mt-1.5 text-slate-600" />
    </div>
  );
}

const sections = {
  summary: (data) => data.summary ? (
    <NordicSection key="summary" title="Profile">
      <p className="text-sm leading-relaxed text-slate-600">{data.summary}</p>
    </NordicSection>
  ) : null,
  skills: (data) => data.skills.length > 0 ? (
    <NordicSection key="skills" title="Skills">
      <SkillsList skills={data.skills} variant="plain" className="text-xs text-slate-600" />
    </NordicSection>
  ) : null,
  experience: (data) => data.experience.length > 0 ? (
    <NordicSection key="experience" title="Experience">
      {data.experience.map((item) => <NordicExpBlock key={item.id} item={item} />)}
    </NordicSection>
  ) : null,
  projects: (data) => data.projects.length > 0 ? (
    <NordicSection key="projects" title="Projects">
      {data.projects.map((item) => (
        <div key={item.id} className="mb-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
            </div>
            {item.link && <span className="text-[11px] text-slate-400 shrink-0">{item.link}</span>}
          </div>
          <BulletList bullets={item.bullets} className="text-xs mt-1.5 text-slate-600" />
        </div>
      ))}
    </NordicSection>
  ) : null,
  education: (data) => data.education.length > 0 ? (
    <NordicSection key="education" title="Education">
      {data.education.map((edu) => (
        <div key={edu.id} className="mb-3">
          <h3 className="text-sm font-semibold text-slate-900">{edu.degree}</h3>
          <p className="text-xs text-slate-500">{edu.school}{edu.location ? `, ${edu.location}` : ""}</p>
          <p className="text-[11px] text-slate-400">{[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</p>
          {edu.details && <p className="text-xs text-slate-500 mt-1">{edu.details}</p>}
        </div>
      ))}
    </NordicSection>
  ) : null,
  certifications: (data) => data.certifications.filter(Boolean).length > 0 ? (
    <NordicSection key="certifications" title="Certifications">
      <CertificationList certifications={data.certifications} className="text-xs text-slate-600" />
    </NordicSection>
  ) : null,
};

export function NordicTemplate({ data }) {
  return (
    <article className="resume-page bg-white px-12 py-10 font-sans text-sm text-slate-900 shadow-paper">
      <header className="border-b border-slate-100 pb-6">
        <h1 className="text-5xl font-extralight tracking-tight text-slate-900">{data.personal.name || "Your Name"}</h1>
        <p className="mt-2 text-base font-medium tracking-wide" style={{ color: "var(--resume-accent, #475569)" }}>
          {data.personal.headline}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website, data.personal.linkedin, data.personal.github]
            .filter(Boolean).map((item, i) => <span key={i} className="text-xs text-slate-500">{item}</span>)}
        </div>
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
