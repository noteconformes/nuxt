import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		all: defineCollection({
			type: "page",
			source: "**/*.md",
			schema: z.object({
				title: z.string().min(1),
				description: z.string(),
				date: z.string().min(1),
				type: z.enum(["article", "series", "subseries", "book"]),
				// if a article is "subseries" it should have the serie file name
				serie: z.string(),
				category: z.string().optional(),
				authors: z.array(z.string()).optional(),
				tags: z.array(z.string()).optional(),
				translation: z.object({
					summary: z.string().min(1),
					url: z.string(),
					authors: z.array(z.string()),
				}),
				image: z.object({
					src: z.string().min(1),
					alt: z.string().min(1),
					descr: z.string().optional(),
					cc: z.string().optional(),
					hide: z.boolean().default(false),
				}),
				attachments: z.object({
					pdf: z.string().min(1),
					epub: z.string(),
				}),
			}),
		}),
	},
});
