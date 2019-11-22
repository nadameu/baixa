import { NEArray } from './defs';

export function fromArray<a>(array: a[]): NEArray<a> | null {
	if (array.length === 0) return null;
	return Object.freeze(array) as NEArray<a>;
}
