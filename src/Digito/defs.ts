declare const IsDigito: unique symbol;

export interface Digito extends Number {
	[IsDigito]: never;
}
