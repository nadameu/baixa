import { adicionarEstilos } from './adicionarEstilos';
import { debounce } from './debounce';
import estilos from './OSD.css';

const CARACTERES_POR_SEGUNDO = 15;
const MILISSEGUNDOS_POR_CARACTERE = 1000 / CARACTERES_POR_SEGUNDO;
const ESPERA_MINIMA = 150;

export function OSD(
	mensagemInicial: string,
	doc = document,
	win = doc.defaultView!
) {
	adicionarEstilos(estilos);

	const div = doc.createElement('div');
	div.className = 'gmResultado';
	doc.body.appendChild(div);

	let mensagemInicialMostrada = false;

	div.addEventListener('transitioncancel', onFimTransição, { once: true });
	div.addEventListener('transitionend', onFimTransição, { once: true });

	alteraTextoAguardaEFade(mensagemInicial);

	return { mostrarTexto, ocultar };

	function mostrarTexto(texto: string) {
		div.style.transition = '';
		div.style.opacity = '';
		alteraTextoAguardaEFade(texto);
	}

	function ocultar() {
		div.style.display = 'none';
		div.getBoundingClientRect();
		div.style.transition = '';
		div.style.opacity = '0';
		div.style.display = '';
	}

	function onFimTransição() {
		if (mensagemInicialMostrada) return;
		mensagemInicialMostrada = true;
		win.addEventListener('resize', debounce(150, ajustarTamanhoFonte));
		ajustarTamanhoFonte();
	}

	function alteraTextoAguardaEFade(texto: string) {
		div.textContent = texto;
		div.getBoundingClientRect();
		div.style.transition = `opacity 500ms linear ${calcularEsperaMínima(
			texto
		)}ms`;
		div.style.opacity = '0';
	}

	function ajustarTamanhoFonte() {
		div.style.fontSize = `${(obterAlturaJanela() / 3) | 0}px`;
	}

	function obterAlturaJanela() {
		return doc.documentElement.clientHeight;
	}

	function calcularEsperaMínima(mensagem: string) {
		return Math.max(
			ESPERA_MINIMA,
			mensagem.length * MILISSEGUNDOS_POR_CARACTERE
		);
	}
}
