import { JSDOM } from 'jsdom';
import { LinkedList } from './LinkedList';
import { G, Grupo } from './Grupo';
import { Gs, Grupos } from './Grupos';

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

	const grupoW = G.fromIds(['w-zero', 'w-um', 'w-dois'], document) as Grupo;
	const grupoX = G.fromIds(['x-zero'], document) as Grupo;
	const grupoY = G.fromIds(['y-zero', 'y-tres', 'y-seis'], document) as Grupo;
	const grupoZ = G.fromIds(['z-zero', 'z-nove'], document) as Grupo;
	const grupos = Gs.fromArray([grupoW, grupoX, grupoY, grupoZ]) as Grupos;

	const linkedList = new LinkedList(grupos);
	grupos.forEach(grupo =>
		grupo.forEach(elemento => {
			// Garante que os valores corretos sejam selecionados mesmo sem as regras
			// impostas pelo DOM
			elemento.name = '';
		})
	);
	expect(linkedList.maximo).toBe(17);

	const idsSelecionados = () =>
		bind(grupos, grupo =>
			grupo.filter(({ checked }) => checked).map(({ id }) => id)
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

function bind<a, b>(xs: a[], f: (_: a) => b[]): b[] {
	return xs.reduce((ys: b[], x) => ys.concat(f(x)), []);
}
