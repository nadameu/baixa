import { Buffer } from './Buffer';

test('maximo 0', () => {
	const buffer = new Buffer(0);
	expect(buffer.pushDígito('0')).toBe(0);
	expect(buffer.pushDígito('1')).toBe(null);
	expect(buffer.pushDígito('9')).toBe(null);
	expect(buffer.pushDígito('0')).toBe(0);
});

test('maximo 1', () => {
	const buffer = new Buffer(1);
	expect(buffer.pushDígito('0')).toBe(0);
	expect(buffer.pushDígito('1')).toBe(1);
	expect(buffer.pushDígito('1')).toBe(1);
	expect(buffer.pushDígito('0')).toBe(0);
	expect(buffer.pushDígito('2')).toBe(null);
	expect(buffer.pushDígito('9')).toBe(null);
});

test('maximo 2', () => {
	const buffer = new Buffer(2);
	expect(buffer.pushDígito('0')).toBe(0);
	expect(buffer.pushDígito('1')).toBe(1);
	expect(buffer.pushDígito('2')).toBe(2);
	expect(buffer.pushDígito('3')).toBe(null);
	expect(buffer.pushDígito('9')).toBe(null);
});

test('maximo 10', () => {
	const buffer = new Buffer(10);
	expect(buffer.pushDígito('0')).toBe(0);
	expect(buffer.pushDígito('1')).toBe(1);
	expect(buffer.pushDígito('0')).toBe(10);
	expect(buffer.pushDígito('1')).toBe(1);
	expect(buffer.pushDígito('2')).toBe(2);
	expect(buffer.pushDígito('9')).toBe(9);
});

test('maximo 16', () => {
	const buffer = new Buffer(16);
	expect(buffer.pushDígito('1')).toBe(1);
	expect(buffer.pushDígito('6')).toBe(16);
	expect(buffer.pushDígito('1')).toBe(1);
	expect(buffer.pushDígito('7')).toBe(7);
});

test('maximo 99', () => {
	const buffer = new Buffer(99);
	expect(buffer.pushDígito('4')).toBe(4);
	expect(buffer.pushDígito('9')).toBe(49);
	expect(buffer.pushDígito('3')).toBe(93);
	expect(buffer.pushDígito('2')).toBe(32);
});
