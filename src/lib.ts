import { z } from "astro/zod";
import dayjs from "dayjs";

export function csv(csv: string): [string[], string[][]] {
    const lines = csv.split(/[\r\n]+/).filter(e => e).map(e => e.split(','));
    const headers = lines.splice(0, 1)[0];
    return [headers, lines];
}

const numToTime = (n: number) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;

const length = z.union([
    z.string()
        .regex(/^\d+(:\d{2})?$/, "length must be seconds or m:ss")
        .transform(v => /^\d+$/.test(v) ? numToTime(Number(v)) : v),
    z.number().transform(numToTime),
]);

const track = z.object({
    name: z.string(),
    isrc: z.string().regex(/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/),
    length,
    lyrics: z.string().optional(),
    artists: z.array(z.string()).nonempty().optional(),
});

export const album = z.object({
    name: z.string(),
    artists: z.array(z.string()).nonempty(),
    release: z.union([z.iso.date(), z.coerce.date()]),
    cover: z.httpUrl().optional(),
    link: z.httpUrl().optional(),
    tracks: z.array(track).nonempty(),
}).transform(a => ({
    cover: "",
    link: "",
    ...a,
    release: dayjs(a.release).format("YYYY-MM-DD"),
    tracks: a.tracks.map((t) => ({ lyrics: "", artists: a.artists, ...t })),
}));
export type album = z.infer<typeof album>;
export type track = album["tracks"][number];
