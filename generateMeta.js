import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { generateBanner } from './generateBanner';
import { name } from './package.json';

writeFileSync(resolve(__dirname, 'dist', `${name}.meta.js`), generateBanner());
