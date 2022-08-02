import { etapa1 } from './paginas/etapa1';
import { etapa3 } from './paginas/etapa3';
import { query } from './query';

export function main() {
	const { acao, etapa } = extrairDadosUrl(document.location.href);
	if (etapa === '1') {
		const baixar = query<HTMLInputElement>('input#sbmBaixa');
		const pendencias = query('#fldPendencias');
		etapa1({ baixar, pendencias });
	} else if (etapa === '3') {
		etapa3();
	} else {
		throw new Error(`Ação desconhecida: '${acao}'.`);
	}
}

function extrairDadosUrl(url: string) {
	const acao = new URL(url).searchParams.get('acao');
	const match = (acao === null ? '' : acao).match(
		/^baixa_arquivamento_processo_etapa_(1|3)$/
	);
	const etapa = (match === null ? ['', 'desconhecida'] : match)[1];
	return { acao, etapa };
}
