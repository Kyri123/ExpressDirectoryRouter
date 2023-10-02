/* eslint-disable no-undef */
import commonjs from '@rollup/plugin-commonjs';
import resolvePlugin from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import typescript2 from 'rollup-plugin-typescript2';

const external = () => {
	const pkg = require('./package.json');
	return Object.keys(pkg.dependencies)
		.concat(Object.keys(pkg.devDependencies))
		.concat([/^fs/, /^@siemens/, /^lodash/]);
};

export default [
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
			typescriptPaths(),
			typescript2({
				tsconfig: 'tsconfig.build.json'
			}),
			commonjs(),
			terser()
		]
	}
];
