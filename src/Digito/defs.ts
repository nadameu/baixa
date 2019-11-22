import { Nat } from '../Nat';

declare const IsDigito: unique symbol;

export type Digito = Nat & {
	[IsDigito]: never;
};

export const Digito = undefined as never;
