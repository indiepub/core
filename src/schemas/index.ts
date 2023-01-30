import { z } from "zod"
import { safeDate } from "../utils"

const baseSchema = z.object({
	published: safeDate("when the entry was published").optional(),
	updated: safeDate("when the entry was updated").optional(),
	author: z.string().describe("who wrote the entry, optionally embedded as a Card").optional(),
	category: z.array(z.string().min(1)).describe("entry categories/tags").default([]),
})

export const articleSchema = baseSchema.extend({
	name: z.string().describe("entry name/title"),
	summary: z.string().describe("short entry summary").optional(),
	featured: z
		.string()
		.url()
		.describe("primary photo for an article suitable for use in a link preview")
		.optional(),
})
export type Article = z.infer<typeof articleSchema>

export const bookmarkSchema = baseSchema.extend({
	/* Proposed properties */
	bookmarkOf: z
		.string()
		.url()
		.describe("original URL the entry is considered a bookmark of")
		.optional(),
})

export type Bookmark = z.infer<typeof bookmarkSchema>

export const noteSchema = baseSchema.extend({
	inReplyTo: z
		.string()
		.url()
		.describe("the URL which the entry is considered a reply to")
		.optional(),
	rsvp: z.enum(["yes", "maybe", "no", "interested"]).optional(),
	likeOf: z.string().url().describe('the URL which the entry is considered a "like" of').optional(),
	repostOf: z
		.string()
		.url()
		.describe('the URL which the entry is considered a "repost" of')
		.optional(),
	/* Draft properties */
	photo: z
		.string()
		.url()
		.describe("one or more photos that is/are considered the primary content of the entry")
		.optional(),
	video: z
		.string()
		.url()
		.or(z.array(z.string().url()))
		.describe("one or more videos that is/are considered the primary content of the entry")
		.optional(),
})
export type Note = z.infer<typeof noteSchema>
