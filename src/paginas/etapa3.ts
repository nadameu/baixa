import * as Constantes from '../constantes';

export function etapa3({
	win = window,
	storage = win.localStorage,
}: { win?: Window; storage?: Storage } = {}) {
	if (
		storage.hasOwnProperty(Constantes.FECHAR_APOS_BAIXAR) &&
		storage.getItem(Constantes.FECHAR_APOS_BAIXAR) === 'S'
	) {
		const { opener } = win;
		const { documentosAbertos: abertos } = opener;
		if (abertos)
			Object.values<Window | undefined>(abertos).forEach(janela => {
				if (janela && !janela.closed) janela.close();
			});
		opener.setTimeout(() => opener.close());
		win.close();
	}
}
