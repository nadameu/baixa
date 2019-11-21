export function queue(microtask: () => void, win = window): void {
	Promise.resolve()
		.then(microtask)
		.catch(err =>
			win.setTimeout(() => {
				throw err;
			}, 0)
		);
}
