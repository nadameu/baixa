interface Propriedades {
	transition: string;
	opacity: string | null;
}

export class Resultado extends HTMLDivElement {
	aplicarTransformacao(...propriedades: Propriedades[]) {
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
	}

	mostrar(texto: string, tamanho = '') {
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
	}

	mostrarInstrucoes() {
		this.mostrar(
			'Digite a soma das opções que deseja selecionar. Pressione ENTER para confirmar.',
			'32px'
		);
	}
}
