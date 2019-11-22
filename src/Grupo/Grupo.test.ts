import { JSDOM } from 'jsdom';
import { G } from '.';

describe('fromIds', () => {
	const { window } = new JSDOM(
		`<!doctype html><html><head></head><body>
			<input id="ok" type="radio" name="grupo-a" />
			<input id="nao-eh-radio" type="text" />
			<input id="ok-tambem" type="radio" name="grupo-b" />
			<p id="nao-eh-input"></p>
			<input id="mais-um-ok" type="radio" name="grupo-a" />
			</body></html>`
	);
	const { document } = window;

	test('Vazio', () => {
		expect(G.fromIds([], document)).toBeNull();
	});

	test('Um elemento inválido', () => {
		expect(G.fromIds(['nao-eh-input'], document)).toBeNull();
	});

	test('Ao menos um elemento inválido', () => {
		expect(
			G.fromIds(['ok', 'ok-tambem', 'mais-um-ok', 'nao-eh-radio'], document)
		).toBeNull();
	});

	test('Atributos "name" diferentes', () => {
		expect(G.fromIds(['ok', 'ok-tambem'], document)).toBeNull();
	});

	test('Um elemento válido', () => {
		expect(G.fromIds(['ok'], document)).toEqual([
			document.getElementById('ok'),
		]);
	});

	test('Mesmo atributo "name"', () => {
		const ids = ['ok', 'mais-um-ok'];
		expect(G.fromIds(ids, document)).toEqual(
			ids.map(id => document.getElementById(id)!)
		);
	});
});
