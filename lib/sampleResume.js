const defaultCoverLetter = {
  recipientName: "",
  company: "",
  position: "",
  body: "",
};

export const sampleResume = {
  template: "modern",
  accentColor: "#0f172a",
  sectionOrder: ["summary", "skills", "experience", "projects", "education", "certifications"],
  coverLetter: defaultCoverLetter,
  personal: {
    name: "Your Name",
    headline: "Frontend Developer",
    email: "you@email.com",
    phone: "+1 300 000 0000",
    location: "New York, USA",
    website: "https://portfolio.example.com",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
    photo: "",
  },
  summary:
    "Frontend developer experienced in building responsive, accessible, and performance-focused web applications using React, Next.js, JavaScript, and Tailwind CSS. Strong ability to convert product requirements into polished user interfaces.",
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "Tailwind CSS",
    "REST APIs",
    "Git",
    "Responsive UI",
    "Performance Optimization",
  ],
  experience: [
    {
      id: "exp-1",
      title: "Frontend Developer",
      subtitle: "Freelance / Remote",
      location: "Remote",
      startDate: "2023",
      endDate: "Present",
      bullets: [
        "Built production-ready dashboards and landing pages with React, Next.js, and Tailwind CSS.",
        "Integrated REST APIs, authentication flows, and reusable component systems.",
        "Improved page speed and SEO by optimizing images, metadata, and rendering strategy.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Resume Builder SaaS",
      subtitle: "Next.js, JavaScript, Tailwind CSS",
      link: "https://github.com/example/resume-builder",
      bullets: [
        "Created a browser-based resume editor with live preview and PDF printing.",
        "Added multiple templates, JSON import/export, and local autosave.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Computer Science",
      school: "Example University",
      location: "New York, USA",
      startDate: "2019",
      endDate: "2023",
      details:
        "Relevant coursework: Web Development, Databases, Software Engineering.",
    },
  ],
  certifications: [
    "Meta Front-End Developer Certificate",
    "JavaScript Algorithms and Data Structures",
  ],
};

export const professionSamples = {
  engineer: {
    ...sampleResume,
    template: "developer",
    personal: {
      ...sampleResume.personal,
      name: "Alex Chen",
      headline: "Senior Software Engineer",
      email: "alex@example.com",
      phone: "+1 415 000 0000",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexchen",
      github: "github.com/alexchen",
    },
    summary:
      "Senior Software Engineer with 6+ years building scalable backend systems and developer tooling. Experienced in distributed systems, API design, and cloud infrastructure. Passionate about engineering quality and developer experience.",
    skills: [
      "Python",
      "Go",
      "TypeScript",
      "Node.js",
      "AWS",
      "Kubernetes",
      "PostgreSQL",
      "Redis",
      "GraphQL",
      "CI/CD",
    ],
    experience: [
      {
        id: "exp-1",
        title: "Senior Software Engineer",
        subtitle: "Stripe",
        location: "San Francisco, CA",
        startDate: "2021",
        endDate: "Present",
        bullets: [
          "Designed and shipped a distributed rate-limiting service handling 2M+ API calls/day.",
          "Reduced p99 latency by 40% through query optimization and Redis caching layer.",
          "Led migration of 3 legacy microservices to Go, cutting memory usage by 60%.",
        ],
      },
      {
        id: "exp-2",
        title: "Software Engineer",
        subtitle: "Twilio",
        location: "San Francisco, CA",
        startDate: "2018",
        endDate: "2021",
        bullets: [
          "Built real-time messaging pipeline processing 500K events/hour with Kafka.",
          "Owned the developer SDK for Python and Node.js with 50K+ monthly downloads.",
        ],
      },
    ],
    projects: [
      {
        id: "proj-1",
        title: "OpenTrace",
        subtitle: "Go, Prometheus, Grafana",
        link: "github.com/alexchen/opentrace",
        bullets: [
          "Open-source distributed tracing library with 1.2K GitHub stars.",
          "Supports automatic instrumentation for HTTP, gRPC, and database calls.",
        ],
      },
    ],
    certifications: ["AWS Solutions Architect – Associate", "Certified Kubernetes Administrator (CKA)"],
  },

  designer: {
    ...sampleResume,
    template: "creative",
    accentColor: "#7c3aed",
    personal: {
      ...sampleResume.personal,
      name: "Maya Patel",
      headline: "Senior Product Designer",
      email: "maya@example.com",
      phone: "+1 646 000 0000",
      location: "New York, NY",
      website: "mayapatel.design",
      linkedin: "linkedin.com/in/mayapatel",
      github: "",
    },
    summary:
      "Senior Product Designer with 5+ years crafting user-centered digital experiences for SaaS and consumer products. Expert in end-to-end design — from user research and wireframing to high-fidelity prototyping and design systems.",
    skills: [
      "Figma",
      "User Research",
      "Interaction Design",
      "Design Systems",
      "Prototyping",
      "Usability Testing",
      "Framer",
      "Accessibility (WCAG)",
    ],
    experience: [
      {
        id: "exp-1",
        title: "Senior Product Designer",
        subtitle: "Notion",
        location: "New York, NY",
        startDate: "2022",
        endDate: "Present",
        bullets: [
          "Redesigned the onboarding flow, increasing 7-day activation by 28%.",
          "Built and maintained a component library of 200+ Figma components used across 12 product teams.",
          "Ran 40+ user interviews and usability tests to inform roadmap prioritization.",
        ],
      },
      {
        id: "exp-2",
        title: "Product Designer",
        subtitle: "Figma",
        location: "Remote",
        startDate: "2020",
        endDate: "2022",
        bullets: [
          "Designed collaborative multiplayer features used by 3M+ teams globally.",
          "Created accessibility audit framework adopted company-wide for all product launches.",
        ],
      },
    ],
    projects: [
      {
        id: "proj-1",
        title: "Design System — Atlas",
        subtitle: "Figma, Storybook, React",
        link: "mayapatel.design/atlas",
        bullets: [
          "End-to-end design system with tokens, components, and usage guidelines.",
          "Adopted by 4 engineering teams, reducing design-to-dev handoff time by 50%.",
        ],
      },
    ],
    certifications: ["Google UX Design Professional Certificate", "Nielsen Norman Group UX Certification"],
  },

  marketing: {
    ...sampleResume,
    template: "executive",
    accentColor: "#0369a1",
    personal: {
      ...sampleResume.personal,
      name: "Jordan Williams",
      headline: "Head of Growth Marketing",
      email: "jordan@example.com",
      phone: "+1 312 000 0000",
      location: "Chicago, IL",
      website: "",
      linkedin: "linkedin.com/in/jordanwilliams",
      github: "",
    },
    summary:
      "Growth-focused marketing leader with 7+ years driving demand generation, content strategy, and performance marketing for B2B SaaS companies. Proven track record of scaling pipeline from $0 to $10M ARR through data-driven campaigns and cross-functional leadership.",
    skills: [
      "Demand Generation",
      "SEO & Content Strategy",
      "Paid Media (Google, Meta)",
      "HubSpot",
      "Salesforce",
      "A/B Testing",
      "Marketing Analytics",
      "Email Marketing",
    ],
    experience: [
      {
        id: "exp-1",
        title: "Head of Growth Marketing",
        subtitle: "Loom",
        location: "Chicago, IL",
        startDate: "2021",
        endDate: "Present",
        bullets: [
          "Grew organic traffic from 80K to 620K monthly visitors through SEO and content programs.",
          "Managed $2.4M paid media budget with 3.2x blended ROAS across Google and LinkedIn.",
          "Built and led a team of 8 marketers across content, paid, and lifecycle tracks.",
        ],
      },
      {
        id: "exp-2",
        title: "Senior Marketing Manager",
        subtitle: "Calendly",
        location: "Remote",
        startDate: "2018",
        endDate: "2021",
        bullets: [
          "Launched product-led growth email sequences contributing to 35% of new MRR.",
          "Owned the company blog, scaling from 5K to 90K monthly readers in 18 months.",
        ],
      },
    ],
    projects: [
      {
        id: "proj-1",
        title: "\"State of Async Work\" Annual Report",
        subtitle: "Content Marketing, Data Partnership",
        link: "",
        bullets: [
          "Produced industry report downloaded 12K+ times in first month of launch.",
          "Generated 800+ qualified leads and 14 inbound partnership requests.",
        ],
      },
    ],
    certifications: ["Google Analytics 4 Certified", "HubSpot Marketing Software Certified"],
  },

  finance: {
    ...sampleResume,
    template: "harvard",
    accentColor: "#166534",
    personal: {
      ...sampleResume.personal,
      name: "Priya Sharma",
      headline: "Senior Financial Analyst",
      email: "priya@example.com",
      phone: "+1 212 000 0000",
      location: "New York, NY",
      website: "",
      linkedin: "linkedin.com/in/priyasharma",
      github: "",
    },
    summary:
      "CFA-certified financial analyst with 5+ years in investment banking and corporate finance. Expertise in financial modeling, M&A due diligence, and equity research. Known for delivering rigorous analysis that drives multi-million dollar investment decisions.",
    skills: [
      "Financial Modeling",
      "Valuation (DCF, Comps, LBO)",
      "M&A Due Diligence",
      "Excel & VBA",
      "Bloomberg Terminal",
      "SQL",
      "PowerPoint",
      "Capital IQ",
    ],
    experience: [
      {
        id: "exp-1",
        title: "Senior Financial Analyst",
        subtitle: "Goldman Sachs — Investment Banking Division",
        location: "New York, NY",
        startDate: "2021",
        endDate: "Present",
        bullets: [
          "Built comprehensive LBO and DCF models for 8 M&A transactions totaling $4.2B in deal value.",
          "Led financial due diligence for a $1.1B acquisition in the healthcare sector.",
          "Prepared and presented investment memoranda to managing directors and clients.",
        ],
      },
      {
        id: "exp-2",
        title: "Financial Analyst",
        subtitle: "JP Morgan — Corporate Finance",
        location: "New York, NY",
        startDate: "2019",
        endDate: "2021",
        bullets: [
          "Developed 3-statement models and scenario analyses for 15+ portfolio companies.",
          "Automated monthly reporting dashboards in Excel VBA, saving 6 hours/week.",
        ],
      },
    ],
    projects: [
      {
        id: "proj-1",
        title: "Equity Research — SaaS Sector Coverage",
        subtitle: "Independent Research Project",
        link: "",
        bullets: [
          "Initiated coverage on 5 public SaaS companies with buy/sell recommendations.",
          "Models cited in 2 institutional investor presentations.",
        ],
      },
    ],
    certifications: ["CFA Level III Charterholder", "Series 79 Licensed"],
  },
};

export const previewResume = {
  template: "modern",
  accentColor: "#0f172a",
  sectionOrder: ["summary", "skills", "experience", "projects", "education", "certifications"],
  coverLetter: defaultCoverLetter,
  personal: {
    name: "Your Name",
    headline: "Frontend Developer",
    email: "you@email.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    website: "yourportfolio.com",
    linkedin: "linkedin.com/in/yourname",
    github: "github.com/yourname",
    photo: "",
  },
  summary:
    "Results-driven professional with experience building modern products, improving workflows, and delivering measurable business impact.",
  skills: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Product Strategy", "Analytics"],
  experience: [
    {
      id: "exp-1",
      title: "Frontend Developer",
      subtitle: "Tech Company",
      location: "New York, USA",
      startDate: "2023",
      endDate: "Present",
      bullets: [
        "Built responsive web applications used by 15K+ monthly users.",
        "Improved page speed by 32% through performance optimization.",
      ],
    },
    {
      id: "exp-2",
      title: "Junior Developer",
      subtitle: "Startup Studio",
      location: "Remote",
      startDate: "2021",
      endDate: "2023",
      bullets: [
        "Developed reusable UI components using React and Tailwind CSS.",
        "Collaborated with designers to ship polished customer-facing pages.",
      ],
    },
  ],
  projects: [
    {
      id: "project-1",
      title: "Resume Builder Platform",
      subtitle: "Next.js, Supabase, Tailwind CSS",
      link: "resumepro.com",
      bullets: [
        "Created a live resume editor with multiple professional templates.",
        "Added SEO-friendly blog and admin content management system.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Computer Science",
      school: "University Name",
      location: "Boston, USA",
      startDate: "2017",
      endDate: "2021",
      details: "Relevant coursework: Web Development, Databases, UX Design.",
    },
  ],
  certifications: ["JavaScript Professional Certificate", "Google UX Design Certificate"],
};
