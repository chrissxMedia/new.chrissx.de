import dayjs from "dayjs";
import * as YAML from "js-yaml";
import yalbums from "./data/albums.yaml?raw";

export function csv(csv: string): [string[], string[][]] {
    const lines = csv.split(/[\r\n]+/).filter(e => e).map(e => e.split(','));
    const headers = lines.splice(0, 1)[0];
    return [headers, lines];
}

// TODO: content config loader
export const albums: album[] = (YAML.load(yalbums) as _yalbum[]).map(a =>
    ({ ...a, release: dayjs(a.release), tracks: a.tracks.map<track>(t => ({ ...a, ...t })) } as album));

export const tracks: track[] = albums.flatMap(a => a.tracks);
