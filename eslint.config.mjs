import react from 'eslint-plugin-react'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

export default [
	...compat.extends(
		'plugin:react/recommended',
		'airbnb',
		'airbnb-typescript',
		'prettier',
	),
	{
		plugins: {
			react,
			'@typescript-eslint': typescriptEslint,
			prettier,
		},

		languageOptions: {
			globals: {
				...globals.browser,
			},

			parser: tsParser,
			ecmaVersion: 12,
			sourceType: 'module',

			parserOptions: {
				project: ['**/tsconfig.json'],

				ecmaFeatures: {
					jsx: true,
				},
			},
		},

		rules: {
			'linebreak-style': 0,
			'object-shorthand': 0,
			'arrow-body-style': 0,

			'no-param-reassign': [
				2,
				{
					props: false,
				},
			],

			'import/extensions': [
				'error',
				'ignorePackages',
				{
					js: 'never',
					jsx: 'never',
					ts: 'never',
					tsx: 'never',
					mjs: 'never',
				},
			],

			'no-use-before-define': 'off',
			'@typescript-eslint/no-use-before-define': [
				'error',
			],
			indent: ['error'],
			'no-tabs': 0,
			'react/jsx-filename-extension': 'off',
			'react/jsx-props-no-spreading': 'off',
			'import/prefer-default-export': 'warn',

			'no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
				},
			],

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
				},
			],

			'dot-notation': 0,
			'@typescript-eslint/dot-notation': 0,
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'jsx-a11y/click-events-have-key-events': 'off',
			'jsx-a11y/no-static-element-interactions':
				'off',
			'prefer-destructuring': 'off',
		},
	},
]
