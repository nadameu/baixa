import { NEA } from '../NEArray';
import { R } from '../RadioInput';
import { Grupo } from './defs';

export function fromIds(ids: string[], doc = document): Grupo | null {
	// Não pode haver elementos repetidos
	if (new Set(ids).size !== ids.length) return null;

	const radios = ids.map(id => R.fromId(id, doc));

	// Todos os elementos do grupo devem ser obtidos
	if (nenhumNulo(radios)) {
		// Todos os elementos devem ter o mesmo atributo "name"
		const names = new Set(radios.map(({ name }) => name));
		if (names.size === 1) return NEA.fromArray(radios) as Grupo | null;
	}
	return null;
}

function nenhumNulo<a>(xs: Array<a | null>): xs is a[] {
	return xs.every(x => x !== null);
}
