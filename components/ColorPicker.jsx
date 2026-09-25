"use client";

const PRESETS = [
  { name: "Slate", value: "#0f172a" },
  { name: "Navy", value: "#1e3a5f" },
  { name: "Forest", value: "#14532d" },
  { name: "Burgundy", value: "#9f1239" },
  { name: "Indigo", value: "#3730a3" },
  { name: "Steel", value: "#0369a1" },
];

export function ColorPicker({ value, onChange }) {
  const current = value || "#0f172a";

  return (
    <div>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        Accent Color
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        {PRESETS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            title={preset.name}
            onClick={() => onChange(preset.value)}
            style={{ background: preset.value }}
            className={`h-7 w-7 rounded-full border-2 transition-all ${
              current === preset.value
                ? "border-white ring-2 ring-offset-1 ring-slate-400 scale-110"
                : "border-transparent hover:scale-105"
            }`}
          />
        ))}
        <label
          title="Custom color"
          className="relative h-7 w-7 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-slate-300 hover:border-slate-400"
        >
          <input
            type="color"
            value={current}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div
            className="h-full w-full rounded-full"
            style={{ background: current }}
          />
        </label>
      </div>
    </div>
  );
}
