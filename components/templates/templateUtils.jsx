export const DEFAULT_SECTION_ORDER = [
  "summary",
  "skills",
  "experience",
  "projects",
  "education",
  "certifications",
];

export function getOrder(data) {
  return data.sectionOrder || DEFAULT_SECTION_ORDER;
}

export function ContactLine({ personal = {}, separator = " | ", className = "" }) {
  return (
    <p className={`text-xs text-slate-600 ${className}`}>
      {[
        personal.email,
        personal.phone,
        personal.location,
        personal.website,
        personal.linkedin,
        personal.github,
      ]
        .filter(Boolean)
        .join(separator)}
    </p>
  );
}

export function BulletList({ bullets = [], className = "" }) {
  const visible = bullets.filter(Boolean);
  if (!visible.length) return null;

  return (
    <ul className={`mt-2 list-disc space-y-1 pl-5 text-slate-700 ${className}`}>
      {visible.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

export function SkillsList({ skills = [], variant = "pills", className = "" }) {
  const visible = skills.filter(Boolean);
  if (!visible.length) return null;

  if (variant === "plain") {
    return (
      <p className={`text-sm leading-relaxed text-slate-700 ${className}`}>
        {visible.join(" • ")}
      </p>
    );
  }

  if (variant === "columns") {
    return (
      <div
        className={`grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-semibold text-slate-700 ${className}`}
      >
        {visible.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visible.map((skill) => (
        <span
          key={skill}
          className="rounded-full px-2 py-1 text-xs font-semibold text-white"
          style={{ background: "var(--resume-accent, #0f172a)" }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

export function TemplateSection({ title, children, className = "", titleClassName = "" }) {
  if (!children) return null;

  return (
    <section className={`mt-5 ${className}`}>
      <h2
        className={`border-b pb-1 text-xs font-bold uppercase tracking-[0.2em] ${titleClassName}`}
        style={{
          borderColor: "var(--resume-accent, #cbd5e1)",
          color: "var(--resume-accent, #475569)",
        }}
      >
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export function ExperienceBlock({ item, compact = false }) {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="font-bold">{item.title}</h3>
          <p className="text-slate-700">{item.subtitle}</p>
        </div>
        <p className="shrink-0 text-xs text-slate-500">
          {[item.startDate, item.endDate].filter(Boolean).join(" - ")}
        </p>
      </div>
      <BulletList bullets={item.bullets} className={compact ? "text-xs" : ""} />
    </div>
  );
}

export function ProjectBlock({ item, compact = false }) {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="font-bold">{item.title}</h3>
          <p className="text-slate-700">{item.subtitle}</p>
        </div>
        {item.link && (
          <p className="shrink-0 text-xs text-slate-500">{item.link}</p>
        )}
      </div>
      <BulletList bullets={item.bullets} className={compact ? "text-xs" : ""} />
    </div>
  );
}

export function EducationBlock({ edu }) {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="font-bold">{edu.degree}</h3>
          <p className="text-slate-700">
            {edu.school}
            {edu.location ? `, ${edu.location}` : ""}
          </p>
        </div>
        <p className="shrink-0 text-xs text-slate-500">
          {[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}
        </p>
      </div>
      {edu.details && <p className="mt-1 text-slate-700">{edu.details}</p>}
    </div>
  );
}

export function CertificationList({ certifications = [], className = "" }) {
  const visible = certifications.filter(Boolean);
  if (!visible.length) return null;

  return (
    <ul className={`list-disc space-y-1 pl-5 text-slate-700 ${className}`}>
      {visible.map((cert) => (
        <li key={cert}>{cert}</li>
      ))}
    </ul>
  );
}
