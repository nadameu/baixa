/**
 * @jest-environment jsdom
 */

import * as Constantes from '../constantes';
import { adicionarBotaoFecharAposBaixar } from './etapa1';

describe('adicionarBotaoFecharAposBaixar', () => {
	test('Snapshot', () => {
		adicionar();
		expect(document.body).toMatchInlineSnapshot(`
		<body>
		  <label
		    class="btn btn-default gmLabel"
		  >
		    <input
		      id="gmFechar"
		      type="checkbox"
		    />
		     
		    <label
		      for="gmFechar"
		    >
		      Fechar esta janela e a janela/aba do processo após baixar
		    </label>
		  </label>
		  <div
		    id="pendencias"
		  />
		</body>
	`);
	});

	test('Sem preferência salva', () => {
		localStorage.removeItem(Constantes.FECHAR_APOS_BAIXAR);
		testarEventos(true, false);
	});

	test('Preferência salva (Não)', () => {
		localStorage.setItem(Constantes.FECHAR_APOS_BAIXAR, 'N');
		testarEventos(true, false);
	});

	test('Preferência salva (Sim)', () => {
		localStorage.setItem(Constantes.FECHAR_APOS_BAIXAR, 'S');
		testarEventos(false, true);
	});

	function adicionar() {
		document.body.innerHTML = '<div id="pendencias"></div>';
		const pendencias = document.getElementById('pendencias')!;
		adicionarBotaoFecharAposBaixar(pendencias);
	}

	function testarEventos(
		clicado1vez: boolean,
		clicado2vezes: boolean = !clicado1vez
	) {
		adicionar();
		const fechar = document.getElementById('gmFechar')!;

		fechar.dispatchEvent(new Event('click'));
		expect(localStorage.getItem(Constantes.FECHAR_APOS_BAIXAR)).toEqual(
			clicado1vez ? 'S' : 'N'
		);

		fechar.dispatchEvent(new Event('click'));
		expect(localStorage.getItem(Constantes.FECHAR_APOS_BAIXAR)).toEqual(
			clicado2vezes ? 'S' : 'N'
		);
	}
});
