export default {
	namespace: 'http://nadameu.com.br/baixa',
	include: [
		/^https:\/\/eproc\.(jf(pr|rs|sc)|trf4)\.jus\.br\/eproc(V2|2trf4)\/controlador\.php\?acao=baixa_arquivamento_processo_etapa_(1|3)&/,
	],
	grant: 'none',
};
