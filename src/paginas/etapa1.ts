import { adicionarEstilos } from '../adicionarEstilos';
import * as Constantes from '../constantes';
import { ControladorDigitos } from '../ControladorDigitos';
import { Digito } from '../Digito';
import estilos from '../estilos.css';
import { Grupo, GrupoVazio } from '../Grupo';
import { Grupos } from '../Grupos';
import { ocultarMenuLateral } from '../ocultarMenuLateral';
import { OSD } from '../OSD';
import { Selecionador } from '../Selecionador';

export function etapa1({
	baixar,
	pendencias,
	wrapper,
	sidebar,
}: {
	baixar: HTMLInputElement;
	pendencias: HTMLElement;
	wrapper: HTMLElement;
	sidebar: HTMLElement;
}) {
	adicionarEstilos(estilos);
	ocultarMenuLateral(wrapper, sidebar);
	adicionarBotaoFecharAposBaixar(pendencias);

	const osd = OSD(
		'Digite a soma das opções que deseja selecionar. Pressione ENTER para confirmar.'
	);

	const selecionador = criarSelecionador();

	const controladorDigitos = ControladorDigitos(selecionador.maximo);

	document.addEventListener('click', () => osd.ocultar());
	document.addEventListener('keypress', evt => {
		const digito = Digito.fromString(evt.key);
		if (digito !== null) {
			const valor = controladorDigitos.pushDígito(digito);
			osd.mostrarTexto(valor.toString());
			selecionador.setValor(valor);
		} else if (evt.keyCode === 13) {
			baixar.click();
		}
	});
}

export function adicionarBotaoFecharAposBaixar(pendencias: HTMLElement) {
	pendencias.insertAdjacentHTML(
		'beforebegin',
		'<label class="btn btn-default gmLabel"><input id="gmFechar" type="checkbox">&nbsp;<label for="gmFechar">Fechar esta janela e a janela/aba do processo após baixar</label></label>'
	);
	const fechar = document.querySelector('#gmFechar') as HTMLInputElement;
	const fecharLabel = document.querySelector('.gmLabel') as HTMLLabelElement;
	fechar.addEventListener('change', onFecharChange);
	if (localStorage.hasOwnProperty(Constantes.FECHAR_APOS_BAIXAR)) {
		fechar.checked =
			localStorage.getItem(Constantes.FECHAR_APOS_BAIXAR) === 'S';
		onFecharChange();
	}

	function onFecharChange() {
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
	}
}

function criarSelecionador() {
	// Grupos
	const jáTeveBaixaDefinitiva = Grupo.fromIds(['rdoItem0/1']);
	const condenação = Grupo.fromIds(['rdoItem1/3', 'rdoItem1/1', 'rdoItem1/2']);
	const honoráriosCustas = Grupo.fromIds([
		'rdoItem2/3',
		'rdoItem2/1',
		'rdoItem2/2',
	]);
	const apensosLEF = Grupo.fromIds(['rdoItem3/2', 'rdoItem3/1']);
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
	return Selecionador(gruposValidos);
}
