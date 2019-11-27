import { Grupo } from './Grupo';
import { Grupos } from './Grupos';
import { Selecionador } from './Selecionador';
import { Nat } from './Nat';

test('Selecionador', () => {
	document.body.innerHTML = `
<input id="w-zero" name="grupo-w" type="radio" />
<input id="w-um" name="grupo-w" type="radio" />
<input id="w-dois" name="grupo-w" type="radio" />

<input id="x-zero" name="grupo-x" type="radio" />

<input id="y-zero" name="grupo-y" type="radio" />
<input id="y-tres" name="grupo-y" type="radio" />
<input id="y-seis" name="grupo-y" type="radio" />

<input id="z-zero" name="grupo-z" type="radio" />
<input id="z-nove" name="grupo-z" type="radio" />
`;

	const grupoW = Grupo.fromIds(['w-zero', 'w-um', 'w-dois']) as Grupo;
	const grupoX = Grupo.fromIds(['x-zero']) as Grupo;
	const grupoY = Grupo.fromIds(['y-zero', 'y-tres', 'y-seis']) as Grupo;
	const grupoZ = Grupo.fromIds(['z-zero', 'z-nove']) as Grupo;
	const grupos = Grupos.fromArray([grupoW, grupoX, grupoY, grupoZ]) as Grupos;

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

	linkedList.setValor(Nat.fromNumber(0)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-zero', 'z-zero']);

	linkedList.setValor(Nat.fromNumber(1)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-zero', 'z-zero']);

	linkedList.setValor(Nat.fromNumber(2)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-zero', 'z-zero']);

	linkedList.setValor(Nat.fromNumber(3)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-tres', 'z-zero']);

	linkedList.setValor(Nat.fromNumber(4)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-tres', 'z-zero']);

	linkedList.setValor(Nat.fromNumber(5)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-tres', 'z-zero']);

	linkedList.setValor(Nat.fromNumber(6)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-seis', 'z-zero']);

	linkedList.setValor(Nat.fromNumber(7)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-seis', 'z-zero']);

	linkedList.setValor(Nat.fromNumber(8)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-seis', 'z-zero']);

	linkedList.setValor(Nat.fromNumber(9)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-zero', 'z-nove']);

	linkedList.setValor(Nat.fromNumber(10)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-zero', 'z-nove']);

	linkedList.setValor(Nat.fromNumber(11)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-zero', 'z-nove']);

	linkedList.setValor(Nat.fromNumber(12)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-tres', 'z-nove']);

	linkedList.setValor(Nat.fromNumber(13)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-tres', 'z-nove']);

	linkedList.setValor(Nat.fromNumber(14)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-tres', 'z-nove']);

	linkedList.setValor(Nat.fromNumber(15)!);
	expect(idsSelecionados()).toEqual(['w-zero', 'x-zero', 'y-seis', 'z-nove']);

	linkedList.setValor(Nat.fromNumber(16)!);
	expect(idsSelecionados()).toEqual(['w-um', 'x-zero', 'y-seis', 'z-nove']);

	linkedList.setValor(Nat.fromNumber(17)!);
	expect(idsSelecionados()).toEqual(['w-dois', 'x-zero', 'y-seis', 'z-nove']);

	expect(() => {
		linkedList.setValor(Nat.fromNumber(18)!);
	}).toThrow();
});

function bind<a, b>(xs: a[], f: (_: a) => b[]): b[] {
	return xs.reduce((ys: b[], x) => ys.concat(f(x)), []);
}
