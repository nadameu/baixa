declare const IsNat: unique symbol;

export type Nat = number & {
	[IsNat]: never;
};

export const Nat = undefined as never;
