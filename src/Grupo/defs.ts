import { NEArray } from '../NEArray';
import { RadioInput } from '../RadioInput';

declare const IsGrupo: unique symbol;

export interface Grupo extends NEArray<RadioInput> {
	[IsGrupo]: never;
}

export const Grupo = undefined as never;
