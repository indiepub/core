<div align="center">
  <a href="https://npmjs.org/package/@indiepub/core">
    <img src="https://badgen.now.sh/npm/v/@indiepub/core" alt="version" />
  </a>
  <a href="https://github.com/indiepub/core/actions">
    <img src="https://github.com/indiepub/core/workflows/Release/badge.svg" alt="CI" />
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="code style: prettier">
  </a>
  <a href="https://github.com/eslint/eslint">
    <img src="https://img.shields.io/badge/code_style-eslint-4b32c3.svg?style=flat-square" alt="code style: eslint">
  </a>
</div>

# @indiepub/core

> :caution: This project just launched and is under active development. Don't let the 1.0 version number fool you, the API may change quickly in future minor/major releases!

## IndieWeb

You should own your own content - whether you write articles for a living, livestream on Twitch, or just want to post pictures of your cat. We already have all the tools we need to build the [IndieWeb](https://indieweb.org), now for the hard part of making all those specs easier to use.

## Using schemas

Schemas use [zod](https://zod.dev/) for TypeScript-first schema validation and static type inference.

What the hell does that mean? Runtime checks to make sure your `Note` is actually a `Note`!

### Usage

```ts
import { createSchemas } from "@indiepub/core"

const { articleSchema, bookmarkSchema, noteSchema, personSchema, photoSchema } = createSchemas()

const article = articleSchema.parse({
	name: "My awesome post",
	published: "2023-01-29T00:00:00Z",
	category: ["blog", "random"],
})

// name is required on articles, this will error!
const article2 = articleSchema.parse({
	published: "2023-01-29T00:00:00Z",
})
```

## How to contribute

### Questions, feedback, and suggestions

If you have any questions, feedback, or suggestions head over to the [discussions page](https://github.com/indiepub/core/discussions).

### Bugs

If you find a bug please open an [issue](https://github.com/indiepub/core/issues). Community pull requests to fix the issue are always appreciated!
