export function adicionarEstilos(estilos: string) {
	const style = document.createElement('style');
	style.textContent = estilos;
	document.head.appendChild(style);
}
