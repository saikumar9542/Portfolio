// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages build: enabled only when GITHUB_PAGES=true (see `npm run build:pages`).
// Lovable / local builds are completely unaffected.
const isGithubPages = process.env["GITHUB_PAGES"] === "true";
// Project pages are served from https://<user>.github.io/<repo>/
const base = isGithubPages ? (process.env["PAGES_BASE"] ?? "/Portfolio/") : "/";

export default defineConfig({
  vite: {
    base,
  },
  // Static export for GitHub Pages: prerender the routes to plain HTML instead of
  // producing a server bundle. Default (Lovable/Cloudflare) behaviour is untouched.
  ...(isGithubPages ? { nitro: false as const } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isGithubPages
      ? {
          prerender: { enabled: true, crawlLinks: false },
          pages: [{ path: "/", prerender: { enabled: true } }],
        }
      : {}),
  },
});
