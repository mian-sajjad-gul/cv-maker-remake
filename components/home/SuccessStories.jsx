import { Star, CheckCircle } from "lucide-react";

const stories = [
  {
    name: "Ayesha Khan",
    role: "Frontend Developer",
    result: "Hired at Series-B SaaS Startup",
    quote:
      "The developer template helped me present my open-source projects, system scale, and stack clearly. Within 10 days of applying, I had 3 interview loops.",
    rating: 5,
  },
  {
    name: "Daniel Lee",
    role: "Product Manager",
    result: "3 Senior PM Offers in 3 Weeks",
    quote:
      "The MBA-style layout made my experience look sharper and genuinely executive. Recruiters explicitly commented on how easy it was to scan my metric bullet points.",
    rating: 5,
  },
  {
    name: "Maria Gomez",
    role: "Senior Data Analyst",
    result: "40% Salary Increase",
    quote:
      "I finally had a resume that explained my impact with numbers and ROI, not just daily tasks. The single-page spacing controls saved so much trial and error.",
    rating: 5,
  },
  {
    name: "Omar Farooq",
    role: "Software Engineer",
    result: "Passed Workday & Taleo Filters",
    quote:
      "The Minimal ATS template kept everything completely clean and parse-friendly. Every single company's automated portal extracted my dates and skills with 100% accuracy.",
    rating: 5,
  },
  {
    name: "Emily Carter",
    role: "Marketing Director",
    result: "5 Recruiter Calls in One Month",
    quote:
      "Having a matching cover letter designed right inside the same tool was a game changer. The entire package looked coordinated and high-caliber.",
    rating: 5,
  },
  {
    name: "Marcus Sterling",
    role: "Management Consultant",
    result: "Landed Tier-1 Firm Interview",
    quote:
      "The Harvard template's serif typography and balanced margins give off an immediate sense of polish. It's rare to find a free builder this refined.",
    rating: 5,
  },
];

export function SuccessStories() {
  return (
    <section id="stories" className="bg-slate-50 py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600">
            Candidate Success
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
            Resumes that get people hired
          </h2>

          <p className="mt-3 text-base text-slate-600">
            Read how professionals across tech, healthcare, finance, and business used CVPair to land interviews at top companies.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.name}
              className="rounded-3xl bg-white p-7 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4 text-base font-bold text-slate-950">
                  {story.result}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-900 text-xs font-black text-white">
                  {story.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-sm font-bold text-slate-950">
                      {story.name}
                    </h3>
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" title="Verified User" />
                  </div>
                  <p className="truncate text-xs text-slate-500">
                    {story.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
