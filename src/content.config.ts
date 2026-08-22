import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const notices = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/data/notices" }),
    schema: z.object({
        title: z.string(),
        date: z.string(),
        archived: z.boolean(),
    }),
});
export const collections = { notices };
