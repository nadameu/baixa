import { N } from '.';

test('fromNumber', () => {
	// Válidos
	expect(N.fromNumber(0)).toEqual(0);
	expect(N.fromNumber(1)).toEqual(1);
	expect(N.fromNumber(80)).toEqual(80);

	// Inválidos
	expect(N.fromNumber(0.5)).toBeNull();
	expect(N.fromNumber(-1)).toBeNull();
	expect(N.fromNumber(4.3)).toBeNull();
	expect(N.fromNumber(Infinity)).toBeNull();
	expect(N.fromNumber(NaN)).toBeNull();
});
