import { existsSync } from "node:fs";
import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../content/midnight-archive.mjs";
import { seasonalSite } from "../content/seasonal-observatory.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(root, "dist", site.slug);
const target = path.join(root, "docs");

function assertInsideWorkspace(targetPath) {
  const relative = path.relative(root, targetPath);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to write outside workspace: ${targetPath}`);
  }
}

await stat(path.join(source, "index.html"));
assertInsideWorkspace(target);

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });

const secondarySites = [seasonalSite];
for (const secondarySite of secondarySites) {
  const secondarySource = path.join(root, "dist", secondarySite.slug);
  const secondaryTarget = path.join(target, secondarySite.slug);
  if (!existsSync(path.join(secondarySource, "index.html"))) continue;
  assertInsideWorkspace(secondaryTarget);
  await rm(secondaryTarget, { recursive: true, force: true });
  await cp(secondarySource, secondaryTarget, { recursive: true });
}

console.log(`Synced ${source} to ${target}`);
