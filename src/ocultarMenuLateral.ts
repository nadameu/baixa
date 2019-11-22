export function ocultarMenuLateral(wrapper: HTMLElement, sidebar: HTMLElement) {
	wrapper.style.transition = 'none';
	wrapper.classList.remove('abre-automaticamente');
	wrapper.classList.add('toggled');
	sidebar.style.transition = 'none';

	wrapper.getBoundingClientRect(); // Forçar paint do navegador

	wrapper.style.transition = '';
	sidebar.style.transition = '';
}
