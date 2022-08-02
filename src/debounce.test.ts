import { expect, test, vitest } from 'vitest';
import { debounce } from './debounce';

test('debounce', () => {
	vitest.useFakeTimers();
	const fn = vitest.fn();
	const debounced = debounce(100, fn);

	debounced();

	vitest.advanceTimersByTime(20);
	debounced();

	vitest.advanceTimersByTime(20);
	debounced();

	vitest.advanceTimersByTime(99);
	expect(fn).toHaveBeenCalledTimes(0);

	vitest.advanceTimersByTime(1);
	expect(fn).toHaveBeenCalledTimes(1);

	vitest.runAllTimers();
	expect(fn).toHaveBeenCalledTimes(1);
});
