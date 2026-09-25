import { BulletList, ContactLine, getOrder } from "./templateUtils";

function BlueSection({ title, children }) {
  return (
    <section className="mt-5">
      <h2 className="px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white" style={{ background: "var(--resume-accent, #0c4a6e)" }}>{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function EuroItem({ title, subtitle, startDate, endDate, location, bullets = [] }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-b border-slate-200 pb-3 last:border-b-0">
      <div className="text-xs font-semibold" style={{ color: "var(--resume-accent, #0c4a6e)" }}>
        <p>{[startDate, endDate].filter(Boolean).join(" - ")}</p>
        {location && <p className="mt-1 break-words text-slate-500">{location}</p>}
      </div>
      <div className="min-w-0">
        <h3 className="break-words font-black text-slate-950">{title}</h3>
        {subtitle && <p className="break-words text-sm text-slate-700">{subtitle}</p>}
        <BulletList bullets={bullets} className="text-xs leading-relaxed" />
      </div>
    </div>
  );
}

const sections = {
  summary: (data) => data.summary ? (
    <BlueSection key="summary" title="Profile">
      <p className="leading-relaxed text-slate-700">{data.summary}</p>
    </BlueSection>
  ) : null,
  experience: (data) => data.experience?.length > 0 ? (
    <BlueSection key="experience" title="Work Experience">
      <div className="space-y-3">
        {data.experience.map((item) => (
          <EuroItem key={item.id} title={item.title} subtitle={item.subtitle} startDate={item.startDate} endDate={item.endDate} location={item.location} bullets={item.bullets} />
        ))}
      </div>
    </BlueSection>
  ) : null,
  education: (data) => data.education?.length > 0 ? (
    <BlueSection key="education" title="Education and Training">
      <div className="space-y-3">
        {data.education.map((edu) => (
          <EuroItem key={edu.id} title={edu.degree} subtitle={`${edu.school || ""}${edu.details ? ` — ${edu.details}` : ""}`} startDate={edu.startDate} endDate={edu.endDate} location={edu.location} />
        ))}
      </div>
    </BlueSection>
  ) : null,
  projects: (data) => data.projects?.length > 0 ? (
    <BlueSection key="projects" title="Projects">
      <div className="space-y-3">
        {data.projects.map((item) => (
          <EuroItem key={item.id} title={item.title} subtitle={item.subtitle} location={item.link} bullets={item.bullets} />
        ))}
      </div>
    </BlueSection>
  ) : null,
  skills: (data) => data.skills?.length > 0 ? (
    <BlueSection key="skills" title="Digital and Language Skills">
      <p className="leading-relaxed text-slate-700">{data.skills.filter(Boolean).join(" • ")}</p>
    </BlueSection>
  ) : null,
  certifications: (data) => data.certifications?.length > 0 ? (
    <BlueSection key="certifications" title="Certifications">
      <p className="leading-relaxed text-slate-700">{data.certifications.filter(Boolean).join(" • ")}</p>
    </BlueSection>
  ) : null,
};

export function EuropassTemplate({ data }) {
  return (
    <article className="resume-page bg-white p-9 font-sans text-sm text-slate-900 shadow-paper">
      <header className="grid grid-cols-[120px_minmax(0,1fr)] gap-5 pb-5" style={{ borderBottom: "4px solid var(--resume-accent, #0c4a6e)" }}>
        <div className="h-28 w-28 overflow-hidden rounded bg-slate-100">
          {data.personal.photo ? <img src={data.personal.photo} alt={data.personal.name || "Profile"} className="h-full w-full object-cover" /> : null}
        </div>
        <div className="min-w-0">
          <h1 className="break-words text-3xl font-black uppercase" style={{ color: "var(--resume-accent, #0c4a6e)" }}>{data.personal.name || "Your Name"}</h1>
          <p className="mt-1 break-words text-base font-semibold text-slate-700">{data.personal.headline}</p>
          <ContactLine personal={data.personal} separator="\n" className="mt-3 whitespace-pre-line break-words text-xs leading-relaxed" />
        </div>
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
