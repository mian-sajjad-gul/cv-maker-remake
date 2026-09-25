import { BulletList, ContactLine, getOrder } from "./templateUtils";

function RowSection({ label, children }) {
  return (
    <section className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 border-b border-slate-200 py-3 last:border-b-0">
      <h2 className="pt-0.5 text-[11px] font-bold lowercase text-slate-700">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function DatedItem({ startDate, endDate, title, subtitle, location, bullets = [] }) {
  return (
    <div className="grid grid-cols-[74px_minmax(0,1fr)] gap-3">
      <div className="text-[10.5px] font-semibold leading-snug text-slate-600">
        {[startDate, endDate].filter(Boolean).join(" - ")}
      </div>
      <div className="min-w-0">
        <div className="flex justify-between gap-4">
          <div className="min-w-0">
            <h3 className="break-words text-[12.5px] font-black uppercase leading-tight text-slate-950">{title}</h3>
            {subtitle && <p className="break-words text-[11.5px] font-semibold leading-tight text-slate-700">{subtitle}</p>}
          </div>
          {location && (
            <p className="max-w-[150px] shrink-0 break-words text-right text-[10.5px] font-bold uppercase leading-tight text-slate-700">{location}</p>
          )}
        </div>
        <BulletList bullets={bullets} className="mt-1 text-[11px] leading-snug" />
      </div>
    </div>
  );
}

const sections = {
  summary: (data) => data.summary ? (
    <RowSection key="summary" label="summary">
      <p className="text-[11px] leading-snug text-slate-700">{data.summary}</p>
    </RowSection>
  ) : null,
  education: (data) => data.education?.length > 0 ? (
    <RowSection key="education" label="education">
      <div className="space-y-3">
        {data.education.map((edu) => (
          <DatedItem key={edu.id} startDate={edu.startDate} endDate={edu.endDate} title={edu.school} subtitle={`${edu.degree || ""}${edu.details ? `. ${edu.details}` : ""}`} location={edu.location} />
        ))}
      </div>
    </RowSection>
  ) : null,
  experience: (data) => data.experience?.length > 0 ? (
    <RowSection key="experience" label="experience">
      <div className="space-y-4">
        {data.experience.map((item) => (
          <DatedItem key={item.id} startDate={item.startDate} endDate={item.endDate} title={item.subtitle || item.title} subtitle={item.subtitle ? item.title : ""} location={item.location} bullets={item.bullets} />
        ))}
      </div>
    </RowSection>
  ) : null,
  projects: (data) => data.projects?.length > 0 ? (
    <RowSection key="projects" label="projects">
      <div className="space-y-3">
        {data.projects.map((item) => (
          <DatedItem key={item.id} title={item.title} subtitle={item.subtitle} location={item.link} bullets={item.bullets} />
        ))}
      </div>
    </RowSection>
  ) : null,
  skills: (data) => data.skills?.length > 0 ? (
    <RowSection key="skills" label="skills">
      <p className="break-words text-[11px] leading-snug">{data.skills.filter(Boolean).join(" • ")}</p>
    </RowSection>
  ) : null,
  certifications: (data) => data.certifications?.length > 0 ? (
    <RowSection key="certifications" label="certifications">
      <p className="break-words text-[11px] leading-snug">{data.certifications.filter(Boolean).join(" • ")}</p>
    </RowSection>
  ) : null,
};

export function MBATemplate({ data }) {
  return (
    <article className="resume-page bg-white px-9 py-8 font-serif text-[12px] leading-tight text-slate-950 shadow-paper">
      <header className="mb-4 text-center">
        <h1 className="text-[15px] font-black uppercase tracking-wide">{data.personal.name || "Your Name"}</h1>
        {data.personal.headline && (
          <p className="mt-0.5 text-[11px] font-semibold text-slate-700">{data.personal.headline}</p>
        )}
        <ContactLine personal={data.personal} separator=" | " className="mt-1 break-words text-[10.5px] text-slate-700" />
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
