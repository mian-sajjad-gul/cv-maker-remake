import { CertificationList, ContactLine, EducationBlock, ExperienceBlock, ProjectBlock, SkillsList, TemplateSection, getOrder } from "./templateUtils";

const sections = {
  summary: (data) => data.summary ? (
    <TemplateSection key="summary" title="Summary" className="mt-3">
      <p className="leading-snug text-slate-700">{data.summary}</p>
    </TemplateSection>
  ) : null,
  skills: (data) => data.skills.length > 0 ? (
    <TemplateSection key="skills" title="Skills" className="mt-3">
      <SkillsList skills={data.skills} variant="plain" className="text-xs" />
    </TemplateSection>
  ) : null,
  experience: (data) => data.experience.length > 0 ? (
    <TemplateSection key="experience" title="Experience" className="mt-3">
      <div className="space-y-3">{data.experience.map((item) => <ExperienceBlock key={item.id} item={item} compact />)}</div>
    </TemplateSection>
  ) : null,
  projects: (data) => data.projects.length > 0 ? (
    <TemplateSection key="projects" title="Projects" className="mt-3">
      <div className="space-y-3">{data.projects.map((item) => <ProjectBlock key={item.id} item={item} compact />)}</div>
    </TemplateSection>
  ) : null,
  education: (data) => data.education.length > 0 ? (
    <TemplateSection key="education" title="Education" className="mt-3">
      <div className="space-y-2">{data.education.map((edu) => <EducationBlock key={edu.id} edu={edu} />)}</div>
    </TemplateSection>
  ) : null,
  certifications: (data) => data.certifications.length > 0 ? (
    <TemplateSection key="certifications" title="Certifications" className="mt-3">
      <CertificationList certifications={data.certifications} className="text-xs" />
    </TemplateSection>
  ) : null,
};

export function CompactTemplate({ data }) {
  return (
    <article className="resume-page bg-white p-7 font-sans text-[12px] text-slate-900 shadow-paper">
      <header className="border-b-2 pb-3" style={{ borderColor: "var(--resume-accent, #0f172a)" }}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">{data.personal.name || "Your Name"}</h1>
            <p className="mt-1 font-semibold text-slate-700">{data.personal.headline}</p>
          </div>
          <ContactLine personal={data.personal} separator="\n" className="max-w-60 whitespace-pre-line text-right" />
        </div>
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
