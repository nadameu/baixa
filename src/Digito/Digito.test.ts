import { Digito } from '.';

test('fromNumber', () => {
	// Válidos
	expect(Digito.fromNumber(0)).toEqual(0);
	expect(Digito.fromNumber(1)).toEqual(1);
	expect(Digito.fromNumber(2)).toEqual(2);
	expect(Digito.fromNumber(3)).toEqual(3);
	expect(Digito.fromNumber(4)).toEqual(4);
	expect(Digito.fromNumber(5)).toEqual(5);
	expect(Digito.fromNumber(6)).toEqual(6);
	expect(Digito.fromNumber(7)).toEqual(7);
	expect(Digito.fromNumber(8)).toEqual(8);
	expect(Digito.fromNumber(9)).toEqual(9);

	// Inválidos
	expect(Digito.fromNumber(10)).toBeNull();
	expect(Digito.fromNumber(-1)).toBeNull();
	expect(Digito.fromNumber(3.1)).toBeNull();
	expect(Digito.fromNumber(0.4)).toBeNull();
	expect(Digito.fromNumber(NaN)).toBeNull();
	expect(Digito.fromNumber(Infinity)).toBeNull();
});

test('fromString', () => {
	// Válidos
	expect(Digito.fromString('0')).toEqual(0);
	expect(Digito.fromString('1')).toEqual(1);
	expect(Digito.fromString('2')).toEqual(2);
	expect(Digito.fromString('3')).toEqual(3);
	expect(Digito.fromString('4')).toEqual(4);
	expect(Digito.fromString('5')).toEqual(5);
	expect(Digito.fromString('6')).toEqual(6);
	expect(Digito.fromString('7')).toEqual(7);
	expect(Digito.fromString('8')).toEqual(8);
	expect(Digito.fromString('9')).toEqual(9);

	// Inválidos
	expect(Digito.fromString('.')).toBeNull();
	expect(Digito.fromString(',')).toBeNull();
	expect(Digito.fromString('-')).toBeNull();
	expect(Digito.fromString('e')).toBeNull();
	expect(Digito.fromString('x')).toBeNull();
	expect(Digito.fromString('b')).toBeNull();
	expect(Digito.fromString('o')).toBeNull();
	expect(Digito.fromString('Z')).toBeNull();
	expect(Digito.fromString('#')).toBeNull();
});
