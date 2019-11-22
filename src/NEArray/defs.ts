declare const IsNEArray: unique symbol;

export interface NEArray<a> extends ReadonlyArray<a> {
	[IsNEArray]: never;
}

export const NEArray = undefined as never;
