import { expect, test } from 'vitest';
import { ControladorDigitos } from './ControladorDigitos';
import { Digito } from './Digito';
import { Nat } from './Nat';

const [zero, um, dois, tres, quatro, cinco, seis, sete, oito, nove] =
	Array.from({ length: 10 }, (_, i) => Digito.fromNumber(i)!);

test('maximo 0', () => {
	const buffer = ControladorDigitos(Nat.fromNumber(0)!);
	expect(buffer.pushDígito(zero)).toBe(0);
	expect(buffer.pushDígito(um)).toBe(0);
	expect(buffer.pushDígito(nove)).toBe(0);
	expect(buffer.pushDígito(zero)).toBe(0);
});

test('maximo 1', () => {
	const buffer = ControladorDigitos(Nat.fromNumber(1)!);
	expect(buffer.pushDígito(zero)).toBe(0);
	expect(buffer.pushDígito(um)).toBe(1);
	expect(buffer.pushDígito(um)).toBe(1);
	expect(buffer.pushDígito(zero)).toBe(0);
	expect(buffer.pushDígito(dois)).toBe(0);
	expect(buffer.pushDígito(nove)).toBe(0);
});

test('maximo 2', () => {
	const buffer = ControladorDigitos(Nat.fromNumber(2)!);
	expect(buffer.pushDígito(zero)).toBe(0);
	expect(buffer.pushDígito(um)).toBe(1);
	expect(buffer.pushDígito(dois)).toBe(2);
	expect(buffer.pushDígito(tres)).toBe(0);
	expect(buffer.pushDígito(nove)).toBe(0);
});

test('maximo 10', () => {
	const buffer = ControladorDigitos(Nat.fromNumber(10)!);
	expect(buffer.pushDígito(zero)).toBe(0);
	expect(buffer.pushDígito(um)).toBe(1);
	expect(buffer.pushDígito(zero)).toBe(10);
	expect(buffer.pushDígito(um)).toBe(1);
	expect(buffer.pushDígito(dois)).toBe(2);
	expect(buffer.pushDígito(nove)).toBe(9);
});

test('maximo 16', () => {
	const buffer = ControladorDigitos(Nat.fromNumber(16)!);
	expect(buffer.pushDígito(um)).toBe(1);
	expect(buffer.pushDígito(seis)).toBe(16);
	expect(buffer.pushDígito(um)).toBe(1);
	expect(buffer.pushDígito(sete)).toBe(7);
});

test('maximo 99', () => {
	const buffer = ControladorDigitos(Nat.fromNumber(99)!);
	expect(buffer.pushDígito(quatro)).toBe(4);
	expect(buffer.pushDígito(nove)).toBe(49);
	expect(buffer.pushDígito(cinco)).toBe(95);
	expect(buffer.pushDígito(oito)).toBe(58);
	expect(buffer.pushDígito(tres)).toBe(83);
	expect(buffer.pushDígito(dois)).toBe(32);
});
