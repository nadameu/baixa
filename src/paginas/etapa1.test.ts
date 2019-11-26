/**
 * @jest-environment jsdom
 */

import * as Constantes from '../constantes';
import { adicionarBotaoFecharAposBaixar, criarSelecionador } from './etapa1';

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

describe('criarSelecionador', () => {
	test('Válido (alguns grupos encontrados)', () => {
		document.body.innerHTML = '';
		criarElementos(1, [1, 2, 3]);
		criarElementos(2, [1, 2, 3]);
		expect(criarSelecionador().maximo).toBe(8);
	});

	test('Válido (nenhum grupo encontrado)', () => {
		document.body.innerHTML = '';
		expect(criarSelecionador().maximo).toBe(0);
	});

	test('Inválido (um grupo com elemento faltante)', () => {
		document.body.innerHTML = '';
		criarElementos(1, [1, 2, 3]);
		criarElementos(2, [1, 3]);
		expect(criarSelecionador).toThrow();
	});
});

function criarElementos(idGrupo: number, idItens: number[]) {
	idItens.map(idItem => {
		const radio = document.createElement('input');
		radio.type = 'radio';
		radio.id = `rdoItem${idGrupo}/${idItem}`;
		radio.name = `grupo${idGrupo}`;
		document.body.appendChild(radio);
	});
}
