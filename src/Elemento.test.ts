import { expect, test } from 'vitest';
import { Elemento } from './Elemento';
import { RadioInput } from './RadioInput';

test('Elemento', () => {
	document.body.innerHTML = '<input id="zero" type="radio" name="meu-nome"/>';

	const zero = RadioInput.fromId('zero');
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
