import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { album, loadAlbums } from "./lib";

const notices = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/data/notices" }),
    schema: z.object({
        title: z.string(),
        date: z.string(),
        archived: z.boolean(),
    }),
});

const albums = defineCollection({
    schema: album,
    loader: {
        name: "albums",
        async load({ store, logger }) {
            const list = await loadAlbums();
            for (const a of list) store.set({ id: a.upc, data: a });
            logger.info(`Loaded ${list.length} albums`);
        },
    },
});

export const collections = { notices, albums };
