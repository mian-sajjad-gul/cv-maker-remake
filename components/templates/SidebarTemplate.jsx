import { BulletList, CertificationList, ContactLine, EducationBlock, ExperienceBlock, ProjectBlock, SkillsList, TemplateSection } from "./templateUtils";

function SidebarSection({ title, children }) {
  if (!children) return null;
  return (
    <section className="mt-6">
      <h2 className="text-xs font-black uppercase tracking-[0.22em] text-white/80">{title}</h2>
      <div className="mt-2 text-white/90">{children}</div>
    </section>
  );
}

export function SidebarTemplate({ data }) {
  return (
    <article className="resume-page grid grid-cols-[32%_1fr] overflow-hidden bg-white font-sans text-sm text-slate-900 shadow-paper">
      <aside className="bg-slate-900 p-8 text-white">
        <h1 className="text-3xl font-black leading-tight">{data.personal.name || "Your Name"}</h1>
        <p className="mt-2 text-sm font-semibold text-white/75">{data.personal.headline}</p>
        <ContactLine personal={data.personal} separator="\n" className="mt-6 whitespace-pre-line text-white/75" />

        {data.skills.length > 0 && <SidebarSection title="Skills"><SkillsList skills={data.skills} variant="columns" className="text-white" /></SidebarSection>}
        {data.certifications.length > 0 && <SidebarSection title="Certifications"><CertificationList certifications={data.certifications} className="text-white/85" /></SidebarSection>}
        {data.education.length > 0 && <SidebarSection title="Education"><div className="space-y-4 text-xs">{data.education.map((edu) => <div key={edu.id}><h3 className="font-bold text-white">{edu.degree}</h3><p>{edu.school}{edu.location ? `, ${edu.location}` : ""}</p><p className="text-white/60">{[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}</p>{edu.details && <p className="mt-1">{edu.details}</p>}</div>)}</div></SidebarSection>}
      </aside>

      <main className="p-9">
        {data.summary && <TemplateSection title="Profile"><p className="leading-relaxed text-slate-700">{data.summary}</p></TemplateSection>}
        {data.experience.length > 0 && <TemplateSection title="Experience"><div className="space-y-4">{data.experience.map((item) => <ExperienceBlock key={item.id} item={item} />)}</div></TemplateSection>}
        {data.projects.length > 0 && <TemplateSection title="Projects"><div className="space-y-4">{data.projects.map((item) => <ProjectBlock key={item.id} item={item} />)}</div></TemplateSection>}
      </main>
    </article>
  );
}
