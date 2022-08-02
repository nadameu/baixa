import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import { string } from 'rollup-plugin-string';
import typescript from '@rollup/plugin-typescript';
import { generateBanner } from './generateBanner';
import pkg from './package.json';

const IS_SERVE = process.env.BUILD === 'serve';

/** @type {import('rollup').RollupOptions} */
const config = {
	input: './src/index.ts',

	external: [],

	plugins: [
		resolve(),

		typescript({ module: 'esnext' }),

		string({
			include: ['**/*.html', '**/*.css'],
		}),

		IS_SERVE &&
			serve({
				open: true,
				openPage: `/${pkg.name}.user.js`,
				contentBase: 'dist',
			}),
	],

	inlineDynamicImports: true,

	output: [
		{
			banner: generateBanner(),
			file: path.resolve(__dirname, 'dist', `${pkg.name}.user.js`),
			format: 'es',
			preferConst: true,
		},
	],
};

export default config;
