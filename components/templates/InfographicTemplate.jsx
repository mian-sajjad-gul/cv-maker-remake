import { BulletList, CertificationList } from "./templateUtils";

const DOT_COUNT = 5;

function SkillDots({ skill, level = DOT_COUNT }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <span className="text-xs text-white/90 flex-1">{skill}</span>
      <div className="flex gap-1">
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full"
            style={{
              background: i < level ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RightSection({ title, children }) {
  if (!children) return null;
  return (
    <section className="mt-6">
      <h2
        className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] border-b pb-1"
        style={{ color: "var(--resume-accent, #0f172a)", borderColor: "var(--resume-accent, #e2e8f0)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function InfographicTemplate({ data }) {
  const skills = data.skills.filter(Boolean);

  return (
    <article className="resume-page grid grid-cols-[35%_1fr] overflow-hidden bg-white font-sans text-sm text-slate-900 shadow-paper">
      {/* Left sidebar */}
      <aside
        className="flex flex-col px-6 py-8"
        style={{ background: "var(--resume-accent, #0f172a)" }}
      >
        {/* Photo */}
        <div className="mx-auto mb-4">
          {data.personal.photo ? (
            <img
              src={data.personal.photo}
              alt={data.personal.name || "Profile"}
              className="h-24 w-24 rounded-full object-cover border-4 border-white/20"
            />
          ) : (
            <div className="h-24 w-24 rounded-full border-4 border-white/20 bg-white/10 flex items-center justify-center text-white/40 text-xs">
              Photo
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className="text-xl font-black text-white text-center leading-tight">
          {data.personal.name || "Your Name"}
        </h1>
        <p className="mt-1 text-center text-xs font-semibold text-white/60">
          {data.personal.headline}
        </p>

        {/* Contact */}
        <div className="mt-5 space-y-1.5 border-t border-white/10 pt-4">
          {[
            data.personal.email,
            data.personal.phone,
            data.personal.location,
            data.personal.website,
            data.personal.linkedin,
            data.personal.github,
          ]
            .filter(Boolean)
            .map((v, i) => (
              <p key={i} className="text-[11px] text-white/60 break-all">
                {v}
              </p>
            ))}
        </div>

        {/* Skills with dots */}
        {skills.length > 0 && (
          <div className="mt-5 border-t border-white/10 pt-4">
            <h2 className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
              Skills
            </h2>
            <div className="divide-y divide-white/5">
              {skills.map((skill, i) => (
                <SkillDots
                  key={skill}
                  skill={skill}
                  level={Math.max(3, DOT_COUNT - (i % 2))}
                />
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.filter(Boolean).length > 0 && (
          <div className="mt-5 border-t border-white/10 pt-4">
            <h2 className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
              Certifications
            </h2>
            <ul className="space-y-1">
              {data.certifications.filter(Boolean).map((cert) => (
                <li key={cert} className="text-[11px] text-white/70">
                  · {cert}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Right main */}
      <main className="px-8 py-8">
        {data.summary && (
          <RightSection title="Profile">
            <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
          </RightSection>
        )}

        {data.experience.length > 0 && (
          <RightSection title="Experience">
            <div className="space-y-4">
              {data.experience.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between gap-3 items-start">
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-500">{item.subtitle}</p>
                    </div>
                    <span
                      className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold text-white"
                      style={{ background: "var(--resume-accent, #0f172a)" }}
                    >
                      {[item.startDate, item.endDate].filter(Boolean).join("–")}
                    </span>
                  </div>
                  <BulletList bullets={item.bullets} className="text-xs mt-1" />
                </div>
              ))}
            </div>
          </RightSection>
        )}

        {data.projects.length > 0 && (
          <RightSection title="Projects">
            <div className="space-y-3">
              {data.projects.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <div className="flex justify-between gap-2">
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    {item.link && (
                      <span className="text-[10px] text-slate-400 shrink-0">{item.link}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{item.subtitle}</p>
                  <BulletList bullets={item.bullets} className="text-xs mt-1" />
                </div>
              ))}
            </div>
          </RightSection>
        )}

        {data.education.length > 0 && (
          <RightSection title="Education">
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-xs text-slate-600">{edu.school}{edu.location ? `, ${edu.location}` : ""}</p>
                  <p className="text-[11px] text-slate-400">
                    {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                  </p>
                </div>
              ))}
            </div>
          </RightSection>
        )}
      </main>
    </article>
  );
}
