# Saikumar Kathraj — Portfolio

A premium, dark-themed personal portfolio for a Software Engineer specializing in
Java, Spring Boot, Adobe Experience Manager (AEM Cloud Service) and modern full
stack web development.

**Live sections:** Hero · About · Tech Stack · Experience · Projects · Skills ·
Achievements · Education · Certifications · Contact

## Features

- Glassmorphism "Neon Glass" design system with `oklch` design tokens
- Particle background, cursor glow, scroll reveals, magnetic buttons, 3D tilt cards
- Lenis smooth inertia scrolling (respects `prefers-reduced-motion`)
- Typewriter hero, animated counters and circular skill dials
- SEO: per-route metadata, Open Graph/Twitter tags, JSON-LD `Person` schema
- Contact form persisted to **Google Sheets** via a Google Apps Script Web App

## Tech Stack

| Layer      | Technology                                   |
| ---------- | -------------------------------------------- |
| Framework  | TanStack Start (v1) + TanStack Router         |
| UI         | React 19, TypeScript 5                        |
| Styling    | Tailwind CSS v4, shadcn/ui, tw-animate-css    |
| Motion     | Motion (Framer Motion), Lenis                 |
| Data       | TanStack Query                                |
| Build      | Vite 8                                        |
| Backend    | Google Apps Script Web App → Google Sheets    |
| Tooling    | ESLint, Prettier                              |

## Installation

```bash
git clone https://github.com/saikumar9542/Portfolio.git
cd Portfolio
npm install
```

Node.js **20.19+ or 22+** is required.

## Development

```bash
npm run dev
```

Opens the dev server (default `http://localhost:8080`) with hot module reload.

## Build

```bash
npm run build     # production build
npm run preview   # serve the production build locally
```

Other scripts:

```bash
npm run build:dev   # build using development mode
npm run lint        # ESLint
npm run format      # Prettier write
```

## Contact form setup (Google Sheets)

1. Create a Google Sheet.
2. **Extensions → Apps Script** and paste the contents of [`code.gs`](./code.gs).
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the `/exec` URL into `GOOGLE_APPS_SCRIPT_URL` in `src/lib/contact.ts`.

The script creates a `Contacts` tab with the columns
`Timestamp | Name | Email | Phone | Subject | Message`, validates the payload
and returns a JSON response.

## Deployment

**Lovable** — open the project in Lovable and click *Publish*.

**Any static/edge host** — run `npm run build` and deploy the generated output
(`.output/`). The app targets an edge runtime (Cloudflare Workers-compatible)
and also works on Netlify or Vercel with their TanStack Start presets.

No environment variables are required; the Apps Script URL is a public endpoint.

## Folder structure

```
.
├── code.gs                     # Google Apps Script backend for the contact form
├── public/                     # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/                 # Images, resume PDF
│   ├── components/
│   │   ├── portfolio/          # Page sections (Hero, About, Projects, Contact…)
│   │   └── ui/                 # shadcn/ui primitives
│   ├── hooks/                  # Reusable React hooks
│   ├── lib/                    # Utilities & API layer (contact.ts, portfolio-data.ts)
│   ├── routes/                 # File-based routes (__root.tsx, index.tsx)
│   ├── routeTree.gen.ts        # Generated — do not edit
│   ├── router.tsx              # Router setup
│   ├── server.ts / start.ts    # Server & client entry configuration
│   └── styles.css              # Tailwind v4 theme + design tokens
├── SETUP.md                    # Beginner-friendly local setup guide
├── vite.config.ts
└── package.json
```

## License

Personal portfolio — © Saikumar Kathraj. All rights reserved.
