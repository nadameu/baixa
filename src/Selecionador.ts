import { analisarGrupos } from './analisarGrupos';
import { Elemento } from './Elemento';
import { Grupos } from './Grupos';
import { Nat } from './Nat';

interface ValorElemento {
	valor: Nat;
	elemento: Elemento;
}

export interface Selecionador {
	readonly maximo: Nat;
	setValor(valor: Nat): void;
}

export function Selecionador(grupos: Grupos) {
	const { elementos, maximo } = obterElementos(grupos);

	for (const grupo of elementos)
		for (const { valor, elemento } of grupo)
			elemento.adicionarTexto(String(valor));

	return { maximo, setValor };

	function setValor(valor: Nat) {
		if (valor > maximo) throw new RangeError(`Valor inválido: ${valor}.`);
		let restante: number = valor;
		for (const grupo of elementos) {
			let selecionadoGrupo = false;
			for (const { valor, elemento } of grupo) {
				if (valor > 0 && restante >= valor) {
					elemento.setSelecionado(true);
					restante -= valor;
					selecionadoGrupo = true;
				} else if (!selecionadoGrupo && valor === 0) {
					elemento.setSelecionado(true);
				} else {
					elemento.setSelecionado(false);
				}
			}
		}
	}
}

function obterElementos(grupos: Grupos) {
	const { grupos: radiosComValor, maximo } = analisarGrupos(grupos);

	const elementos: ValorElemento[][] = radiosComValor
		.map(grupo =>
			grupo
				.map(({ elemento: radio, valor }) => ({
					elemento: Elemento(radio),
					valor,
				}))
				.sort(valorDecrescente)
		)
		.sort(valoresDecrescentes);

	return { elementos, maximo };
}

function valorDecrescente(a: ValorElemento, b: ValorElemento) {
	return b.valor - a.valor;
}

function valoresDecrescentes(as: ValorElemento[], bs: ValorElemento[]) {
	return (
		Math.max(...bs.map(({ valor }) => valor)) -
		Math.max(...as.map(({ valor }) => valor))
	);
}
