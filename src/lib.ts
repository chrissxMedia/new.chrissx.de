import { z } from "astro/zod";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import * as YAML from "js-yaml";

export function csv(csv: string): [string[], string[][]] {
    const lines = csv.split(/[\r\n]+/).filter(e => e).map(e => e.split(','));
    const headers = lines.splice(0, 1)[0];
    return [headers, lines];
}

export type albumWithUpc = album & { upc: string };

/** Read + validate one album per <upc>.yaml file from dir (defaults to src/data/albums/). Verifies each file's content-upc matches its filename. */
export async function loadAlbums(dir = new URL("./data/albums/", import.meta.url)): Promise<albumWithUpc[]> {
    const files = (await readdir(fileURLToPath(dir))).filter(f => /^\d{13}\.yaml$/.test(f)).sort();
    return Promise.all(files.map(async f => {
        const upc = f.slice(0, 13);
        const loaded = YAML.load(await readFile(fileURLToPath(new URL(f, dir)), "utf-8"));
        const base = Array.isArray(loaded) ? loaded[0] : loaded;
        const parsed = album.parse(base);
        if (parsed.upc !== upc) throw new Error(`upc in ${f} (${String(parsed.upc)}) does not match its filename (${upc})`);
        return parsed as albumWithUpc;
    }));
}

const length = z.string()
    .regex(/^(?:\d+|\d+:\d{2})$/, "length must be seconds or m:ss")
    .transform(v => {
        if (/^\d+$/.test(v)) {
            const n = Number(v);
            return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
        }
        return v;
    });

export const track = z.object({
    name: z.string(),
    isrc: z.string().regex(/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/).optional(),
    length,
    lyrics: z.string().optional(),
    artists: z.array(z.string()).nonempty().optional(),
});

export const album = z.object({
    name: z.string(),
    artists: z.array(z.string()).nonempty(),
    upc: z.coerce.string().regex(/^\d{13}$/).optional(),
    release: z.iso.date(),
    cover: z.httpUrl().optional(),
    link: z.httpUrl().optional(),
    tracks: z.array(track).nonempty(),
}).transform(a => ({
    ...a,
    tracks: a.tracks.map(t => ({ ...t, artists: t.artists ?? a.artists })),
}));
export type album = z.infer<typeof album>;
export type track = album["tracks"][number];
