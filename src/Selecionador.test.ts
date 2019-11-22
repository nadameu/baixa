import { JSDOM } from 'jsdom';
import { G, Grupo } from './Grupo';
import { Grupos, Gs } from './Grupos';
import { Selecionador } from './Selecionador';
import { N } from './Nat';

test('Selecionador', () => {
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

	const linkedList = Selecionador(grupos);
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

	linkedList.setValor(N.fromNumber(0)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-zero', 'z-zero']);

	linkedList.setValor(N.fromNumber(1)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-zero', 'z-zero']);

	linkedList.setValor(N.fromNumber(2)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-zero', 'z-zero']);

	linkedList.setValor(N.fromNumber(3)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-tres', 'z-zero']);

	linkedList.setValor(N.fromNumber(4)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-tres', 'z-zero']);

	linkedList.setValor(N.fromNumber(5)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-tres', 'z-zero']);

	linkedList.setValor(N.fromNumber(6)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-seis', 'z-zero']);

	linkedList.setValor(N.fromNumber(7)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-seis', 'z-zero']);

	linkedList.setValor(N.fromNumber(8)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-seis', 'z-zero']);

	linkedList.setValor(N.fromNumber(9)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-zero', 'z-nove']);

	linkedList.setValor(N.fromNumber(10)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-zero', 'z-nove']);

	linkedList.setValor(N.fromNumber(11)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-zero', 'z-nove']);

	linkedList.setValor(N.fromNumber(12)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-tres', 'z-nove']);

	linkedList.setValor(N.fromNumber(13)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-tres', 'z-nove']);

	linkedList.setValor(N.fromNumber(14)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-tres', 'z-nove']);

	linkedList.setValor(N.fromNumber(15)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-seis', 'z-nove']);

	linkedList.setValor(N.fromNumber(16)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-seis', 'z-nove']);

	linkedList.setValor(N.fromNumber(17)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-seis', 'z-nove']);

	expect(() => {
		linkedList.setValor(N.fromNumber(18)!);
	}).toThrow();
});

function bind<a, b>(xs: a[], f: (_: a) => b[]): b[] {
	return xs.reduce((ys: b[], x) => ys.concat(f(x)), []);
}
