import { NEArray } from '.';

test('Vazio', () => {
	expect(NEArray.fromArray([])).toBeNull();
});

test('Não vazio', () => {
	expect(NEArray.fromArray([1])).toEqual([1]);
	expect(NEArray.fromArray([1, 2])).toEqual([1, 2]);
	expect(NEArray.fromArray([1, 2, 3])).toEqual([1, 2, 3]);
});
