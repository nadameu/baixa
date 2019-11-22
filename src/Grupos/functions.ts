import { Grupo, GrupoVazio } from '../Grupo/defs';
import { Grupos } from './defs';

export function fromArray(array: (Grupo | GrupoVazio)[]): Grupos | null {
	const gruposNaoVazios = array.filter(
		(grupo): grupo is Grupo => grupo.length > 0
	);
	const names = new Set();
	for (const grupo of gruposNaoVazios) {
		// Todos os elementos de um grupo terão o mesmo atributo "name"
		const { name } = grupo[0];

		// Elementos com mesmo atributo "name" não podem estar em grupos diferentes
		if (names.has(name)) return null;

		names.add(name);
	}
	return gruposNaoVazios as Grupos;
}
