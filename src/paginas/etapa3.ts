import * as Constantes from '../constantes';

export function etapa3() {
	if (
		localStorage.hasOwnProperty(Constantes.FECHAR_APOS_BAIXAR) &&
		localStorage.getItem(Constantes.FECHAR_APOS_BAIXAR) === 'S'
	) {
		const { documentosAbertos: abertos } = opener;
		if (abertos)
			Object.values<Window | undefined>(abertos).forEach(janela => {
				if (janela && !janela.closed) janela.close();
			});
		opener.setTimeout(() => opener.close());
		window.close();
	}
}
