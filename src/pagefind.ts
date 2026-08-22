// stolen from: https://github.com/withastro/starlight/commit/703fab085b99303c0c01325c9bb869ea7e1418c4
// Copyright (c) 2023 [Astro contributors](https://github.com/withastro/starlight/graphs/contributors)
// License: https://github.com/withastro/starlight/blob/703fab085b99303c0c01325c9bb869ea7e1418c4/LICENSE

import type { AstroIntegration, HookParameters } from "astro";
import { fileURLToPath } from "node:url";
import * as pagefind from "pagefind";
import { tracks } from "./lib";

export async function lyricsPagefind({ dir, logger: astroLogger }:
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

        for (const t of tracks) {
            await index.addCustomRecord({
                url: t.isrc ?? "XXX", // FIXME
                content: t.lyrics ?? "",
                language: "de",
                meta: { title: `${t.name} by ${t.artists.join(", ")}` },
            }).then(assertPagefindResponse);
        }
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
