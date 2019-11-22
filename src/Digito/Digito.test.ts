import { D } from '.';

test('fromNumber', () => {
	// Válidos
	expect(D.fromNumber(0)).toEqual(new Number(0));
	expect(D.fromNumber(1)).toEqual(new Number(1));
	expect(D.fromNumber(2)).toEqual(new Number(2));
	expect(D.fromNumber(3)).toEqual(new Number(3));
	expect(D.fromNumber(4)).toEqual(new Number(4));
	expect(D.fromNumber(5)).toEqual(new Number(5));
	expect(D.fromNumber(6)).toEqual(new Number(6));
	expect(D.fromNumber(7)).toEqual(new Number(7));
	expect(D.fromNumber(8)).toEqual(new Number(8));
	expect(D.fromNumber(9)).toEqual(new Number(9));

	// Inválidos
	expect(D.fromNumber(10)).toEqual(null);
	expect(D.fromNumber(-1)).toEqual(null);
	expect(D.fromNumber(3.1)).toEqual(null);
	expect(D.fromNumber(0.4)).toEqual(null);
	expect(D.fromNumber(NaN)).toEqual(null);
	expect(D.fromNumber(Infinity)).toEqual(null);
});

test('fromString', () => {
	// Válidos
	expect(D.fromString('0')).toEqual(new Number(0));
	expect(D.fromString('1')).toEqual(new Number(1));
	expect(D.fromString('2')).toEqual(new Number(2));
	expect(D.fromString('3')).toEqual(new Number(3));
	expect(D.fromString('4')).toEqual(new Number(4));
	expect(D.fromString('5')).toEqual(new Number(5));
	expect(D.fromString('6')).toEqual(new Number(6));
	expect(D.fromString('7')).toEqual(new Number(7));
	expect(D.fromString('8')).toEqual(new Number(8));
	expect(D.fromString('9')).toEqual(new Number(9));

	// Inválidos
	expect(D.fromString('.')).toEqual(null);
	expect(D.fromString(',')).toEqual(null);
	expect(D.fromString('-')).toEqual(null);
	expect(D.fromString('e')).toEqual(null);
	expect(D.fromString('x')).toEqual(null);
	expect(D.fromString('b')).toEqual(null);
	expect(D.fromString('o')).toEqual(null);
	expect(D.fromString('Z')).toEqual(null);
	expect(D.fromString('#')).toEqual(null);
});
