// Post-processing for the GitHub Pages static export.
// 1. `.nojekyll` so GitHub Pages serves files/folders starting with `_`.
// 2. `404.html` = copy of `index.html` so client-side routing works on deep links/refresh.
import { copyFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const outDir = join(process.cwd(), "dist", "client");

await access(join(outDir, "index.html"));
await writeFile(join(outDir, ".nojekyll"), "");
await copyFile(join(outDir, "index.html"), join(outDir, "404.html"));

console.info(`GitHub Pages output ready: ${outDir} (.nojekyll + 404.html written)`);
