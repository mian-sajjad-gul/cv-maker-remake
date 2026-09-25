import {
  CertificationList,
  ContactLine,
  EducationBlock,
  ExperienceBlock,
  ProjectBlock,
  SkillsList,
} from "./templateUtils";

function CreativeSection({ title, children, dark = false }) {
  if (!children) return null;
  return (
    <section className="mt-6">
      <h2
        className={`text-xs font-black uppercase tracking-[0.24em] ${dark ? "text-white/70" : "text-slate-500"}`}
      >
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function CreativeTemplate({ data }) {
  return (
    <article className="resume-page grid grid-cols-[38%_1fr] overflow-hidden bg-white font-sans text-sm text-slate-900 shadow-paper">
      <aside className="bg-gradient-to-b from-slate-900 to-slate-700 p-8 text-white">
        <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white/30 bg-white/10">
          {data.personal.photo ? (
            <img
              src={data.personal.photo}
              alt={data.personal.name || "Profile"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white/70">
              Photo
            </div>
          )}
        </div>
        <h1 className="mt-6 text-4xl font-black leading-none">
          {data.personal.name || "Your Name"}
        </h1>
        <p className="mt-3 text-base font-semibold text-white/75">
          {data.personal.headline}
        </p>
        <ContactLine
          personal={data.personal}
          separator="\n"
          className="mt-6 whitespace-pre-line text-white/70"
        />

        {data.summary && (
          <CreativeSection title="Profile" dark>
            <p className="leading-relaxed text-white/85">{data.summary}</p>
          </CreativeSection>
        )}
        {data.skills.length > 0 && (
          <CreativeSection title="Skills" dark>
            <SkillsList
              skills={data.skills}
              variant="columns"
              className="text-white"
            />
          </CreativeSection>
        )}
        {data.certifications.length > 0 && (
          <CreativeSection title="Certificates" dark>
            <CertificationList
              certifications={data.certifications}
              className="text-white/85"
            />
          </CreativeSection>
        )}
      </aside>

      <main className="p-9">
        {data.experience.length > 0 && (
          <CreativeSection title="Experience">
            <div className="space-y-4">
              {data.experience.map((item) => (
                <ExperienceBlock key={item.id} item={item} />
              ))}
            </div>
          </CreativeSection>
        )}
        {data.projects.length > 0 && (
          <CreativeSection title="Selected Work">
            <div className="space-y-4">
              {data.projects.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <ProjectBlock item={item} />
                </div>
              ))}
            </div>
          </CreativeSection>
        )}
        {data.education.length > 0 && (
          <CreativeSection title="Education">
            <div className="space-y-3">
              {data.education.map((edu) => (
                <EducationBlock key={edu.id} edu={edu} />
              ))}
            </div>
          </CreativeSection>
        )}
      </main>
    </article>
  );
}
