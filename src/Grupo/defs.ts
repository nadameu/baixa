import { NEArray } from '../NEArray';
import { RadioInput } from '../RadioInput';

declare const IsGrupo: unique symbol;

export interface Grupo extends NEArray<RadioInput> {
	[IsGrupo]: never;
}

declare const IsGrupoVazio: unique symbol;

export interface GrupoVazio extends ReadonlyArray<RadioInput> {
	[IsGrupoVazio]: never;
}
