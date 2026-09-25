import { BulletList, ContactLine, getOrder } from "./templateUtils";

function Section({ title, children }) {
  return (
    <section className="mt-4">
      <h2 className="text-sm font-bold uppercase text-slate-950">{title}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}

function ATSItem({ title, subtitle, startDate, endDate, bullets = [] }) {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words font-bold">{title}</h3>
          {subtitle && <p className="break-words text-slate-700">{subtitle}</p>}
        </div>
        <p className="shrink-0 text-right text-xs text-slate-600">{[startDate, endDate].filter(Boolean).join(" - ")}</p>
      </div>
      <BulletList bullets={bullets} className="text-sm leading-relaxed" />
    </div>
  );
}

const sections = {
  summary: (data) => data.summary ? (
    <Section key="summary" title="Summary"><p>{data.summary}</p></Section>
  ) : null,
  skills: (data) => data.skills?.length > 0 ? (
    <Section key="skills" title="Skills"><p>{data.skills.filter(Boolean).join(", ")}</p></Section>
  ) : null,
  experience: (data) => data.experience?.length > 0 ? (
    <Section key="experience" title="Experience">
      {data.experience.map((item) => <ATSItem key={item.id} title={item.title} subtitle={item.subtitle} startDate={item.startDate} endDate={item.endDate} bullets={item.bullets} />)}
    </Section>
  ) : null,
  projects: (data) => data.projects?.length > 0 ? (
    <Section key="projects" title="Projects">
      {data.projects.map((item) => <ATSItem key={item.id} title={item.title} subtitle={item.subtitle} bullets={item.bullets} />)}
    </Section>
  ) : null,
  education: (data) => data.education?.length > 0 ? (
    <Section key="education" title="Education">
      {data.education.map((edu) => <ATSItem key={edu.id} title={edu.degree} subtitle={`${edu.school || ""}${edu.location ? `, ${edu.location}` : ""}`} startDate={edu.startDate} endDate={edu.endDate} bullets={edu.details ? [edu.details] : []} />)}
    </Section>
  ) : null,
  certifications: (data) => data.certifications?.length > 0 ? (
    <Section key="certifications" title="Certifications"><p>{data.certifications.filter(Boolean).join(", ")}</p></Section>
  ) : null,
};

export function MinimalATSTemplate({ data }) {
  return (
    <article className="resume-page bg-white p-10 font-sans text-sm leading-normal text-slate-950 shadow-paper">
      <header>
        <h1 className="text-3xl font-bold">{data.personal.name || "Your Name"}</h1>
        <p className="mt-1 font-semibold">{data.personal.headline}</p>
        <ContactLine personal={data.personal} separator=" | " className="mt-2 break-words text-xs text-slate-700" />
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
