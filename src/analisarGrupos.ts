import { multiplicarAnteriores } from './multiplicarAnteriores';
import { NEArray } from './NEArray';

export const analisarGrupos = <a>(grupos: NEArray<a>[]) => {
	const quantidades = grupos.map(grupo => grupo.length);
	const multiplicadores = multiplicarAnteriores(quantidades);
	const maximos = grupos.map(
		(_, i) => (quantidades[i] - 1) * multiplicadores[i]
	);
	return {
		maximo: maximos.reduce((a, b) => a + b, 0),
		grupos: grupos.map(
			(grupo, g) =>
				grupo.map((elemento, e) => ({
					valor: multiplicadores[g] * e,
					elemento,
				})),
			[]
		),
	};
};
