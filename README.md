# Resume Builder Pro JS

A full JavaScript Next.js resume builder with live editing, multiple templates, autosave, JSON import/export, and browser print-to-PDF support.

## Tech

- Next.js 16
- React 19
- Tailwind CSS 4
- JavaScript only, no TypeScript files

## Run locally

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Features

- Live resume editor and preview
- Modern, Classic, and Compact templates
- Personal info, summary, skills, experience, projects, education, and certifications
- Skills and certifications support comma-separated typing without deleting the comma while you type
- Local autosave
- Export JSON
- Import JSON
- Reset sample data
- Print / Save as PDF

## Node version

Use Node.js 20.19+, 22.13+, or 24+.

## Tailwind CSS v4

This project uses the Tailwind v4 PostCSS plugin:

```js
plugins: {
  '@tailwindcss/postcss': {},
}
```

And the CSS entry uses:

```css
@import "tailwindcss";
```
