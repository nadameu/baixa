import { JSDOM } from 'jsdom';
import { makeElementos } from './Elementos';

declare global {
	var document: HTMLDocument;
}

test('Elementos', () => {
	const { window } = new JSDOM(
		`<!doctype html><html><head></head><body>
			<input id="ok" type="radio" />
			<input id="nao-eh-radio" type="text" />
			<input id="ok-tambem" type="radio" />
			<p id="nao-eh-input"></p>
		</body></html>`
	);
	const { document } = window;
	const Elementos = makeElementos(document);
	const elementos = Elementos.fromIds([
		'ok',
		'nao-eh-radio',
		'ok-tambem',
		'nao-eh-input',
		'id-inexistente',
	]);
	expect(elementos).toHaveLength(2);
	expect(elementos[0].elemento).toEqual(document.getElementById('ok'));
	expect(elementos[1].elemento).toEqual(document.getElementById('ok-tambem'));
});
