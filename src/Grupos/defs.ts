import { Grupo } from '../Grupo/defs';

declare const IsGrupos: unique symbol;

export interface Grupos extends Array<Grupo> {
	[IsGrupos]: never;
}

export const Grupos = undefined as never;
