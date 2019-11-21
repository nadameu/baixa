import { queue } from './queue';
export function ocultarMenuLateral(wrapper: HTMLElement, sidebar: HTMLElement) {
	wrapper.style.transition = 'none';
	sidebar.style.transition = 'none';
	wrapper.classList.add('toggled');
	queue(() => {
		wrapper.getBoundingClientRect(); // Forçar paint do navegador
		wrapper.style.transition = '';
		sidebar.style.transition = '';
	});
}
