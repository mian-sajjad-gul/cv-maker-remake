"use client";

import { useState } from "react";
import { Field } from "./Field";
import { ColorPicker } from "./ColorPicker";
import { TemplatePicker } from "./TemplatePicker";
import { uid } from "@/lib/utils";
import { professionSamples } from "@/lib/sampleResume";
import { DEFAULT_SECTION_ORDER } from "@/components/templates/templateUtils";

const SECTION_LABELS = {
  summary: "Summary",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications",
};

const PROFESSION_OPTIONS = [
  { value: "", label: "Choose a sample to load..." },
  { value: "engineer", label: "Software Engineer" },
  { value: "designer", label: "Product Designer" },
  { value: "marketing", label: "Marketing Manager" },
  { value: "finance", label: "Financial Analyst" },
];

function Button({ children, onClick, danger = false, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
        danger
          ? "bg-red-50 text-red-700 hover:bg-red-100"
          : "bg-slate-900 text-white hover:bg-slate-700"
      } ${className}`}
    >
      {children}
    </button>
  );
}

function MoveButtons({ idx, total, onUp, onDown }) {
  if (total < 2) return null;
  return (
    <div className="flex gap-1">
      <button
        type="button"
        title="Move up"
        disabled={idx === 0}
        onClick={onUp}
        className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-25"
      >
        ↑
      </button>
      <button
        type="button"
        title="Move down"
        disabled={idx === total - 1}
        onClick={onDown}
        className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-25"
      >
        ↓
      </button>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-black tracking-tight text-slate-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ResumeEditor({ data, setData }) {
  const [skillsText, setSkillsText] = useState(() => data.skills.join(", "));
  const [certificationsText, setCertificationsText] = useState(() =>
    data.certifications.join(", "),
  );
  const [templatePickerOpen, setTemplatePickerOpen] = useState(false);

  const setPersonal = (key, value) => {
    setData((d) => ({ ...d, personal: { ...d.personal, [key]: value } }));
  };

  const setList = (key, value) => {
    setData((d) => ({
      ...d,
      [key]: value.split(",").map((x) => x.trim()).filter(Boolean),
    }));
  };

  const updateItem = (section, id, patch) => {
    setData((d) => ({
      ...d,
      [section]: d[section].map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }));
  };

  const removeItem = (section, id) => {
    setData((d) => ({
      ...d,
      [section]: d[section].filter((item) => item.id !== id),
    }));
  };

  const addItem = (section) => {
    setData((d) => ({
      ...d,
      [section]: [
        ...d[section],
        {
          id: uid(),
          title: "New Role / Project",
          subtitle: "Company or tech stack",
          startDate: "",
          endDate: "",
          bullets: ["Describe your impact with a measurable result."],
        },
      ],
    }));
  };

  const updateEducation = (id, patch) => {
    setData((d) => ({
      ...d,
      education: d.education.map((edu) =>
        edu.id === id ? { ...edu, ...patch } : edu,
      ),
    }));
  };

  const moveItem = (section, id, direction) => {
    setData((d) => {
      const items = [...d[section]];
      const idx = items.findIndex((item) => item.id === id);
      if (direction === "up" && idx > 0) {
        [items[idx - 1], items[idx]] = [items[idx], items[idx - 1]];
      } else if (direction === "down" && idx < items.length - 1) {
        [items[idx], items[idx + 1]] = [items[idx + 1], items[idx]];
      }
      return { ...d, [section]: items };
    });
  };

  const moveSectionOrder = (key, direction) => {
    setData((d) => {
      const order = [...(d.sectionOrder || DEFAULT_SECTION_ORDER)];
      const idx = order.indexOf(key);
      if (direction === "up" && idx > 0) {
        [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]];
      } else if (direction === "down" && idx < order.length - 1) {
        [order[idx], order[idx + 1]] = [order[idx + 1], order[idx]];
      }
      return { ...d, sectionOrder: order };
    });
  };

  const setPhoto = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPersonal("photo", reader.result);
    reader.readAsDataURL(file);
  };

  function loadProfessionSample(profession) {
    if (!profession) return;
    const sample = professionSamples[profession];
    if (!sample) return;
    setData(sample);
    setSkillsText(sample.skills.join(", "));
    setCertificationsText(sample.certifications.join(", "));
  }

  return (
    <>
      {templatePickerOpen && (
        <TemplatePicker
          current={data.template}
          onSelect={(key) => setData((d) => ({ ...d, template: key }))}
          onClose={() => setTemplatePickerOpen(false)}
        />
      )}

      <div className="space-y-4">
        {/* Sample data loader */}
        <Panel title="Quick Start">
          <p className="mb-3 text-xs text-slate-500">
            Load a pre-filled resume for your field, then customize it.
          </p>
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm"
            defaultValue=""
            onChange={(e) => loadProfessionSample(e.target.value)}
          >
            {PROFESSION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Panel>

        {/* Template */}
        <Panel title="Template & Style">
          <div className="space-y-4">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Layout
              </span>
              <button
                type="button"
                onClick={() => setTemplatePickerOpen(true)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:border-slate-300 hover:bg-white"
              >
                <span>
                  {{
                    modern: "Modern", classic: "Classic", compact: "Compact",
                    sidebar: "Sidebar", executive: "Executive", developer: "Developer",
                    timeline: "Timeline", creative: "Creative", mba: "MBA",
                    europass: "Europass", harvard: "Harvard", consulting: "Consulting",
                    productManager: "Product Manager", minimalAts: "Minimal ATS",
                    nordic: "Nordic", twoColumn: "Two Column", bold: "Bold",
                    infographic: "Infographic", sharp: "Sharp",
                  }[data.template] || "Modern"}
                </span>
                <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
              <p className="mt-1.5 text-xs text-slate-400">Click to browse all 19 templates with live previews</p>
            </div>
            <ColorPicker
              value={data.accentColor}
              onChange={(color) => setData((d) => ({ ...d, accentColor: color }))}
            />
          </div>
        </Panel>

        {/* Section Order */}
        <Panel title="Section Order">
          <p className="mb-3 text-xs text-slate-500">
            Move sections up or down to change the order they appear on your resume.
          </p>
          <div className="space-y-1">
            {(data.sectionOrder || DEFAULT_SECTION_ORDER).map((key, idx, arr) => (
              <div key={key} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                <span className="text-sm font-semibold text-slate-700">{SECTION_LABELS[key] || key}</span>
                <MoveButtons
                  idx={idx}
                  total={arr.length}
                  onUp={() => moveSectionOrder(key, "up")}
                  onDown={() => moveSectionOrder(key, "down")}
                />
              </div>
            ))}
          </div>
        </Panel>

        {/* Personal Info */}
        <Panel title="Personal Info">
          <div className="space-y-3">
            <div className="md:col-span-2">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Profile Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm"
                  onChange={(e) => setPhoto(e.target.files?.[0])}
                />
              </label>
              {data.personal.photo && (
                <button
                  type="button"
                  onClick={() => setPersonal("photo", "")}
                  className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100"
                >
                  Remove Image
                </button>
              )}
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Name" value={data.personal.name} onChange={(v) => setPersonal("name", v)} />
              <Field label="Headline" value={data.personal.headline} onChange={(v) => setPersonal("headline", v)} />
              <Field label="Email" value={data.personal.email} onChange={(v) => setPersonal("email", v)} />
              <Field label="Phone" value={data.personal.phone} onChange={(v) => setPersonal("phone", v)} />
              <Field label="Location" value={data.personal.location} onChange={(v) => setPersonal("location", v)} />
              <Field label="Website" value={data.personal.website} onChange={(v) => setPersonal("website", v)} />
              <Field label="LinkedIn" placeholder="linkedin.com/in/yourname" value={data.personal.linkedin} onChange={(v) => setPersonal("linkedin", v)} />
              <Field label="GitHub" value={data.personal.github} onChange={(v) => setPersonal("github", v)} />
            </div>
          </div>
        </Panel>

        {/* Summary */}
        <Panel title="Summary">
          <Field
            label="Professional Summary"
            textarea
            placeholder="Tip: paste your LinkedIn 'About' section here as a starting point, then trim it to 2–3 lines focused on your top strengths and goals."
            value={data.summary}
            onChange={(v) => setData((d) => ({ ...d, summary: v }))}
          />
        </Panel>

        {/* Skills */}
        <Panel title="Skills & Certifications">
          <div className="space-y-3">
            <Field
              label="Skills, comma separated"
              value={skillsText}
              onChange={(v) => {
                setSkillsText(v);
                setList("skills", v);
              }}
            />
            <Field
              label="Certifications, comma separated"
              value={certificationsText}
              onChange={(v) => {
                setCertificationsText(v);
                setList("certifications", v);
              }}
            />
          </div>
        </Panel>

        {/* Experience */}
        <Panel title="Experience">
          <div className="space-y-4">
            {data.experience.map((item, idx) => (
              <div key={item.id} className="rounded-xl border border-slate-200 p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500">{item.title || "Experience"}</span>
                  <MoveButtons idx={idx} total={data.experience.length} onUp={() => moveItem("experience", item.id, "up")} onDown={() => moveItem("experience", item.id, "down")} />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Role" value={item.title} onChange={(v) => updateItem("experience", item.id, { title: v })} />
                  <Field label="Company" value={item.subtitle || ""} onChange={(v) => updateItem("experience", item.id, { subtitle: v })} />
                  <Field label="Start" value={item.startDate || ""} onChange={(v) => updateItem("experience", item.id, { startDate: v })} />
                  <Field label="End" value={item.endDate || ""} onChange={(v) => updateItem("experience", item.id, { endDate: v })} />
                  <Field label="Location" value={item.location || ""} onChange={(v) => updateItem("experience", item.id, { location: v })} />
                </div>
                <Field
                  label="Bullets, one per line"
                  textarea
                  value={item.bullets.join("\n")}
                  onChange={(v) => updateItem("experience", item.id, { bullets: v.split("\n") })}
                />
                <div className="mt-3">
                  <Button danger onClick={() => removeItem("experience", item.id)}>Remove</Button>
                </div>
              </div>
            ))}
            <Button onClick={() => addItem("experience")}>Add Experience</Button>
          </div>
        </Panel>

        {/* Projects */}
        <Panel title="Projects">
          <div className="space-y-4">
            {data.projects.map((item, idx) => (
              <div key={item.id} className="rounded-xl border border-slate-200 p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500">{item.title || "Project"}</span>
                  <MoveButtons idx={idx} total={data.projects.length} onUp={() => moveItem("projects", item.id, "up")} onDown={() => moveItem("projects", item.id, "down")} />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Project" value={item.title} onChange={(v) => updateItem("projects", item.id, { title: v })} />
                  <Field label="Tech stack" value={item.subtitle || ""} onChange={(v) => updateItem("projects", item.id, { subtitle: v })} />
                  <Field label="Link" value={item.link || ""} onChange={(v) => updateItem("projects", item.id, { link: v })} />
                </div>
                <Field
                  label="Bullets, one per line"
                  textarea
                  value={item.bullets.join("\n")}
                  onChange={(v) => updateItem("projects", item.id, { bullets: v.split("\n") })}
                />
                <div className="mt-3">
                  <Button danger onClick={() => removeItem("projects", item.id)}>Remove</Button>
                </div>
              </div>
            ))}
            <Button onClick={() => addItem("projects")}>Add Project</Button>
          </div>
        </Panel>

        {/* Education */}
        <Panel title="Education">
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={edu.id} className="rounded-xl border border-slate-200 p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500">{edu.school || "Education"}</span>
                  <MoveButtons idx={idx} total={data.education.length} onUp={() => moveItem("education", edu.id, "up")} onDown={() => moveItem("education", edu.id, "down")} />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Degree" value={edu.degree} onChange={(v) => updateEducation(edu.id, { degree: v })} />
                  <Field label="School" value={edu.school} onChange={(v) => updateEducation(edu.id, { school: v })} />
                  <Field label="Start" value={edu.startDate || ""} onChange={(v) => updateEducation(edu.id, { startDate: v })} />
                  <Field label="End" value={edu.endDate || ""} onChange={(v) => updateEducation(edu.id, { endDate: v })} />
                </div>
                <Field label="Details" value={edu.details || ""} onChange={(v) => updateEducation(edu.id, { details: v })} />
              </div>
            ))}
            <Button
              onClick={() =>
                setData((d) => ({
                  ...d,
                  education: [...d.education, { id: uid(), degree: "Degree", school: "School" }],
                }))
              }
            >
              Add Education
            </Button>
          </div>
        </Panel>

        {/* Privacy badge */}
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <svg className="h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p className="text-xs text-emerald-800">
            <strong>Your data stays on your device.</strong> Nothing is uploaded — all resumes are saved locally in your browser.
          </p>
        </div>
      </div>
    </>
  );
}
