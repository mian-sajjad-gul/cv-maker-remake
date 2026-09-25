import { BulletList, ContactLine, getOrder } from "./templateUtils";

function Section({ title, children }) {
  return (
    <section className="mt-4">
      <h2 className="border-b border-slate-900 pb-0.5 text-[12px] font-black uppercase tracking-wide text-slate-950">
        {title}
      </h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}

function Entry({ title, subtitle, startDate, endDate, location, bullets = [] }) {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words text-[13px] font-black text-slate-950">{title}</h3>
          {subtitle && <p className="break-words text-[12px] italic text-slate-700">{subtitle}</p>}
        </div>
        <div className="shrink-0 text-right text-[11px] font-semibold leading-tight text-slate-700">
          {location && <p>{location}</p>}
          <p>{[startDate, endDate].filter(Boolean).join(" - ")}</p>
        </div>
      </div>
      <BulletList bullets={bullets} className="text-[11.5px] leading-snug" />
    </div>
  );
}

const sections = {
  summary: (data) => data.summary ? (
    <Section key="summary" title="Summary">
      <p className="text-[11.5px] leading-snug text-slate-800">{data.summary}</p>
    </Section>
  ) : null,
  skills: (data) => data.skills?.length > 0 ? (
    <Section key="skills" title="Skills">
      <p className="text-[11.5px] leading-snug">{data.skills.filter(Boolean).join(" • ")}</p>
    </Section>
  ) : null,
  experience: (data) => data.experience?.length > 0 ? (
    <Section key="experience" title="Experience">
      {data.experience.map((item) => (
        <Entry key={item.id} title={item.subtitle || item.title} subtitle={item.subtitle ? item.title : ""} startDate={item.startDate} endDate={item.endDate} location={item.location} bullets={item.bullets} />
      ))}
    </Section>
  ) : null,
  projects: (data) => data.projects?.length > 0 ? (
    <Section key="projects" title="Projects">
      {data.projects.map((item) => (
        <Entry key={item.id} title={item.title} subtitle={item.subtitle} location={item.link} bullets={item.bullets} />
      ))}
    </Section>
  ) : null,
  education: (data) => data.education?.length > 0 ? (
    <Section key="education" title="Education">
      {data.education.map((edu) => (
        <Entry key={edu.id} title={edu.school} subtitle={`${edu.degree || ""}${edu.details ? ` — ${edu.details}` : ""}`} startDate={edu.startDate} endDate={edu.endDate} location={edu.location} />
      ))}
    </Section>
  ) : null,
  certifications: (data) => data.certifications?.length > 0 ? (
    <Section key="certifications" title="Certifications">
      <p className="text-[11.5px] leading-snug">{data.certifications.filter(Boolean).join(" • ")}</p>
    </Section>
  ) : null,
};

export function HarvardTemplate({ data }) {
  return (
    <article className="resume-page bg-white px-10 py-8 font-serif text-[12px] leading-tight text-slate-950 shadow-paper">
      <header className="text-center">
        <h1 className="text-[18px] font-black uppercase tracking-wide">{data.personal.name || "Your Name"}</h1>
        <ContactLine personal={data.personal} separator=" | " className="mt-1 break-words text-[11px] text-slate-700" />
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
