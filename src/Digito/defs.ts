declare const IsDigito: unique symbol;

export type Digito = number & {
	[IsDigito]: never;
};
