// Split src/data/albums.yaml into one file per album: src/data/albums/<upc>.yaml
// Verbatim: each file is exactly the album's lines (including its `upc:` and
// `release:` lines, in original order). No YAML parsing — pure line block copy,
// so merging back (albums-merge.mjs) reproduces the source byte-for-byte.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const albumFile = resolve(root, "src/data/albums.yaml");
const outDir = resolve(root, "src/data/albums");

const orig = readFileSync(albumFile, "utf-8");
const lines = orig.split("\n");
let trail = 0;
while (trail < lines.length && lines[lines.length - 1 - trail] === "") trail++;
const body = lines.slice(0, lines.length - trail);
const trailer = "\n".repeat(trail);

// Album blocks start at any line that is a top-level `- ` entry.
const starts = [];
body.forEach((l, i) => {
    if (l === "-" || l.startsWith("- ")) starts.push(i);
});

if (starts.length === 0) throw new Error("No top-level `- ` album entries found in albums.yaml.");

const upcRe = /^(\s*)upc:\s*(\d+)\s*$/;
const releaseRe = /^(?!\s*#)\s*release:\s*\S+/;

const upcs = new Set();
const blocks = [];
for (let b = 0; b < starts.length; b++) {
    const s = starts[b];
    const e = b + 1 < starts.length ? starts[b + 1] : body.length;
    const block = body.slice(s, e);
    const upcLine = block.find(l => upcRe.test(l));
    const upc = upcLine && upcRe.exec(upcLine)[2];
    if (!upc) throw new Error(`Album block ${b + 1} has no top-level upc line.`);
    if (!/^\d{13}$/.test(upc)) throw new Error(`upc ${upc} is not a 13-digit UPC.`);
    if (upcs.has(upc)) throw new Error(`Duplicate upc: ${upc}`);
    if (!block.some(l => releaseRe.test(l))) throw new Error(`Album ${upc} has no release line.`);
    upcs.add(upc);
    blocks.push({ upc, block });
}

mkdirSync(outDir, { recursive: true });
// Remove any stale *.yaml from a previous run so the split is idempotent.
for (const f of readdirSync(outDir)) if (/\.yaml$/i.test(f)) rmSync(resolve(outDir, f));

for (const { upc, block } of blocks) {
    const out = block.join("\n") + trailer;
    writeFileSync(resolve(outDir, `${upc}.yaml`), out);
}

console.log(`Wrote ${blocks.length} files to ${outDir}`);
console.log(`Reconstruction check: ${JSON.stringify(blocks.flatMap(x => x.block).join("\n") + trailer) === JSON.stringify(orig) ? "identical to source" : "MISMATCH (see merge/git diff)"}`);
