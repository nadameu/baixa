import { describe, expect, test, vitest } from 'vitest';
import * as Constantes from '../constantes';
import { Digito } from '../Digito';
import { Nat } from '../Nat';
import {
	adicionarBotaoFecharAposBaixar,
	criarSelecionador,
	onKeyPress,
} from './etapa1';

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

		fechar.click();
		expect(localStorage.getItem(Constantes.FECHAR_APOS_BAIXAR)).toEqual(
			clicado1vez ? 'S' : 'N'
		);

		fechar.click();
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

describe('onKeyPress', () => {
	const pushDígito = (() => {
		let valor = Nat.fromNumber(0)!;
		return vitest.fn(push);
		function push(x: Digito) {
			valor = Nat.fromNumber((valor % 10) * 10 + x)!;
			return valor;
		}
	})();
	const mostrarTexto = vitest.fn();
	const setValor = vitest.fn<[Nat], void>();
	document.body.innerHTML = '<button id="button"></button>';
	const baixar = document.getElementById('button') as HTMLButtonElement;
	Object.defineProperty(baixar, 'click', { value: vitest.fn() });
	const handler = onKeyPress({ baixar, mostrarTexto, pushDígito, setValor });

	test('Dígitos', () => {
		handler({ key: '?' } as KeyboardEvent);
		handler({ key: '0' } as KeyboardEvent);
		handler({ key: '8' } as KeyboardEvent);
		handler({ key: '?' } as KeyboardEvent);
		handler({ key: '7' } as KeyboardEvent);
		handler({ key: '?' } as KeyboardEvent);
		handler({ key: '3' } as KeyboardEvent);
		handler({ key: '?' } as KeyboardEvent);

		expect(pushDígito.mock.calls).toEqual([[0], [8], [7], [3]]);
		expect(mostrarTexto.mock.calls).toEqual([['0'], ['8'], ['87'], ['73']]);
		expect(setValor.mock.calls).toEqual([[0], [8], [87], [73]]);
	});

	test('Enter', () => {
		handler({ keyCode: 13 } as KeyboardEvent);

		expect(baixar.click).toHaveBeenCalled();
	});
});
