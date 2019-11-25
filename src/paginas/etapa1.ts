import { Buffer } from '../Buffer';
import * as Constantes from '../constantes';
import { Digito } from '../Digito';
import '../estilos.css';
import { Grupo, GrupoVazio } from '../Grupo';
import { Grupos } from '../Grupos';
import { ocultarMenuLateral } from '../ocultarMenuLateral';
import { query } from '../query';
import { Resultado } from '../Resultado';
import { Selecionador } from '../Selecionador';

export function etapa1(
	args: {
		win?: Window;
		doc?: HTMLDocument;
		baixar?: HTMLInputElement;
		pendencias?: HTMLElement;
		wrapper?: HTMLElement;
		sidebar?: HTMLElement;
	} = {}
) {
	const {
		win = window,
		doc = win.document,
		baixar = query('#sbmBaixa', doc),
		pendencias = query('#fldPendencias', doc),
		wrapper = query('#wrapper', doc),
		sidebar = query('#sidebar-wrapper', doc),
	} = args;

	{
		// Menu lateral
		ocultarMenuLateral(wrapper, sidebar);
	}

	{
		// Fechar após baixar
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
	}

	// Mostrador na tela
	const { mostrarTexto, ocultar } = Resultado(
		'Digite a soma das opções que deseja selecionar. Pressione ENTER para confirmar.',
		doc
	);

	const { buffer, valores } = (() => {
		// Grupos
		const jáTeveBaixaDefinitiva = Grupo.fromIds(['rdoItem0/1'], doc);
		const condenação = Grupo.fromIds(
			['rdoItem1/3', 'rdoItem1/1', 'rdoItem1/2'],
			doc
		);
		const honoráriosCustas = Grupo.fromIds(
			['rdoItem2/3', 'rdoItem2/1', 'rdoItem2/2'],
			doc
		);
		const apensosLEF = Grupo.fromIds(['rdoItem3/2', 'rdoItem3/1'], doc);
		const gruposPossíveis = [
			jáTeveBaixaDefinitiva,
			condenação,
			honoráriosCustas,
			apensosLEF,
		];
		const gruposEncontrados = gruposPossíveis.filter(
			(grupo): grupo is Grupo | GrupoVazio => grupo !== null
		);
		const gruposValidos = Grupos.fromArray(gruposEncontrados);
		if (gruposValidos === null)
			throw new Error('Erro ao processar os elementos da página.');
		const valores = Selecionador(gruposValidos);

		const buffer = Buffer(valores.maximo);

		return { buffer, valores };
	})();

	doc.addEventListener('click', () => {
		ocultar();
	});
	doc.addEventListener('keypress', evt => {
		const digito = Digito.fromString(evt.key);
		if (digito !== null) {
			const valor = buffer.pushDígito(digito);
			mostrarTexto(valor.toString());
			valores.setValor(valor);
		} else if (evt.keyCode === 13) {
			baixar.click();
		}
	});
}
