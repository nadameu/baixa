import { RadioInput } from './RadioInput';

export function Elemento(elemento: RadioInput) {
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
