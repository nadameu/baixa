import { NEA } from '.';

test('Vazio', () => {
	expect(NEA.fromArray([])).toEqual(null);
});

test('Não vazio', () => {
	expect(NEA.fromArray([1])).toEqual([1]);
	expect(NEA.fromArray([1, 2])).toEqual([1, 2]);
	expect(NEA.fromArray([1, 2, 3])).toEqual([1, 2, 3]);
});
