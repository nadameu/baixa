import { LinkedList } from './LinkedList';
import { JSDOM } from 'jsdom';
import { makeElementos } from './Elementos';
import { Link } from './Link';

describe('Valores inválidos', () => {
	const { window } = new JSDOM(`<!doctype html><html><head></head><body>
		<input id="x-zero" name="grupo-x" type="radio" />
		<input id="x-um" name="grupo-x" type="radio" />
		<input id="sem-grupo" type="radio" />
	</body></html>`);
	const { document } = window;
	const Elementos = makeElementos(document);
	const [x0, x1, semGrupo] = Elementos.fromIds(['x-zero', 'x-um', 'sem-grupo']);

	test('Não é array', () => {
		expect(() => new LinkedList(null as any)).toThrow();
	});

	test('Array vazio', () => {
		expect(() => new LinkedList([])).toThrow();
	});

	test('Grupo não é array', () => {
		expect(() => new LinkedList([null as any])).toThrow();
	});

	test('Grupo vazio', () => {
		expect(() => new LinkedList([[]])).toThrow();
	});

	test('Grupo não contém elemento', () => {
		expect(() => new LinkedList([[null as any]])).toThrow();
	});

	test('Elementos repetidos', () => {
		expect(() => new LinkedList([[x0, x0]])).toThrow();
	});

	test('Elemento sem atributo "name"', () => {
		expect(() => new LinkedList([[semGrupo]])).toThrow();
	});

	test('Elementos com mesmo atributo "name" em grupos diferentes', () => {
		expect(() => new LinkedList([[x0], [x1]])).toThrow();
	});
});

test('LinkedList', () => {
	const { window } = new JSDOM(`<!doctype html><html><head></head><body>
		<input id="w-zero" name="grupo-w" type="radio" />
		<input id="w-um" name="grupo-w" type="radio" />
		<input id="w-dois" name="grupo-w" type="radio" />

		<input id="x-zero" name="grupo-x" type="radio" />

		<input id="y-zero" name="grupo-y" type="radio" />
		<input id="y-tres" name="grupo-y" type="radio" />
		<input id="y-seis" name="grupo-y" type="radio" />

		<input id="z-zero" name="grupo-z" type="radio" />
		<input id="z-nove" name="grupo-z" type="radio" />
	</body></html>`);
	const { document } = window;
	const Elementos = makeElementos(document);
	const grupoW = Elementos.fromIds(['w-zero', 'w-um', 'w-dois']);
	const grupoX = Elementos.fromIds(['x-zero']);
	const grupoY = Elementos.fromIds(['y-zero', 'y-tres', 'y-seis']);
	const grupoZ = Elementos.fromIds(['z-zero', 'z-nove']);
	const grupos = [grupoW, grupoX, grupoY, grupoZ];
	const linkedList = new LinkedList(grupos);
	grupos.forEach(grupo =>
		grupo.forEach(elemento => {
			elemento.elemento.name = '';
		})
	);
	expect(linkedList.maximo).toBe(17);

	const idsSelecionados = () =>
		grupos.reduce(
			(acc: string[], grupo) =>
				acc.concat(
					grupo
						.map(elt => elt.elemento)
						.filter(elemento => elemento.checked)
						.map(elt => elt.id)
				),
			[]
		);

	linkedList.valor = 0;
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-zero', 'z-zero']);

	linkedList.valor = 1;
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-zero', 'z-zero']);

	linkedList.valor = 2;
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-zero', 'z-zero']);

	linkedList.valor = 3;
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-tres', 'z-zero']);

	linkedList.valor = 4;
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-tres', 'z-zero']);

	linkedList.valor = 5;
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-tres', 'z-zero']);

	linkedList.valor = 6;
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-seis', 'z-zero']);

	linkedList.valor = 7;
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-seis', 'z-zero']);

	linkedList.valor = 8;
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-seis', 'z-zero']);

	linkedList.valor = 9;
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-zero', 'z-nove']);

	linkedList.valor = 10;
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-zero', 'z-nove']);

	linkedList.valor = 11;
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-zero', 'z-nove']);

	linkedList.valor = 12;
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-tres', 'z-nove']);

	linkedList.valor = 13;
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-tres', 'z-nove']);

	linkedList.valor = 14;
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-tres', 'z-nove']);

	linkedList.valor = 15;
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-seis', 'z-nove']);

	linkedList.valor = 16;
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-seis', 'z-nove']);

	linkedList.valor = 17;
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-seis', 'z-nove']);

	expect(() => {
		linkedList.valor = 18;
	}).toThrow();
});
