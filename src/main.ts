import { adicionarEstilos } from './adicionarEstilos';
import { Buffer } from './Buffer';
import * as Constantes from './constantes';
import { debounce } from './debounce';
import { Elementos } from './Elementos';
import { LinkedList } from './LinkedList';
import { Resultado } from './Resultado';

export const main = (win = window, doc = win.document) => {
	const atualizarEstilos = adicionarEstilos();
	win.addEventListener('resize', debounce(100, atualizarEstilos, win));

	const params = new URL(doc.location.href).searchParams;
	if (!params.has('acao')) return;
	const match = params
		.get('acao')!
		.match(/^baixa_arquivamento_processo_etapa_(1|3)$/);
	if (!match) return;
	const etapa = match[1];
	if (etapa === '1') {
		const baixar = doc.querySelector<HTMLInputElement>('input#sbmBaixa');
		if (!baixar) throw new Error('Elemento não encontrado: "#sbmBaixa".');
		const pendencias = doc.querySelector('#fldPendencias');
		if (!pendencias)
			throw new Error('Elemento não encontrado: "#fldPendencias".');
		pendencias.insertAdjacentHTML(
			'beforebegin',
			'<label class="btn btn-default gmLabel"><input id="gmFechar" type="checkbox">&nbsp;<label for="gmFechar">Fechar esta janela e a janela/aba do processo após baixar</label></label>'
		);
		const fechar = doc.querySelector('#gmFechar') as HTMLInputElement;
		const fecharLabel = doc.querySelector('.gmLabel') as HTMLLabelElement;
		const onFecharChange = () => {
			const selecionado = fechar.checked;
			localStorage.setItem(
				Constantes.FECHAR_APOS_BAIXAR,
				selecionado ? 'S' : 'N'
			);
			if (selecionado) {
				fecharLabel.classList.add('gmChecked');
			} else {
				fecharLabel.classList.remove('gmChecked');
			}
		};
		fechar.addEventListener('change', onFecharChange);
		if (localStorage.hasOwnProperty(Constantes.FECHAR_APOS_BAIXAR)) {
			fechar.checked =
				localStorage.getItem(Constantes.FECHAR_APOS_BAIXAR) === 'S';
			onFecharChange();
		}

		doc.body.insertAdjacentHTML('beforeend', '<div class="gmResultado"></div>');

		const resultado: Resultado = Object.setPrototypeOf(
			doc.querySelector('.gmResultado') as HTMLDivElement,
			Resultado.prototype
		);
		resultado.addEventListener('click', () => {
			resultado.style.display = 'none';
			resultado.style.opacity = '0';
		});

		const jaTeveBaixaDefinitiva = Elementos.fromIds(['rdoItem0/1'], doc);
		const liECertifico = Elementos.fromIds(['chkPendencias'], doc);
		const condenacao = Elementos.fromIds(
			['rdoItem1/3', 'rdoItem1/1', 'rdoItem1/2'],
			doc
		);
		const honorariosCustas = Elementos.fromIds(
			['rdoItem2/3', 'rdoItem2/1', 'rdoItem2/2'],
			doc
		);
		const apensosLEF = Elementos.fromIds(['rdoItem3/2', 'rdoItem3/1'], doc);
		const valores = new LinkedList(
			[
				jaTeveBaixaDefinitiva,
				liECertifico,
				condenacao,
				honorariosCustas,
				apensosLEF,
			].filter(grupo => grupo.length >= 1)
		);

		const buffer = new Buffer(valores.maximo);
		doc.addEventListener('keypress', evt => {
			if (/^\d$/.test(evt.key)) {
				const valor = buffer.pushDigito(evt.key) ?? 0;
				resultado.mostrar(valor.toString());
				valores.valor = valor;
			} else if (evt.keyCode === 13) {
				baixar.click();
			}
		});

		resultado.mostrarInstrucoes();
	} else if (etapa === '3') {
		if (
			localStorage.hasOwnProperty(Constantes.FECHAR_APOS_BAIXAR) &&
			localStorage.getItem(Constantes.FECHAR_APOS_BAIXAR) === 'S'
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
};
