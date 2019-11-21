import { etapa1 } from './paginas/etapa1';
import { etapa3 } from './paginas/etapa3';

export function main(
	win = window,
	doc = win.document,
	storage = win.localStorage
) {
	const acao = new URL(doc.location.href).searchParams.get('acao');
	const match = (acao === null ? '' : acao).match(
		/^baixa_arquivamento_processo_etapa_(1|3)$/
	);
	const etapa = (match === null ? ['', 'desconhecida'] : match)[1] as string;
	if (etapa === '1') {
		etapa1({ win, doc });
	} else if (etapa === '3') {
		etapa3(win, storage);
	} else {
		throw new Error(`Ação desconhecida: '${acao}'.`);
	}
}
