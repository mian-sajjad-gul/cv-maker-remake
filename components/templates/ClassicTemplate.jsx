import { CertificationList, ContactLine, EducationBlock, ExperienceBlock, ProjectBlock, SkillsList, TemplateSection, getOrder } from "./templateUtils";

const sections = {
  summary: (data) => data.summary ? (
    <TemplateSection key="summary" title="Professional Summary" titleClassName="text-center">
      <p className="leading-relaxed text-slate-700">{data.summary}</p>
    </TemplateSection>
  ) : null,
  skills: (data) => data.skills.length > 0 ? (
    <TemplateSection key="skills" title="Skills" titleClassName="text-center">
      <SkillsList skills={data.skills} variant="plain" />
    </TemplateSection>
  ) : null,
  experience: (data) => data.experience.length > 0 ? (
    <TemplateSection key="experience" title="Work Experience" titleClassName="text-center">
      <div className="space-y-4">{data.experience.map((item) => <ExperienceBlock key={item.id} item={item} />)}</div>
    </TemplateSection>
  ) : null,
  projects: (data) => data.projects.length > 0 ? (
    <TemplateSection key="projects" title="Projects" titleClassName="text-center">
      <div className="space-y-4">{data.projects.map((item) => <ProjectBlock key={item.id} item={item} />)}</div>
    </TemplateSection>
  ) : null,
  education: (data) => data.education.length > 0 ? (
    <TemplateSection key="education" title="Education" titleClassName="text-center">
      <div className="space-y-3">{data.education.map((edu) => <EducationBlock key={edu.id} edu={edu} />)}</div>
    </TemplateSection>
  ) : null,
  certifications: (data) => data.certifications.length > 0 ? (
    <TemplateSection key="certifications" title="Certifications" titleClassName="text-center">
      <CertificationList certifications={data.certifications} />
    </TemplateSection>
  ) : null,
};

export function ClassicTemplate({ data }) {
  return (
    <article className="resume-page bg-white p-10 font-serif text-sm text-slate-900 shadow-paper">
      <header className="text-center">
        <h1 className="text-4xl font-bold uppercase tracking-wide">{data.personal.name || "Your Name"}</h1>
        <p className="mt-2 text-base italic text-slate-700">{data.personal.headline}</p>
        <ContactLine personal={data.personal} className="mt-3" />
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
