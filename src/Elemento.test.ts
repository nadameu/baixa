import { JSDOM } from 'jsdom';
import { Elemento } from './Elemento';

test('Elemento', () => {
	const { window } = new JSDOM(
		`<!doctype html><html><head></head><body><input id="zero" type="radio"/></body></html>`
	);
	const { document } = window;
	const elemento = new Elemento(
		document.getElementById('zero') as HTMLInputElement
	);
	elemento.selecionado = true;
	expect(elemento.elemento.checked).toBe(true);

	elemento.selecionado = false;
	expect(elemento.elemento.checked).toBe(false);

	elemento.texto = 'Texto inserido antes do elemento';
	expect(document.body).toMatchInlineSnapshot(`
		<body>
		  <span
		    class="gmValor"
		  >
		    Texto inserido antes do elemento
		  </span>
		  <input
		    id="zero"
		    type="radio"
		  />
		</body>
	`);
});
