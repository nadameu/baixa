import { multiplicarAnteriores } from './multiplicarAnteriores';

test('multiplicarAnteriores', () => {
	expect(multiplicarAnteriores([])).toEqual([]);
	expect(multiplicarAnteriores([45])).toEqual([1]);
	expect(multiplicarAnteriores([2, 3])).toEqual([1, 2]);
	expect(multiplicarAnteriores([2, 3, 5])).toEqual([1, 2, 6]);
	expect(multiplicarAnteriores([2, 3, 5, 7])).toEqual([1, 2, 6, 30]);
});
