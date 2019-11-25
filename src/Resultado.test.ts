/**
 * @jest-environment jsdom
 */

jest.mock('./Resultado.css');

import { Resultado } from './Resultado';

test('Resultado', () => {
	document.body.innerHTML = '<div>Elemento antes do resultado</div>';
	const resultado = Resultado('"Mensagem inicial"');
	const div = document.querySelector('.gmResultado')!;

	expect(document.body).toMatchInlineSnapshot(`
		<body>
		  <div>
		    Elemento antes do resultado
		  </div>
		  <div
		    class="gmResultado"
		    style="transition: opacity 500ms linear 1200ms; opacity: 0;"
		  >
		    "Mensagem inicial"
		  </div>
		</body>
	`);

	resultado.ocultar();
	div.dispatchEvent(new Event('transitioncancel'));

	expect(document.body).toMatchInlineSnapshot(`
		<body>
		  <div>
		    Elemento antes do resultado
		  </div>
		  <div
		    class="gmResultado"
		    style="opacity: 0; font-size: 0px;"
		  >
		    "Mensagem inicial"
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
		    style="font-size: 0px; transition: opacity 500ms linear 150ms; opacity: 0;"
		  >
		    45
		  </div>
		</body>
	`);

	Object.defineProperty(document.documentElement, 'clientHeight', {
		get() {
			return 1002;
		},
	});
	div.dispatchEvent(new window.Event('transitionend'));

	expect(document.body).toMatchInlineSnapshot(`
		<body>
		  <div>
		    Elemento antes do resultado
		  </div>
		  <div
		    class="gmResultado"
		    style="font-size: 0px; transition: opacity 500ms linear 150ms; opacity: 0;"
		  >
		    45
		  </div>
		</body>
	`);
});
