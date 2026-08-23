import { z } from "astro/zod";
import dayjs from "dayjs";
import * as YAML from "js-yaml";
import yalbums from "./data/albums.yaml?raw";

export function csv(csv: string): [string[], string[][]] {
    const lines = csv.split(/[\r\n]+/).filter(e => e).map(e => e.split(','));
    const headers = lines.splice(0, 1)[0];
    return [headers, lines];
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
    release: z.iso.date().transform(dayjs),
    cover: z.httpUrl().optional(),
    link: z.httpUrl().optional(),
    tracks: z.array(track).nonempty(),
}).transform(a => ({
    ...a,
    tracks: a.tracks.map(t => ({ ...t, artists: t.artists ?? a.artists })),
}));
export type album = z.infer<typeof album>;
export type track = album["tracks"][number];

export const albums: album[] = z.array(album).nonempty().parse(YAML.load(yalbums));
export const tracks: track[] = albums.flatMap(a => a.tracks);
