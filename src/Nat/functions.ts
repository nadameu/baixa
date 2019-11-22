import { Nat } from './defs';

export function fromNumber(number: number): Nat | null {
	if (Number.isInteger(number) && number >= 0) return number as Nat;
	return null;
}
