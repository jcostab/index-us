import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string().min(20).max(90),
    description: z.string().min(80).max(180),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    author: z.string().default("Index Us Editorial"),
    category: z.enum(["News", "Tools", "Techniques", "Analysis", "Guides"]),
    tags: z.array(z.string()).min(2).max(6),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    readingMinutes: z.number().int().positive(),
    keyTakeaways: z.array(z.string()).min(2).max(5),
    sources: z.array(z.object({
      label: z.string(),
      url: z.url(),
    })).min(1),
  }),
});

export const collections = { articles };
