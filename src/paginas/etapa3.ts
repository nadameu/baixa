import * as Constantes from '../constantes';

export function etapa3(win = window, storage = win.localStorage) {
	if (
		storage.hasOwnProperty(Constantes.FECHAR_APOS_BAIXAR) &&
		storage.getItem(Constantes.FECHAR_APOS_BAIXAR) === 'S'
	) {
		let abertos = win.opener.documentosAbertos;
		if (abertos) {
			for (let id in abertos) {
				let janela = abertos[id];
				if (janela && !janela.closed) {
					janela.setTimeout(() => janela.close(), 1);
				}
			}
		}
		const opener = win.opener;
		opener.setTimeout(() => opener.close(), 1);
		win.close();
	}
}
