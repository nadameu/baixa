import { Digito } from './Digito';

export function Buffer(maximo: number) {
	let array: Digito[] = [];

	return { pushDígito };

	function pushDígito(digito: Digito) {
		array.push(digito);
		let valor = obterValor(array);
		while (valor > maximo) {
			array = array.slice(1);
			valor = obterValor(array);
		}
		return valor;
	}
}

function obterValor(array: Digito[]) {
	return array.reduce((acc, x) => acc * 10 + x.valueOf(), 0);
}
