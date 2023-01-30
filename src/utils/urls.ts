import { z } from "zod"

const URL_REGEX =
	/(http(s)?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/

function isUrl(value: string) {
	return URL_REGEX.test(value)
}

export function safeUrl(root: string | URL) {
	return z.string().transform((value: string) => {
		try {
			return isUrl(value) ? value : new URL(value, root).toString()
		} catch {
			return value
		}
	})
}
