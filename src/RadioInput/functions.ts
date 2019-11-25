import { RadioInput } from './defs';

export function fromId(id: string): RadioInput | null {
	const element = document.getElementById(id);
	return element === null ? null : fromElement(element);
}

export function fromElement(element: HTMLElement): RadioInput | null {
	return element.matches('input[type="radio"][name]') &&
		(element as HTMLInputElement).name !== ''
		? (element as RadioInput)
		: null;
}
