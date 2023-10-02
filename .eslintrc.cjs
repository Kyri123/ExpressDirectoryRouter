/* eslint-disable no-undef */
module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'unused-imports', 'prettier'],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': 'off',
		'no-case-declarations': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'no-empty': 'off',
		'no-empty-pattern': 'off',
		'@typescript-eslint/consistent-type-imports': 'error',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				jsxSingleQuote: true,
				proseWrap: 'never',
				quoteProps: 'consistent',
				vueIndentScriptAndStyle: true,
				singleQuote: true,
				trailingComma: 'none',
				useTabs: true,
				bracketSameLine: true,
				bracketSpacing: true,
				insertPragma: false,
				tabWidth: 4,
				printWidth: 150
			}
		],
		'arrow-body-style': ['warn', 'always'],
		'prefer-arrow-callback': 'warn',
		'no-console': ['warn', { allow: ['warn', 'info', 'error'] }],
		'@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off'
	}
};
