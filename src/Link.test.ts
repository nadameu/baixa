import { Link } from './Link';
import { JSDOM } from 'jsdom';
import { makeElementos } from './Elementos';

describe('Link', () => {
	const { window } = new JSDOM(`<!doctype html><html><head></head><body>
		<input id="ok" type="radio" />
		<input id="ok-tambem" type="radio" />
	</body></html>`);
	const { document } = window;
	const Elementos = makeElementos(document);
	const elementos = Elementos.fromIds(['ok', 'ok-tambem']);

	test('0', () => {
		const link = new Link(0, elementos);

		link.analisarValor(0);
		expect(elementos[0].elemento.checked).toBe(true);
		expect(elementos[1].elemento.checked).toBe(true);

		link.analisarValor(1);
		expect(elementos[0].elemento.checked).toBe(true);
		expect(elementos[1].elemento.checked).toBe(true);

		link.analisarValor(2);
		expect(elementos[0].elemento.checked).toBe(true);
		expect(elementos[1].elemento.checked).toBe(true);

		link.analisarValor(3);
		expect(elementos[0].elemento.checked).toBe(true);
		expect(elementos[1].elemento.checked).toBe(true);
	});

	test('1', () => {
		const link = new Link(1, elementos);

		link.analisarValor(0);
		expect(elementos[0].elemento.checked).toBe(false);
		expect(elementos[1].elemento.checked).toBe(false);

		link.analisarValor(1);
		expect(elementos[0].elemento.checked).toBe(true);
		expect(elementos[1].elemento.checked).toBe(true);

		link.analisarValor(2);
		expect(elementos[0].elemento.checked).toBe(false);
		expect(elementos[1].elemento.checked).toBe(false);

		link.analisarValor(3);
		expect(elementos[0].elemento.checked).toBe(true);
		expect(elementos[1].elemento.checked).toBe(true);
	});

	test('2', () => {
		const link = new Link(2, elementos);

		link.analisarValor(0);
		expect(elementos[0].elemento.checked).toBe(false);
		expect(elementos[1].elemento.checked).toBe(false);

		link.analisarValor(1);
		expect(elementos[0].elemento.checked).toBe(false);
		expect(elementos[1].elemento.checked).toBe(false);

		link.analisarValor(2);
		expect(elementos[0].elemento.checked).toBe(true);
		expect(elementos[1].elemento.checked).toBe(true);

		link.analisarValor(3);
		expect(elementos[0].elemento.checked).toBe(true);
		expect(elementos[1].elemento.checked).toBe(true);

		link.analisarValor(4);
		expect(elementos[0].elemento.checked).toBe(false);
		expect(elementos[1].elemento.checked).toBe(false);
	});
});
