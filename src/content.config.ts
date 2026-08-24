import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { album } from "./lib";

const notices = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/data/notices" }),
    schema: z.object({
        title: z.string(),
        date: z.string(),
        archived: z.boolean(),
    }),
});

const albums = defineCollection({
    loader: glob({
        pattern: "*.yaml",
        base: "src/data/albums",
        generateId: ({ entry }) => entry.replace(/\.yaml$/, ""),
    }),
    schema: album,
});

export const collections = { notices, albums };
