import { suite } from "uvu"
import * as assert from "uvu/assert"
import { ZodError } from "zod"
import { createSchemas } from "../src/schemas"

const { articleSchema } = createSchemas({
	site: "https://indie.pub",
})

const defaults = suite("defaults")
defaults("schema defaults", () => {
	const article = articleSchema.parse({
		name: "test article",
	})

	assert.ok(article, "only name is required")
	assert.ok(article.category, "category is always defined")
	assert.is(article.category.length, 0, "category is empty")
})

defaults.run()

const published = suite("published")

published("converts strings to Dates", () => {
	const article = articleSchema.parse({
		name: "test article",
		published: "2020-01-01T00:00:00Z",
	})

	assert.ok(article.published, "is defined")
	assert.instance(article.published, Date, "is a Date")
})

published("accepts Date objects", () => {
	const date = new Date(2023, 1, 29)

	const article = articleSchema.parse({
		name: "test article",
		published: date,
	})

	assert.ok(article.published, "is defined")
	assert.equal(article.published, date, "is same date")
})

published("errors on invalid strings", () => {
	assert.throws(
		() => {
			articleSchema.parse({
				name: "test article",
				published: "not a date",
			})
		},
		(error) =>
			error instanceof ZodError &&
			error.errors.length === 1 &&
			error.errors[0].message === "Invalid datetime",
	)
})

published.run()
