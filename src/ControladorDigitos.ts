import { Digito } from './Digito';
import { Nat } from './Nat';

export function ControladorDigitos(maximo: Nat) {
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
	return array.reduce((acc, x) => acc * 10 + x, 0) as Nat;
}
