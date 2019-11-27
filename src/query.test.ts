import { query } from './query';

test('Elemento existente', () => {
	document.body.innerHTML = '<div id="elem"></div>';
	const el = query('#elem');
	expect(el).toEqual(document.getElementById('elem'));
});

test('Elemento inexistente', () => {
	document.body.innerHTML = '';
	expect(() => query('#elem')).toThrow();
});
