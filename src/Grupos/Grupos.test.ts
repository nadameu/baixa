/**
 * @jest-environment jsdom
 */

import { Grupos } from '.';
import { Grupo, GrupoVazio } from '../Grupo';

describe('fromArray', () => {
	document.body.innerHTML = `
<input id="a-0" type="radio" name="grupo-a" value="0" />
<input id="a-1" type="radio" name="grupo-a" value="1" />
<input id="b-0" type="radio" name="grupo-b" value="0" />
<input id="b-1" type="radio" name="grupo-b" value="1" />
`;

	test('Vazio', () => {
		const vazio: Grupo[] = [];
		expect(Grupos.fromArray(vazio)).toEqual(vazio);
	});

	test('Elementos do mesmo grupo em índices diferentes do array', () => {
		const x = Grupo.fromIds(['a-0']);
		const y = Grupo.fromIds(['a-1']);
		const z = Grupos.fromArray([x, y].filter((x): x is Grupo => x !== null));
		expect(z).toBeNull();
	});

	test('Grupos válidos', () => {
		const a = Grupo.fromIds(['a-0', 'a-1']) as Grupo;
		const b = Grupo.fromIds(['b-0', 'b-1']) as Grupo;
		const grupos = [a, b];
		expect(Grupos.fromArray(grupos)).toEqual(grupos);
	});

	test('Um grupo vazio', () => {
		const vazio = Grupo.fromIds([]) as GrupoVazio;
		const b = Grupo.fromIds(['b-0', 'b-1']) as Grupo;
		const grupos = [vazio, b];
		expect(Grupos.fromArray(grupos)).toEqual(grupos.filter(g => g.length > 0));
	});
});
