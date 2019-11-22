import { Grupo } from '../Grupo/defs';
import { Grupos } from './defs';

export function fromArray(array: Grupo[]): Grupos | null {
	const names = new Set();
	for (const grupo of array) {
		// Todos os elementos de um grupo terão o mesmo atributo "name"
		const { name } = grupo[0];

		// Elementos com mesmo atributo "name" não podem estar em grupos diferentes
		if (names.has(name)) return null;

		names.add(name);
	}
	return array as Grupos;
}
