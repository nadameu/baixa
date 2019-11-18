export function multiplicarAnteriores(xs: number[]): number[] {
	return xs.map((_, i) => (i === 0 ? 1 : produto(xs.slice(0, i))));
}

function produto(xs: number[]) {
	return xs.reduce((a, b) => a * b, 1);
}
