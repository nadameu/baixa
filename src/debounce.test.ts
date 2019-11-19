import { debounce } from './debounce';

test('debounce', () => {
	jest.useFakeTimers();
	const fn = jest.fn();
	const debounced = debounce(100, fn, { clearTimeout, setTimeout });

	debounced();

	jest.advanceTimersByTime(20);
	debounced();

	jest.advanceTimersByTime(20);
	debounced();

	jest.advanceTimersByTime(99);
	expect(fn).toHaveBeenCalledTimes(0);

	jest.advanceTimersByTime(1);
	expect(fn).toHaveBeenCalledTimes(1);

	jest.runAllTimers();
	expect(fn).toHaveBeenCalledTimes(1);
});
