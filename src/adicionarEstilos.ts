export const adicionarEstilos = () => {
	const estilos = document.createElement('style');
	const atualizarEstilos = () => {
		const alturaTela = document.body.clientHeight;
		const tamanhoFonte = alturaTela / 3;
		estilos.innerHTML = gerarCSS(tamanhoFonte);
	};
	atualizarEstilos();
	document.head.appendChild(estilos);
	return atualizarEstilos;
};

function gerarCSS(tamanhoFonte: number): string {
	return `
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
`;
}
