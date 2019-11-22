import { D } from '.';

test('fromNumber', () => {
	// Válidos
	expect(D.fromNumber(0)).toEqual(0);
	expect(D.fromNumber(1)).toEqual(1);
	expect(D.fromNumber(2)).toEqual(2);
	expect(D.fromNumber(3)).toEqual(3);
	expect(D.fromNumber(4)).toEqual(4);
	expect(D.fromNumber(5)).toEqual(5);
	expect(D.fromNumber(6)).toEqual(6);
	expect(D.fromNumber(7)).toEqual(7);
	expect(D.fromNumber(8)).toEqual(8);
	expect(D.fromNumber(9)).toEqual(9);

	// Inválidos
	expect(D.fromNumber(10)).toBeNull();
	expect(D.fromNumber(-1)).toBeNull();
	expect(D.fromNumber(3.1)).toBeNull();
	expect(D.fromNumber(0.4)).toBeNull();
	expect(D.fromNumber(NaN)).toBeNull();
	expect(D.fromNumber(Infinity)).toBeNull();
});

test('fromString', () => {
	// Válidos
	expect(D.fromString('0')).toEqual(0);
	expect(D.fromString('1')).toEqual(1);
	expect(D.fromString('2')).toEqual(2);
	expect(D.fromString('3')).toEqual(3);
	expect(D.fromString('4')).toEqual(4);
	expect(D.fromString('5')).toEqual(5);
	expect(D.fromString('6')).toEqual(6);
	expect(D.fromString('7')).toEqual(7);
	expect(D.fromString('8')).toEqual(8);
	expect(D.fromString('9')).toEqual(9);

	// Inválidos
	expect(D.fromString('.')).toBeNull();
	expect(D.fromString(',')).toBeNull();
	expect(D.fromString('-')).toBeNull();
	expect(D.fromString('e')).toBeNull();
	expect(D.fromString('x')).toBeNull();
	expect(D.fromString('b')).toBeNull();
	expect(D.fromString('o')).toBeNull();
	expect(D.fromString('Z')).toBeNull();
	expect(D.fromString('#')).toBeNull();
});
