import { RadioInput } from './RadioInput';

export interface Elemento {
	setSelecionado: (selecionado: boolean) => void;
	adicionarTexto: (texto: string) => void;
}

export function Elemento(elemento: RadioInput): Elemento {
	return { setSelecionado, adicionarTexto };

	function setSelecionado(selecionado: boolean) {
		elemento.checked = selecionado;
	}

	function adicionarTexto(texto: string) {
		elemento.insertAdjacentHTML(
			'beforebegin',
			`<span class="gmValor">${texto}</span>`
		);
	}
}
