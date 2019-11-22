import { Digito } from './defs';

export function fromNumber(number: number): Digito | null {
	if (Number.isInteger(number) && number.toString().length === 1)
		return new Number(number) as Digito;
	return null;
}

export function fromString(string: string): Digito | null {
	if (/^\d$/.test(string)) return new Number(Number(string)) as Digito;
	return null;
}
