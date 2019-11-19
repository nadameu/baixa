export class Buffer extends Array<string> {
	maximo: number;
	constructor(maximo: number) {
		super();
		this.maximo = maximo;
	}

	pushDigito(digito: string): number | null {
		Array.prototype.push.call(this, digito);
		let valor = parseInt(this.join(''));
		while (valor > this.maximo) {
			this.splice(0, 1);
			valor = parseInt(this.join(''));
		}
		return isNaN(valor) ? null : valor;
	}
}
