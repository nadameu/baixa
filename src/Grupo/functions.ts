import { NEA } from '../NEArray';
import { R, RadioInput } from '../RadioInput';
import { Grupo, GrupoVazio } from './defs';

export function fromIds(
	ids: string[],
	doc = document
): Grupo | GrupoVazio | null {
	// Não pode haver elementos repetidos
	if (new Set(ids).size !== ids.length) return null;

	const radios = ids.map(id => R.fromId(id, doc));

	if (todosNulos(radios)) {
		// Grupos vazios são permitidos
		return ([] as ReadonlyArray<RadioInput>) as GrupoVazio;
	}
	if (nenhumNulo(radios)) {
		// Todos os elementos do grupo devem ser obtidos

		// Todos os elementos devem ter o mesmo atributo "name"
		const names = new Set(radios.map(({ name }) => name));
		if (names.size === 1) return NEA.fromArray(radios) as Grupo | null;
	}
	return null;
}

function nenhumNulo<a>(xs: Array<a | null>): xs is a[] {
	return xs.every(x => x !== null);
}

function todosNulos<a>(xs: Array<a | null>): xs is null[] {
	return xs.every(x => x === null);
}
