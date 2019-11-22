jest.mock('./Resultado.css');

import { JSDOM } from 'jsdom';
import { Resultado } from './Resultado';

test('Resultado', () => {
	const { window } = new JSDOM(
		'<!doctype html><html><head></head><body><div>Elemento antes do resultado</div></body></html>'
	);
	const { document } = window;

	const resultado = Resultado('Mensagem inicial', document, window);

	expect(document.body).toMatchInlineSnapshot(`
		<body>
		  <div>
		    Elemento antes do resultado
		  </div>
		  <div
		    class="gmResultado"
		    style="transition: opacity 500ms linear 1066.6666666666667ms; opacity: 0;"
		  >
		    Mensagem inicial
		  </div>
		</body>
	`);

	resultado.ocultar();

	expect(document.body).toMatchInlineSnapshot(`
		<body>
		  <div>
		    Elemento antes do resultado
		  </div>
		  <div
		    class="gmResultado"
		    style="opacity: 0;"
		  >
		    Mensagem inicial
		  </div>
		</body>
	`);

	resultado.mostrarTexto('45');

	expect(document.body).toMatchInlineSnapshot(`
		<body>
		  <div>
		    Elemento antes do resultado
		  </div>
		  <div
		    class="gmResultado"
		    style="transition: opacity 500ms linear 150ms; opacity: 0;"
		  >
		    45
		  </div>
		</body>
	`);
});
