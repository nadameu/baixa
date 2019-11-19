export const debounce = <args extends any[]>(
	ms: number,
	callback: (...args: args) => void
): ((...args: args) => void) => {
	let timer: number;
	return (...args: args) => {
		window.clearTimeout(timer);
		timer = window.setTimeout(callback, ms, ...args);
	};
};
