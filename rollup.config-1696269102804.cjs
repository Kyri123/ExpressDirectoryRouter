'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjs = require('@rollup/plugin-commonjs');
var resolvePlugin = require('@rollup/plugin-node-resolve');
var terser = require('@rollup/plugin-terser');
var rollupPluginTypescriptPaths = require('rollup-plugin-typescript-paths');
var typescript2 = require('rollup-plugin-typescript2');

/* eslint-disable no-undef */

const external = () => {
	const pkg = require('./package.json');
	return Object.keys(pkg.dependencies)
		.concat(Object.keys(pkg.devDependencies))
		.concat([/^fs/, /^@siemens/, /^lodash/]);
};

var rollup_config = [
	{
		input: 'src/index.ts',
		output: [
			{
				preserveModules: true,
				preserveModulesRoot: 'src',
				dir: 'dist/cjs',
				format: 'cjs',
				sourcemap: true
			},
			{
				preserveModules: true,
				preserveModulesRoot: 'src',
				dir: 'dist/esm',
				format: 'es',
				sourcemap: true
			}
		],
		external: external(),
		plugins: [
			resolvePlugin(),
			rollupPluginTypescriptPaths.typescriptPaths(),
			typescript2({
				tsconfig: 'tsconfig.build.json'
			}),
			commonjs(),
			terser()
		]
	}
];

exports.default = rollup_config;
