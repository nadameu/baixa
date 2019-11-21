export class Buffer extends Array<string> {
	máximo: number;
	constructor(máximo: number) {
		super();
		this.máximo = máximo;
	}

	pushDígito(dígito: string): number | null {
		Array.prototype.push.call(this, dígito);
		let valor = parseInt(this.join(''));
		while (valor > this.máximo) {
			this.splice(0, 1);
			valor = parseInt(this.join(''));
		}
		return isNaN(valor) ? null : valor;
	}
}
