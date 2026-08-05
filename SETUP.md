# Local Setup Guide

A step-by-step guide to run this portfolio on your own machine — written for
first-time contributors.

---

## 1. Prerequisites

| Tool    | Purpose                     | Check with       |
| ------- | --------------------------- | ---------------- |
| Node.js | Runs the dev server & build | `node -v`        |
| npm     | Installs dependencies       | `npm -v`         |
| Git     | Clones and versions code    | `git --version`  |
| VS Code | Recommended editor          | —                |

## 2. Recommended Node.js version

**Node.js 22 LTS** (minimum: 20.19). Vite 8 and TanStack Start require modern Node.

Install with [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install 22
nvm use 22
node -v      # v22.x.x
```

Windows users: use [nvm-windows](https://github.com/coreybutler/nvm-windows) or
the installer from [nodejs.org](https://nodejs.org).

## 3. npm version

npm **10+** ships with Node 22. Verify and upgrade if needed:

```bash
npm -v
npm install -g npm@latest
```

## 4. VS Code extensions

| Extension                     | Why                                  |
| ----------------------------- | ------------------------------------ |
| ESLint (`dbaeumer.vscode-eslint`)        | Inline lint errors        |
| Prettier (`esbenp.prettier-vscode`)      | Auto-format on save       |
| Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`) | Class autocomplete |
| TypeScript Nightly (optional)            | Latest TS features        |
| Error Lens (`usernamehw.errorlens`)      | Errors shown inline       |
| GitLens (`eamodio.gitlens`)              | Git history in the editor |

Enable format-on-save in VS Code settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## 5. Install Git

- **Windows / macOS:** download from [git-scm.com](https://git-scm.com/downloads)
- **macOS (Homebrew):** `brew install git`
- **Ubuntu/Debian:** `sudo apt install git`

Configure once:

```bash
git config --global user.name  "Your Name"
git config --global user.email "you@example.com"
```

## 6. Clone the repository

```bash
git clone https://github.com/saikumar9542/Portfolio.git
cd Portfolio
```

## 7. Install dependencies

```bash
npm install
```

This creates `node_modules/` (git-ignored). First install takes 1–3 minutes.

## 8. Start the dev server

```bash
npm run dev
```

Open the printed URL (usually `http://localhost:8080`). Edits hot-reload instantly.

## 9. Production build

```bash
npm run build
```

Output goes to `.output/`. Fix any TypeScript errors reported here before deploying.

## 10. Preview the production build

```bash
npm run preview
```

Serves the built app locally so you can verify exactly what will be deployed.

## 11. Troubleshooting

**`EACCES` / permission errors on `npm install`**
Don't use `sudo`. Reinstall Node via nvm so npm owns its directories.

**`Unsupported engine` or syntax errors during install/build**
Your Node is too old — run `nvm use 22`.

**Port 8080 already in use**
Stop the other process or run `npm run dev -- --port 3000`.

**Blank page / stale build after pulling changes**
```bash
rm -rf node_modules .output .tanstack
npm install
npm run dev
```

**`Cannot find module '@/...'`**
The `@` alias maps to `src/`. Restart the TS server in VS Code:
`Cmd/Ctrl+Shift+P → TypeScript: Restart TS Server`.

**Contact form shows "Failed to Send"**
- Confirm `GOOGLE_APPS_SCRIPT_URL` in `src/lib/contact.ts` ends with `/exec`.
- In Apps Script, redeploy with **Who has access: Anyone** (a new *version*,
  not just "save").
- Open the URL in a browser: it should return `{"status":"success", ...}`.

**Changes to `code.gs` have no effect**
Apps Script serves the last *deployed* version — create a new deployment version.

**Routes not updating**
`src/routeTree.gen.ts` is auto-generated. Never edit it; restart `npm run dev`
to regenerate.

**Git push rejected**
```bash
git pull --rebase origin main
git push origin main
```

---

Still stuck? Open an issue on the repository with the full terminal output.
