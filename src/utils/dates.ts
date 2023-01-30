import { z } from "zod"

export function safeDate(message: string) {
	return z
		.date()
		.or(
			z
				.string()
				.datetime()
				.describe(message)
				.transform((value) => new Date(value)),
		)
		.describe(message)
}
