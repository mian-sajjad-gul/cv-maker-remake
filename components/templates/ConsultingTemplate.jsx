import { BulletList, ContactLine, getOrder } from "./templateUtils";

function Section({ title, children }) {
  return (
    <section className="mt-4">
      <h2 className="border-y border-slate-900 py-1 text-[12px] font-black uppercase tracking-[0.18em] text-slate-950">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function CaseEntry({ item }) {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words text-[13px] font-black uppercase text-slate-950">{item.subtitle || item.title}</h3>
          {item.subtitle && <p className="break-words text-[12px] font-semibold text-slate-700">{item.title}</p>}
        </div>
        <p className="shrink-0 text-right text-[11px] font-semibold text-slate-600">{[item.startDate, item.endDate].filter(Boolean).join(" - ")}</p>
      </div>
      <BulletList bullets={item.bullets} className="text-[11.5px] leading-snug" />
    </div>
  );
}

const sections = {
  summary: (data) => data.summary ? (
    <Section key="summary" title="Profile">
      <p className="text-[11.5px] leading-snug">{data.summary}</p>
    </Section>
  ) : null,
  education: (data) => data.education?.length > 0 ? (
    <Section key="education" title="Education">
      {data.education.map((edu) => (
        <CaseEntry key={edu.id} item={{ title: edu.degree, subtitle: edu.school, startDate: edu.startDate, endDate: edu.endDate, bullets: edu.details ? [edu.details] : [] }} />
      ))}
    </Section>
  ) : null,
  experience: (data) => data.experience?.length > 0 ? (
    <Section key="experience" title="Professional Experience">
      {data.experience.map((item) => <CaseEntry key={item.id} item={item} />)}
    </Section>
  ) : null,
  projects: (data) => data.projects?.length > 0 ? (
    <Section key="projects" title="Selected Projects">
      {data.projects.map((item) => <CaseEntry key={item.id} item={item} />)}
    </Section>
  ) : null,
  skills: (data) => data.skills?.length > 0 ? (
    <Section key="skills" title="Skills and Interests">
      <p className="text-[11.5px] leading-snug">{data.skills.filter(Boolean).join(" • ")}</p>
    </Section>
  ) : null,
  certifications: (data) => data.certifications?.length > 0 ? (
    <Section key="certifications" title="Certifications">
      <p className="text-[11.5px] leading-snug">{data.certifications.filter(Boolean).join(" • ")}</p>
    </Section>
  ) : null,
};

export function ConsultingTemplate({ data }) {
  return (
    <article className="resume-page bg-white px-9 py-8 font-serif text-[12px] leading-tight text-slate-950 shadow-paper">
      <header className="text-center">
        <h1 className="text-[19px] font-black uppercase tracking-[0.18em]">{data.personal.name || "Your Name"}</h1>
        <p className="mt-1 text-[12px] font-semibold text-slate-700">{data.personal.headline}</p>
        <ContactLine personal={data.personal} separator=" | " className="mt-1 break-words text-[10.5px] text-slate-700" />
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
