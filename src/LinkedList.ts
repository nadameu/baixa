import { Elemento } from './Elemento';
import { Link } from './Link';
import { analisarGrupos } from './analisarGrupos';

export class LinkedList {
	grupos: { valor: number; elemento: Elemento }[][];
	maximo: number;
	constructor(grupos: Elemento[][]) {
		verificarGruposValidos(grupos);
		const { maximo, grupos: _grupos } = analisarGrupos(grupos);
		_grupos.forEach(grupo =>
			grupo.forEach(({ valor, elemento }) => {
				elemento.texto = String(valor);
			})
		);

		this.grupos = _grupos.map(grupo => grupo.slice().reverse()).reverse();
		this.maximo = maximo;
	}

	set valor(valor: number) {
		if (valor > this.maximo) throw new RangeError(`Valor inválido: ${valor}.`);
		let restante = valor;
		for (const grupo of this.grupos) {
			let selecionadoGrupo = false;
			for (const { valor, elemento } of grupo) {
				if (valor > 0 && restante >= valor) {
					elemento.selecionado = true;
					restante -= valor;
					selecionadoGrupo = true;
				} else if (!selecionadoGrupo && valor === 0) {
					elemento.selecionado = true;
				} else {
					elemento.selecionado = false;
				}
			}
		}
	}
}

function verificarGruposValidos(
	grupos: Elemento[][]
): asserts grupos is Elemento[][] {
	if (!Array.isArray(grupos)) throwError();
	if (grupos.length < 1) throwError();
	const elementos = new WeakSet<HTMLInputElement>();
	const names = new Set<string>();
	for (const grupo of grupos) {
		if (!Array.isArray(grupo)) throwError();
		if (grupo.length < 1) throwError();
		let name = '';
		for (const elemento of grupo) {
			if (!(elemento instanceof Elemento)) throwError();
			const elementoHTML = elemento.elemento;
			if (elementos.has(elementoHTML))
				throwError('Elemento duplicado', elementoHTML);
			elementos.add(elementoHTML);
			name = elementoHTML.name;
			if (name === '')
				throwError('Elemento não possui atributo "name".', elementoHTML);
			if (names.has(name))
				throwError(
					'Elementos com mesmo atributo "name" utilizados em grupos diferentes',
					elementoHTML
				);
		}
		names.add(name);
	}
}

class ErroGrupos extends TypeError {
	data: any;
	constructor(msg?: string, data?: any) {
		super(
			msg ||
				'"grupos" deve ser um array não-vazio de arrays de "Elemento"s, cada grupo deve conter ao menos um "Elemento".'
		);
		this.name = 'ErroGrupos';
		this.data = data;
	}
}

function throwError(msg?: string, data?: any) {
	throw new ErroGrupos(msg, data);
}
