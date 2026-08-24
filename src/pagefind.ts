// stolen from: https://github.com/withastro/starlight/commit/703fab085b99303c0c01325c9bb869ea7e1418c4
// Copyright (c) 2023 [Astro contributors](https://github.com/withastro/starlight/graphs/contributors)
// License: https://github.com/withastro/starlight/blob/703fab085b99303c0c01325c9bb869ea7e1418c4/LICENSE

import type { AstroIntegration, HookParameters } from "astro";
import { fileURLToPath } from "node:url";
import * as pagefind from "pagefind";
import { album, type track } from "./lib";
import * as YAML from "js-yaml";
import { readFile } from "node:fs/promises";

async function loadTracks(): Promise<track[]> {
    const files = Object.keys(import.meta.glob("./data/albums/*.yaml")).map((f) => import.meta.resolve(f));
    const contents = await Promise.all(files.map(f => readFile(new URL(f), { encoding: "utf-8" })));
    return contents.map((x) => album.parse(YAML.load(x))).flatMap(({ tracks }) => tracks);
}

async function lyricsPagefind({ dir, logger: astroLogger }:
    Pick<HookParameters<"astro:build:done">, "dir" | "logger">) {
    const logger = astroLogger.fork("pagefind");

    function assertPagefindResponse<T extends { errors: string[]; }>(response: T) {
        if (response.errors.length > 0) {
            response.errors.map(err => `Pagefind error: ${err}`).forEach(logger.error);
            throw new Error("Pagefind response contained errors.");
        }
        return response as Required<T>;
    }

    try {
        const now = performance.now();
        logger.info("Building search index...");

        const newIndexResp = await pagefind.createIndex();
        const { index } = assertPagefindResponse(newIndexResp);

        const tracks = await loadTracks();
        await Promise.all(tracks.map(t => index.addCustomRecord({
            url: t.isrc, // FIXME: should isrc be optional to begin with?
            content: t.lyrics,
            language: "de",
            meta: { title: `${t.name} by ${t.artists.join(", ")}` },
        }).then(assertPagefindResponse)));
        logger.info(`Found ${await index.getFiles().then(x => x.files.length)} tracks.`);

        const writeFilesResponse = await index.writeFiles({
            outputPath: fileURLToPath(new URL("./experiments/lyrics/search/", dir)),
        });
        assertPagefindResponse(writeFilesResponse);

        const pagefindTime = performance.now() - now;
        const pfTimeStr = pagefindTime < 750 ? `${Math.round(pagefindTime)}ms` : `${(pagefindTime / 1000).toFixed(2)}s`;
        logger.info(`Finished building search index in ${pfTimeStr}.`);
    } catch (cause) {
        throw new Error("Failed to run Pagefind.", { cause });
    } finally {
        await pagefind.close();
    }
}

export default { name: "lyrics-pagefind", hooks: { "astro:build:done": lyricsPagefind } } as AstroIntegration;
