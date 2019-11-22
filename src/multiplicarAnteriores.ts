import { Nat } from './Nat';

export function multiplicarAnteriores(xs: Nat[]): Nat[];
export function multiplicarAnteriores(xs: number[]): number[];
export function multiplicarAnteriores(xs: number[]): number[] {
	return xs.map((_, i) => produto(xs.slice(0, i)));
}

function produto(xs: number[]) {
	return xs.reduce((a, b) => a * b, 1);
}
