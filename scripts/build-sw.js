import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
const files = [];
const walk = (dir) => {
  for (const e of readdirSync("dist/" + dir, { withFileTypes: true })) {
    const p = dir + e.name;
    e.isDirectory() ? walk(p + "/") : files.push(p);
  }
};
walk("");
const version = createHash("sha256")
  .update(files.map((f) => readFileSync("dist/" + f)).join(""))
  .digest("hex")
  .slice(0, 12);
const core = ["./", ...files.map((f) => "./" + f)];
writeFileSync(
  "dist/sw.js",
  `const CACHE='arabic-journey-${version}';const CORE=${JSON.stringify(core)};self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('arabic-journey-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request,{ignoreVary:true}).then(c=>c||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error())))});`,
);
console.log("Offline shell:", core.length, "files, cache", version);
