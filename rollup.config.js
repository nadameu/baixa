import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import { string } from 'rollup-plugin-string';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import { generateBanner } from './generateBanner';
import pkg from './package.json';

const IS_SERVE = process.env.BUILD === 'serve';

export default {
	input: './src/index.ts',

	external: [],

	plugins: [
		resolve(),

		typescript(),

		terser({
			ecma: 8,
			module: true,
			toplevel: true,
			compress: {
				passes: 5,
				sequences: false,
				unsafe: true,
				unsafe_arrows: true,
				unsafe_methods: true,
			},
			mangle: false,
			output: {
				beautify: true,
				preamble: generateBanner(),
			},
		}),

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
			file: path.resolve(__dirname, 'dist', `${pkg.name}.user.js`),
			format: 'es',
			preferConst: true,
		},
	],
};
