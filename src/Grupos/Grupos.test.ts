import { JSDOM } from 'jsdom';
import { Gs } from '.';
import { G, Grupo, GrupoVazio } from '../Grupo';

describe('fromArray', () => {
	const { window } = new JSDOM(
		`<!doctype html><html><head></head><body>
			<input id="a-0" type="radio" name="grupo-a" value="0" />
			<input id="a-1" type="radio" name="grupo-a" value="1" />
			<input id="b-0" type="radio" name="grupo-b" value="0" />
			<input id="b-1" type="radio" name="grupo-b" value="1" />
			</body></html>`
	);
	const { document } = window;

	test('Vazio', () => {
		const vazio: Grupo[] = [];
		expect(Gs.fromArray(vazio)).toEqual(vazio);
	});

	test('Elementos do mesmo grupo em índices diferentes do array', () => {
		const x = G.fromIds(['a-0'], document);
		const y = G.fromIds(['a-1'], document);
		const z = Gs.fromArray([x, y].filter((x): x is Grupo => x !== null));
		expect(z).toBeNull();
	});

	test('Grupos válidos', () => {
		const a = G.fromIds(['a-0', 'a-1'], document) as Grupo;
		const b = G.fromIds(['b-0', 'b-1'], document) as Grupo;
		const grupos = [a, b];
		expect(Gs.fromArray(grupos)).toEqual(grupos);
	});

	test('Um grupo vazio', () => {
		const vazio = G.fromIds([], document) as GrupoVazio;
		const b = G.fromIds(['b-0', 'b-1'], document) as Grupo;
		const grupos = [vazio, b];
		expect(Gs.fromArray(grupos)).toEqual(grupos.filter(g => g.length > 0));
	});
});
