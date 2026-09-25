import { CertificationList, ContactLine, EducationBlock, ExperienceBlock, ProjectBlock, SkillsList, TemplateSection, getOrder } from "./templateUtils";

const sections = {
  summary: (data) => data.summary ? (
    <TemplateSection key="summary" title="About">
      <p className="leading-relaxed text-slate-700">{data.summary}</p>
    </TemplateSection>
  ) : null,
  skills: (data) => data.skills.length > 0 ? (
    <TemplateSection key="skills" title="Tech Stack"><SkillsList skills={data.skills} /></TemplateSection>
  ) : null,
  experience: (data) => data.experience.length > 0 ? (
    <TemplateSection key="experience" title="Engineering Experience">
      <div className="space-y-4">{data.experience.map((item) => <ExperienceBlock key={item.id} item={item} />)}</div>
    </TemplateSection>
  ) : null,
  projects: (data) => data.projects.length > 0 ? (
    <TemplateSection key="projects" title="Featured Projects">
      <div className="grid gap-4">
        {data.projects.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 p-4">
            <ProjectBlock item={item} />
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

export function DeveloperTemplate({ data }) {
  return (
    <article className="resume-page bg-white p-10 font-mono text-[13px] text-slate-900 shadow-paper">
      <header className="rounded-xl border border-slate-800 p-5">
        <p className="text-xs text-slate-500">const candidate = &#123;</p>
        <div className="mt-3 flex items-start gap-5">
          {data.personal.photo && (
            <img src={data.personal.photo} alt={data.personal.name || "Profile"} className="h-24 w-24 shrink-0 rounded-full object-cover" />
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-4xl font-black tracking-tight break-words">{data.personal.name || "Your Name"}</h1>
            <p className="mt-1 break-words text-base font-bold text-slate-700">role: {data.personal.headline}</p>
            <ContactLine personal={data.personal} className="mt-3 break-words text-[11px] leading-relaxed" />
          </div>
        </div>
        <p className="mt-1 text-xs text-slate-500">&#125;;</p>
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
