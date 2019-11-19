type TimerFunctions = {
	[k in 'clearTimeout' | 'setTimeout']: Window[k];
};

export const debounce = <args extends any[]>(
	ms: number,
	callback: (...args: args) => void,
	{ clearTimeout, setTimeout }: TimerFunctions = window
) => {
	let timer: number;
	return (...args: args) => {
		clearTimeout(timer);
		timer = setTimeout(callback, ms, ...args);
	};
};
