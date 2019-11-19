import { Elemento } from './Elemento';

export class Elementos {
	static fromIds(ids: string[], doc = document) {
		return ids
			.map(id => {
				const elt = doc.getElementById(id);
				if (
					elt &&
					elt.matches('input') &&
					(elt as HTMLInputElement).type === 'radio'
				)
					return new Elemento(elt as HTMLInputElement);
				else return null;
			})
			.filter((wrapper): wrapper is Elemento => wrapper !== null);
	}
}
