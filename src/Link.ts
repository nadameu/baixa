import { Elemento } from './Elemento';

export class Link {
	next: Link | null = null;
	constructor(public key: number, public value: Elemento[]) {}

	analisarValor(valor: number) {
		let selecionado = (valor & this.key) === this.key;
		this.value.forEach(elemento => (elemento.selecionado = selecionado));
		if (this.next) this.next.analisarValor(valor);
	}
}
