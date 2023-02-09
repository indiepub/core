import { z } from "zod"
import { safeDate } from "../utils"

export function createSchemas() {
	const baseSchema = z.object({
		published: safeDate("when the entry was published").optional(),
		updated: safeDate("when the entry was updated").optional(),
		author: z.string().describe("who wrote the entry, optionally embedded as a Card").optional(),
		category: z.array(z.string().min(1)).describe("entry categories/tags").default([]),
	})

	const articleSchema = baseSchema.extend({
		name: z.string().describe("entry name/title"),
		summary: z.string().describe("short entry summary").optional(),
		featured: z
			.string()
			.describe("primary photo for an article suitable for use in a link preview")
			.optional(),
		uid: z
			.string()
			.url()
			.describe(
				"canonical URL for the article, used if the article was originally published on another site",
			)
			.optional(),
	})

	const bookmarkSchema = baseSchema.extend({
		/* Proposed properties */
		bookmarkOf: z.string().url().describe("original URL the entry is considered a bookmark of"),
	})

	const noteSchema = baseSchema.extend({
		inReplyTo: z
			.string()
			.url()
			.describe("the URL which the entry is considered a reply to")
			.optional(),
		rsvp: z.enum(["yes", "maybe", "no", "interested"]).optional(),
		likeOf: z
			.string()
			.url()
			.describe('the URL which the entry is considered a "like" of')
			.optional(),
		repostOf: z
			.string()
			.url()
			.describe('the URL which the entry is considered a "repost" of')
			.optional(),
		/* Draft properties */
		photo: z
			.string()
			.or(z.array(z.string()))
			.describe("one or more photos that is/are considered the primary content of the entry")
			.optional(),
		video: z
			.string()
			.or(z.array(z.string()))
			.describe("one or more videos that is/are considered the primary content of the entry")
			.optional(),
	})

	const photoSchema = baseSchema.extend({
		name: z.string().describe("caption of the photo, often used for figure captions"),
		summary: z.string().describe("description of the photo, often used for alt text").optional(),
		photo: z.string().describe("src URL for the original image file"),
	})

	const personSchema = z.object({
		name: z.string().describe("The full/formatted anme of the person or organization"),
		nickname: z.string().describe("nickname, alias, or handle").optional(),
		givenName: z.string().describe("given (often first) name").optional(),
		familyName: z.string().describe("family (often last) name").optional(),
		email: z.string().email().describe("email address").optional(),
		logo: z
			.string()
			.describe("a logo representing the person or organization, e.g. avatar icon")
			.optional(),
		url: z
			.string()
			.url()
			.describe("home page or other URL representing the person or organization")
			.optional(),
	})

	return {
		articleSchema,
		bookmarkSchema,
		noteSchema,
		personSchema,
		photoSchema,
	}
}
