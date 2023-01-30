module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ["plugin:@typescript-eslint/recommended"],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.eslint.json",
	},
	plugins: ["@typescript-eslint", "prettier"],
	rules: {
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/array-type": ["error", { default: "array-simple" }],
		"@typescript-eslint/consistent-type-definitions": ["error", "type"],
		"@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
		"@typescript-eslint/no-floating-promises": "warn",
		"@typescript-eslint/no-redeclare": "warn",
		"no-console": ["error", { allow: ["warn", "error", "info"] }],
		"no-useless-rename": "error",
		"object-shorthand": "error",
	},
}
