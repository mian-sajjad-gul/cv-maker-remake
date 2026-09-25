const stories = [
  {
    name: "Ayesha Khan",
    role: "Frontend Developer",
    result: "Hired at a SaaS startup",
    quote:
      "The developer template helped me present my projects clearly and confidently.",
  },
  {
    name: "Daniel Lee",
    role: "Product Manager",
    result: "3 interviews in 2 weeks",
    quote:
      "The MBA-style layout made my experience look sharper and more executive.",
  },
  {
    name: "Maria Gomez",
    role: "Data Analyst",
    result: "Moved into analytics",
    quote:
      "I finally had a resume that explained my impact with numbers, not just tasks.",
  },
  {
    name: "Omar Farooq",
    role: "Software Engineer",
    result: "Offer from a fintech company",
    quote:
      "The ATS template kept everything clean while still looking professional.",
  },
  {
    name: "Emily Carter",
    role: "Marketing Manager",
    result: "5 recruiter calls in one month",
    quote:
      "The resume structure helped me turn campaigns into measurable achievements.",
  },
  {
    name: "Hassan Ali",
    role: "UI/UX Designer",
    result: "Portfolio shortlisted twice",
    quote:
      "The creative template gave my resume a strong visual style without losing clarity.",
  },
  {
    name: "Sophia Brown",
    role: "Business Analyst",
    result: "Moved into consulting",
    quote:
      "The consulting layout made my problem-solving experience much easier to scan.",
  },
  {
    name: "Ravi Patel",
    role: "Backend Developer",
    result: "Interviewed at 4 companies",
    quote:
      "Projects, APIs, and technical skills were finally organized in the right order.",
  },
  {
    name: "Nina Roberts",
    role: "HR Coordinator",
    result: "Landed a remote role",
    quote:
      "The clean layout helped me show both people skills and operations experience.",
  },
];

export function SuccessStories() {
  return (
    <section id="stories" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">
            Success Stories
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Resumes that help people get noticed.
          </h2>
        </div>

        <div className="mt-10 overflow-x-auto pb-4">
          <div className="flex gap-5">
            {stories.map((story) => (
              <article
                key={story.name}
                className="min-w-[300px] max-w-[300px] rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:min-w-[360px] md:max-w-[360px]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">
                    {story.name
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-black text-slate-950">
                      {story.name}
                    </h3>
                    <p className="truncate text-sm text-slate-500">
                      {story.role}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-lg font-black text-slate-950">
                  {story.result}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  “{story.quote}”
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
