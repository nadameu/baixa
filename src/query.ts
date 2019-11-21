export function query<T extends HTMLElement>(
	selector: string,
	parentNode: ParentNode = document
): T {
	const element = parentNode.querySelector<T>(selector);
	if (element) return element;
	throw new Error(`Elemento não encontrado: '${selector}'.`);
}
