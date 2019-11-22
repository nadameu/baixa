export function Buffer(maximo: number) {
	let array: string[] = [];

	return { pushDígito };

	function pushDígito(digito: string) {
		array.push(digito);
		let valor = parseInt(array.join(''));
		while (valor > maximo) {
			array = array.slice(1);
			valor = parseInt(array.join(''));
		}
		return isNaN(valor) ? null : valor;
	}
}
