import { JSDOM } from 'jsdom';
import { Elemento } from './Elemento';
import { R } from './RadioInput';

test('Elemento', () => {
	const { window } = new JSDOM(
		`<!doctype html><html><head></head><body><input id="zero" type="radio" name="meu-nome"/></body></html>`
	);
	const { document } = window;

	const zero = R.fromId('zero', document);
	if (zero === null) throw new Error('Não é um RadioInput válido.');

	const elemento = Elemento(zero);
	elemento.setSelecionado(true);
	expect(zero.checked).toBe(true);

	elemento.setSelecionado(false);
	expect(zero.checked).toBe(false);

	elemento.adicionarTexto('Texto inserido antes do elemento');
	expect(document.body).toMatchInlineSnapshot(`
		<body>
		  <span
		    class="gmValor"
		  >
		    Texto inserido antes do elemento
		  </span>
		  <input
		    id="zero"
		    name="meu-nome"
		    type="radio"
		  />
		</body>
	`);
});
