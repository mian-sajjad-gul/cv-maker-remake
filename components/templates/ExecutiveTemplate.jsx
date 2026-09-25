import { CertificationList, ContactLine, EducationBlock, ExperienceBlock, ProjectBlock, SkillsList, TemplateSection, getOrder } from "./templateUtils";

const sections = {
  summary: (data) => data.summary ? (
    <section key="summary" className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Leadership Profile</h2>
      <p className="mt-2 leading-relaxed text-slate-700">{data.summary}</p>
    </section>
  ) : null,
  skills: (data) => data.skills.length > 0 ? (
    <TemplateSection key="skills" title="Core Strengths"><SkillsList skills={data.skills} variant="columns" /></TemplateSection>
  ) : null,
  experience: (data) => data.experience.length > 0 ? (
    <TemplateSection key="experience" title="Executive Experience">
      <div className="space-y-5">{data.experience.map((item) => <ExperienceBlock key={item.id} item={item} />)}</div>
    </TemplateSection>
  ) : null,
  projects: (data) => data.projects.length > 0 ? (
    <TemplateSection key="projects" title="Strategic Projects">
      <div className="space-y-4">{data.projects.map((item) => <ProjectBlock key={item.id} item={item} />)}</div>
    </TemplateSection>
  ) : null,
  education: (data) => data.education.length > 0 ? (
    <TemplateSection key="education" title="Education">
      <div className="space-y-3">{data.education.map((edu) => <EducationBlock key={edu.id} edu={edu} />)}</div>
    </TemplateSection>
  ) : null,
  certifications: (data) => data.certifications.length > 0 ? (
    <TemplateSection key="certifications" title="Credentials">
      <CertificationList certifications={data.certifications} />
    </TemplateSection>
  ) : null,
};

export function ExecutiveTemplate({ data }) {
  return (
    <article className="resume-page bg-white p-10 font-sans text-sm text-slate-900 shadow-paper">
      <header className="rounded-2xl p-7 text-white" style={{ background: "var(--resume-accent, #0f172a)" }}>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Executive Resume</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">{data.personal.name || "Your Name"}</h1>
        <p className="mt-1 text-lg font-semibold text-white/80">{data.personal.headline}</p>
        <ContactLine personal={data.personal} className="mt-4 text-white/70" />
      </header>
      {getOrder(data).map((key) => sections[key]?.(data) ?? null)}
    </article>
  );
}
