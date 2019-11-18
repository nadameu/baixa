import { Buffer } from './Buffer';
import * as Constantes from './constantes';
import { LinkedList } from './LinkedList';
import { makeElementos } from './Elementos';

export const main = () => {
	const alturaTela = document.body.clientHeight;
	const tamanhoFonte = alturaTela / 3;
	document.head.insertAdjacentHTML(
		'beforeend',
		`<style>
.gmLabel {
	border-color: #faa;
}
.gmLabel.gmChecked {
	background: #fdc;
}
#gmFechar {
	cursor: pointer;
}
.gmLabel label {
	cursor: pointer;
}
.gmValor {
	display: inline-block;
	width: 18px;
	height: 18px;
	line-height: 18px;
	color: #333;
	background: #cea;
	border-radius: 100%;
}
.gmResultado {
	opacity: 0;
	will-change: opacity;
	position: fixed;
	display: flex;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	padding: 15%;
	background: rgba(0,0,0,0.5);
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: ${tamanhoFonte}px;
	font-weight: bold;
	color: white;
}
</style>`
	);

	const etapa = window.location.search.match(
		/^\?acao=baixa_arquivamento_processo_etapa_(1|3)&/
	)[1];
	if (etapa === '1') {
		const pendencias = document.querySelector('#fldPendencias');
		if (!pendencias)
			throw new Error('Elemento não encontrado: "#fldPendencias".');
		pendencias.insertAdjacentHTML(
			'beforebegin',
			'<label class="btn btn-default gmLabel"><input id="gmFechar" type="checkbox">&nbsp;<label for="gmFechar">Fechar esta janela e a janela/aba do processo após baixar</label></label>'
		);
		const fechar = document.querySelector('#gmFechar') as HTMLInputElement;
		const fecharLabel = document.querySelector('.gmLabel') as HTMLLabelElement;
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

		document.body.insertAdjacentHTML(
			'beforeend',
			'<div class="gmResultado"></div>'
		);
		interface Propriedades {
			transition: string;
			opacity: string | null;
		}
		interface Resultado extends HTMLDivElement {
			aplicarTransformacao(...propriedades: Propriedades[]): void;
			mostrar(texto: string, tamanho?: string): void;
			mostrarInstrucoes(): void;
		}
		const resultado: Resultado = Object.assign(
			document.querySelector('.gmResultado') as HTMLDivElement,
			{
				aplicarTransformacao(this: Resultado, ...propriedades: Propriedades[]) {
					console.log(this);
					if (propriedades.length > 0) {
						let p = propriedades.splice(0, 1)[0];
						requestAnimationFrame(() =>
							requestAnimationFrame(() => {
								this.style.transition = p.transition;
								this.style.opacity = p.opacity;
								this.aplicarTransformacao.apply(this, propriedades);
							})
						);
					}
				},

				mostrar(this: Resultado, texto: string, tamanho = '') {
					const CARACTERES_POR_SEGUNDO = 20;
					const MILISSEGUNDOS_POR_CARACTERE = 1000 / CARACTERES_POR_SEGUNDO;
					const esperaMinima = texto.length * MILISSEGUNDOS_POR_CARACTERE;

					this.style.display = '';
					this.style.fontSize = tamanho;
					this.textContent = texto;
					this.aplicarTransformacao(
						{
							transition: '1ms',
							opacity: '1',
						},
						{
							transition: `500ms linear ${esperaMinima}ms`,
							opacity: '0',
						}
					);
				},
				mostrarInstrucoes(this: Resultado) {
					this.mostrar(
						'Digite a soma das opções que deseja selecionar. Pressione ENTER para confirmar.',
						'32px'
					);
				},
			}
		);
		resultado.addEventListener('click', () => {
			resultado.style.display = 'none';
			resultado.style.opacity = '0';
		});

		const Elementos = makeElementos(document);
		const jaTeveBaixaDefinitiva = Elementos.fromIds(['rdoItem0/1']);
		const liECertifico = Elementos.fromIds(['chkPendencias']);
		const condenacao = Elementos.fromIds([
			'rdoItem1/3',
			'rdoItem1/1',
			'rdoItem1/2',
		]);
		const honorariosCustas = Elementos.fromIds([
			'rdoItem2/3',
			'rdoItem2/1',
			'rdoItem2/2',
		]);
		const apensosLEF = Elementos.fromIds(['rdoItem3/2', 'rdoItem3/1']);
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
		console.log('valores:', valores);
		document.addEventListener('keypress', evt => {
			if (/^\d$/.test(evt.key)) {
				const valor = buffer.pushDigito(evt.key) ?? 0;
				resultado.mostrar(valor.toString());
				valores.valor = valor;
			} else if (evt.keyCode === 13) {
				const baixar = document.querySelector('#sbmBaixa');
				baixar.click();
			}
		});

		resultado.mostrarInstrucoes();
	} else if (etapa === '3') {
		if (
			localStorage.hasOwnProperty(Constantes.FECHAR_APOS_BAIXAR) &&
			localStorage.getItem(Constantes.FECHAR_APOS_BAIXAR) === 'S'
		) {
			let abertos = window.opener.documentosAbertos;
			if (abertos) {
				for (let id in abertos) {
					let janela = abertos[id];
					if (janela && !janela.closed) {
						janela.setTimeout(() => janela.close(), 1);
					}
				}
			}
			const opener = window.opener;
			opener.setTimeout(() => opener.close(), 1);
			window.close();
		}
	}
};
