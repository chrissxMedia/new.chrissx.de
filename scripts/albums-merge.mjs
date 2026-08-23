// Merge src/data/albums/<upc>.yaml back into src/data/albums.yaml.
// Verbatim line blocks; albums ordered by `release` (ascending, ISO date sorts
// chronologically), upc as tie-break. The result should be byte-for-byte the
// original, so `git diff src/data/albums.yaml` is empty after split + merge.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inDir = resolve(root, "src/data/albums");
const outFile = resolve(root, "src/data/albums.yaml");

const files = readdirSync(inDir).filter(f => /^\d{13}\.yaml$/.test(f)).sort();
if (files.length === 0) throw new Error(`No <upc>.yaml files found in ${inDir}.`);

const releaseOf = (block) => {
    for (const l of block) {
        const m = l.match(/^\s*release:\s*(\S+)/);
        if (m) return m[1].replace(/^['"]|['"]$/g, "");
    }
    return "";
};

const albums = files.map(file => {
    const s = readFileSync(resolve(inDir, file), "utf-8");
    const L = s.split("\n");
    let trail = 0;
    while (trail < L.length && L[L.length - 1 - trail] === "") trail++;
    return { upc: file.replace(/\.yaml$/, ""), block: L.slice(0, L.length - trail) };
});

albums.sort((a, b) => {
    const ra = releaseOf(a.block), rb = releaseOf(b.block);
    if (ra !== rb) return ra < rb ? -1 : 1;
    if (a.upc !== b.upc) return a.upc < b.upc ? -1 : 1;
    return 0;
});

const merged = albums.flatMap(a => a.block).join("\n") + "\n";
writeFileSync(outFile, merged);
console.log(`Merged ${albums.length} albums into ${outFile}`);
