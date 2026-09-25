import { CertificationList, ContactLine, EducationBlock, ProjectBlock, SkillsList, TemplateSection, getOrder } from "./templateUtils";

function TimelineItem({ item }) {
  return (
    <div className="relative border-l-2 border-slate-300 pl-5">
      <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full" style={{ background: "var(--resume-accent, #0f172a)" }} />
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="font-bold">{item.title}</h3>
          <p className="text-slate-700">{item.subtitle}</p>
        </div>
        <p className="shrink-0 text-xs text-slate-500">
          {[item.startDate, item.endDate].filter(Boolean).join(" - ")}
        </p>
      </div>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
        {item.bullets.filter(Boolean).map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}

const sections = {
  summary: (data) => data.summary ? (
    <TemplateSection key="summary" title="Snapshot">
      <p className="leading-relaxed text-slate-700">{data.summary}</p>
    </TemplateSection>
  ) : null,
  skills: (data) => data.skills.length > 0 ? (
    <TemplateSection key="skills" title="Skills">
      <SkillsList skills={data.skills} variant="plain" />
    </TemplateSection>
  ) : null,
  experience: (data) => data.experience.length > 0 ? (
    <TemplateSection key="experience" title="Career Timeline">
      <div className="space-y-5">
        {data.experience.map((item) => <TimelineItem key={item.id} item={item} />)}
      </div>
    </TemplateSection>
  ) : null,
  projects: (data) => data.projects.length > 0 ? (
    <TemplateSection key="projects" title="Projects">
      <div className="grid grid-cols-2 gap-4">
        {data.projects.map((item) => (
          <div key={item.id} className="rounded-xl bg-slate-50 p-4">
            <ProjectBlock item={item} />
          </div>
        ))}
      </div>
    </TemplateSection>
  ) : null,
  education: (data) => data.education.length > 0 ? (
    <TemplateSection key="education" title="Education">
      <div className="space-y-3">
        {data.education.map((edu) => <EducationBlock key={edu.id} edu={edu} />)}
      </div>
    </TemplateSection>
  ) : null,
  certifications: (data) => data.certifications.length > 0 ? (
    <TemplateSection key="certifications" title="Certifications">
      <CertificationList certifications={data.certifications} />
    </TemplateSection>
  ) : null,
};

export function TimelineTemplate({ data }) {
  return (
    <article className="resume-page bg-white p-10 font-sans text-sm text-slate-900 shadow-paper">
      <header className="grid grid-cols-[96px_1fr_240px] items-center gap-6 border-b border-slate-300 pb-6">
        <div>
          {data.personal.photo ? (
            <img src={data.personal.photo} alt={data.personal.name || "Profile"} className="h-24 w-24 rounded-full object-cover" />
          ) : (
            <div className="h-24 w-24 rounded-full bg-slate-100" />
          )}
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight">{data.personal.name || "Your Name"}</h1>
          <p className="mt-1 text-base font-semibold text-slate-700">{data.personal.headline}</p>
        </div>
        <ContactLine personal={data.personal} separator="\n" className="min-w-0 max-w-full whitespace-pre-line break-words text-right text-[11px] leading-relaxed" />
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
