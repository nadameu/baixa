import { Nat } from '.';

test('fromNumber', () => {
	// Válidos
	expect(Nat.fromNumber(0)).toEqual(0);
	expect(Nat.fromNumber(1)).toEqual(1);
	expect(Nat.fromNumber(80)).toEqual(80);

	// Inválidos
	expect(Nat.fromNumber(0.5)).toBeNull();
	expect(Nat.fromNumber(-1)).toBeNull();
	expect(Nat.fromNumber(4.3)).toBeNull();
	expect(Nat.fromNumber(Infinity)).toBeNull();
	expect(Nat.fromNumber(NaN)).toBeNull();
});
