import { multiplicarAnteriores } from './multiplicarAnteriores';
import { Nat } from './Nat';
import { NEArray } from './NEArray';

export const analisarGrupos = <a>(grupos: NEArray<a>[]) => {
	const quantidades = grupos.map(grupo => grupo.length as Nat);
	const multiplicadores = multiplicarAnteriores(quantidades);
	const maximos = grupos.map(
		(_, i) => ((quantidades[i] - 1) * multiplicadores[i]) as Nat
	);
	return {
		maximo: maximos.reduce((a, b) => a + b, 0) as Nat,
		grupos: grupos.map(
			(grupo, g) =>
				Object.freeze(
					grupo.map((elemento, e) => ({
						valor: (multiplicadores[g] * e) as Nat,
						elemento,
					}))
				) as NEArray<{ valor: Nat; elemento: a }>,
			[]
		),
	};
};
