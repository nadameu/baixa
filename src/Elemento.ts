export class Elemento {
	elemento: HTMLInputElement;
	constructor(elemento: HTMLInputElement) {
		verificarElementoEhRadio(elemento);
		this.elemento = elemento;
	}
	set selecionado(selecionado: boolean) {
		this.elemento.checked = selecionado;
	}
	set texto(texto: string) {
		this.elemento.insertAdjacentHTML(
			'beforebegin',
			`<span class="gmValor">${texto}</span>`
		);
	}
}

class ErroElemento extends TypeError {
	data: unknown;
	constructor(obj: unknown) {
		super('Parâmetro não corresponde ao elemento HTML "input[type=radio]".');
		this.name = 'ErroElemento';
		this.data = obj;
	}
}

function verificarElementoEhRadio(
	elemento: unknown
): asserts elemento is HTMLInputElement {
	if (
		typeof elemento === 'object' &&
		elemento &&
		typeof (elemento as any).matches === 'function' &&
		(elemento as any).matches('input[type="radio"]')
	)
		return;
	throw new ErroElemento(elemento);
}
