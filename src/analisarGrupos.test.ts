import { analisarGrupos } from './analisarGrupos';

test('teste 1', () => {
	const elementos = [
		['condenacao-na', 'condenacao-sim', 'condenacao-nao'],
		['honorarios-na', 'honorarios-sim', 'honorarios-nao'],
		['apensos-nao', 'apensos-sim'],
	];
	expect(analisarGrupos(elementos)).toEqual({
		maximo: 17,
		grupos: [
			[
				{ valor: 0, elemento: 'condenacao-na' },
				{ valor: 1, elemento: 'condenacao-sim' },
				{ valor: 2, elemento: 'condenacao-nao' },
			],

			[
				{ valor: 0, elemento: 'honorarios-na' },
				{ valor: 3, elemento: 'honorarios-sim' },
				{ valor: 6, elemento: 'honorarios-nao' },
			],

			[
				{ valor: 0, elemento: 'apensos-nao' },
				{ valor: 9, elemento: 'apensos-sim' },
			],
		],
	});
});

test('teste 2', () => {
	const elementos = [
		['a-na', 'a-sim', 'a-nao', 'a-talvez'],
		['b-na', 'b-sim', 'b-nao', 'b-talvez'],
		['c-nao', 'c-sim'],
		['d-na', 'd-sim', 'd-nao'],
	];
	expect(analisarGrupos(elementos)).toEqual({
		maximo: 95,
		grupos: [
			[
				{ valor: 0, elemento: 'a-na' },
				{ valor: 1, elemento: 'a-sim' },
				{ valor: 2, elemento: 'a-nao' },
				{ valor: 3, elemento: 'a-talvez' },
			],

			[
				{ valor: 0, elemento: 'b-na' },
				{ valor: 4, elemento: 'b-sim' },
				{ valor: 8, elemento: 'b-nao' },
				{ valor: 12, elemento: 'b-talvez' },
			],

			[
				{ valor: 0, elemento: 'c-nao' },
				{ valor: 16, elemento: 'c-sim' },
			],

			[
				{ valor: 0, elemento: 'd-na' },
				{ valor: 32, elemento: 'd-sim' },
				{ valor: 64, elemento: 'd-nao' },
			],
		],
	});
});

test('teste 3', () => {
	const elementos = [
		['a-w'],
		['b-w', 'b-x'],
		['c-w'],
		['d-w', 'd-x', 'd-y', 'd-z'],
		['e-w'],
		['f-w', 'f-x', 'f-y'],
		['g-w'],
	];
	expect(analisarGrupos(elementos)).toEqual({
		maximo: 23,
		grupos: [
			[{ valor: 0, elemento: 'a-w' }],

			[
				{ valor: 0, elemento: 'b-w' },
				{ valor: 1, elemento: 'b-x' },
			],

			[{ valor: 0, elemento: 'c-w' }],

			[
				{ valor: 0, elemento: 'd-w' },
				{ valor: 2, elemento: 'd-x' },
				{ valor: 4, elemento: 'd-y' },
				{ valor: 6, elemento: 'd-z' },
			],

			[{ valor: 0, elemento: 'e-w' }],

			[
				{ valor: 0, elemento: 'f-w' },
				{ valor: 8, elemento: 'f-x' },
				{ valor: 16, elemento: 'f-y' },
			],

			[{ valor: 0, elemento: 'g-w' }],
		],
	});
});
