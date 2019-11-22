import { analisarGrupos } from './analisarGrupos';
import { Elemento } from './Elemento';
import { Grupos } from './Grupos';
import { Nat } from './Nat';

export class LinkedList {
	grupos: { valor: number; elemento: Elemento }[][];
	maximo: Nat;
	constructor(grupos: Grupos) {
		const { maximo, grupos: _grupos } = analisarGrupos(grupos);
		this.grupos = _grupos
			.map(grupo =>
				grupo
					.map(({ elemento: radio, valor }) => ({
						elemento: Elemento(radio),
						valor,
					}))
					.reverse()
			)
			.reverse();
		this.grupos.forEach(grupo =>
			grupo.forEach(({ valor, elemento }) => {
				elemento.adicionarTexto(String(valor));
			})
		);
		this.maximo = maximo;
	}

	set valor(valor: number) {
		if (valor > this.maximo) throw new RangeError(`Valor inválido: ${valor}.`);
		let restante = valor;
		for (const grupo of this.grupos) {
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
