import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "dist");
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function safeResolve(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  const resolved = path.resolve(root, cleanPath);
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

createServer(async (req, res) => {
  const resolved = safeResolve(req.url || "/");
  if (!resolved) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  let filePath = resolved;
  if (!path.extname(filePath)) filePath = path.join(filePath, "index.html");

  if (!existsSync(filePath)) {
    const fallback = path.join(resolved, "index.html");
    filePath = existsSync(fallback) ? fallback : "";
  }

  if (!filePath || !existsSync(filePath) || !(await stat(filePath)).isFile()) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, {
    "content-type": types[path.extname(filePath)] || "application/octet-stream"
  });
  createReadStream(filePath).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Preview server: http://127.0.0.1:${port}/midnight-archive/`);
});
