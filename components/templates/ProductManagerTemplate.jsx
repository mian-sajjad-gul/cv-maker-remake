import { BulletList, ContactLine, getOrder } from "./templateUtils";

function Section({ title, children }) {
  return (
    <section className="mt-5">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">{title}</h2>
        <div className="h-px flex-1 bg-slate-300" />
      </div>
      {children}
    </section>
  );
}

function PMItem({ title, subtitle, startDate, endDate, metric, bullets = [] }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="flex justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words font-black text-slate-950">{title}</h3>
          {subtitle && <p className="break-words text-sm font-semibold text-slate-700">{subtitle}</p>}
        </div>
        <p className="shrink-0 text-right text-xs font-semibold text-slate-500">{[startDate, endDate].filter(Boolean).join(" - ")}</p>
      </div>
      {metric && <p className="mt-2 rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800">Impact: {metric}</p>}
      <BulletList bullets={bullets} className="text-xs leading-relaxed" />
    </div>
  );
}

const sections = {
  summary: (data) => data.summary ? (
    <Section key="summary" title="Product Narrative">
      <p className="leading-relaxed text-slate-700">{data.summary}</p>
    </Section>
  ) : null,
  skills: (data) => data.skills?.length > 0 ? (
    <Section key="skills" title="Core PM Skills">
      <div className="grid grid-cols-2 gap-2">
        {data.skills.filter(Boolean).map((skill) => (
          <span key={skill} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">{skill}</span>
        ))}
      </div>
    </Section>
  ) : null,
  experience: (data) => data.experience?.length > 0 ? (
    <Section key="experience" title="Product Leadership">
      <div className="space-y-3">
        {data.experience.map((item) => (
          <PMItem key={item.id} title={item.title} subtitle={item.subtitle} startDate={item.startDate} endDate={item.endDate} metric={item.metric} bullets={item.bullets} />
        ))}
      </div>
    </Section>
  ) : null,
  projects: (data) => data.projects?.length > 0 ? (
    <Section key="projects" title="Product Case Studies">
      <div className="space-y-3">
        {data.projects.map((item) => (
          <PMItem key={item.id} title={item.title} subtitle={item.subtitle} metric={item.link} bullets={item.bullets} />
        ))}
      </div>
    </Section>
  ) : null,
  education: (data) => data.education?.length > 0 ? (
    <Section key="education" title="Education">
      <div className="space-y-2">
        {data.education.map((edu) => (
          <PMItem key={edu.id} title={edu.degree} subtitle={edu.school} startDate={edu.startDate} endDate={edu.endDate} metric={edu.details} />
        ))}
      </div>
    </Section>
  ) : null,
  certifications: (data) => data.certifications?.length > 0 ? (
    <Section key="certifications" title="Certifications">
      <div className="flex flex-wrap gap-2">
        {data.certifications.filter(Boolean).map((cert) => (
          <span key={cert} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">{cert}</span>
        ))}
      </div>
    </Section>
  ) : null,
};

export function ProductManagerTemplate({ data }) {
  return (
    <article className="resume-page bg-white p-10 font-sans text-sm text-slate-900 shadow-paper">
      <header className="rounded-2xl p-6 text-white" style={{ background: "var(--resume-accent, #0f172a)" }}>
        <h1 className="break-words text-4xl font-black tracking-tight">{data.personal.name || "Your Name"}</h1>
        <p className="mt-1 break-words text-base font-semibold text-white/80">{data.personal.headline}</p>
        <ContactLine personal={data.personal} separator=" | " className="mt-3 break-words text-xs text-white/70" />
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
