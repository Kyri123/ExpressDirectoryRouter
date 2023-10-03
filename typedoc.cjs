/** @type {import('typedoc').TypeDocOptions} */

// eslint-disable-next-line no-undef
module.exports = {
	entryPoints: ['./src/index.ts'],
	out: 'doc',
	exclude: ['**/node_modules/**/*.*', '**/test/**/*.*', '**/dist/**/*.*'],
	plugin: ['typedoc-plugin-markdown'],
	tsconfig: './tsconfig.doc.json'
};
