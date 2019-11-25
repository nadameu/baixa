export const debounce = <args extends any[]>(
	ms: number,
	callback: (...args: args) => void
) => {
	let timer: number;
	return (...args: args) => {
		clearTimeout(timer);
		timer = setTimeout(callback, ms, ...args);
	};
};
