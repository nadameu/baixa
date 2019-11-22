import { Digito } from './defs';

export function fromNumber(number: number): Digito | null {
	if (Number.isInteger(number) && number.toString().length === 1)
		return number as Digito;
	return null;
}

export function fromString(string: string): Digito | null {
	if (/^\d$/.test(string)) return Number(string) as Digito;
	return null;
}
