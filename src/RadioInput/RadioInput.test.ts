import { JSDOM } from 'jsdom';
import { R } from '.';

test('fromId', () => {
	const { window } = new JSDOM(`
<!doctype html><html><head></head><body>
	<div id="nao-eh-input"></div>
	<input id="nao-eh-radio" />
	<input id="nao-possui-name" type="radio" />
	<input id="name-vazio" name="" type="radio" />
	<input id="ok" type="radio" name="my-name" />
</body></html>`);
	const { document } = window;

	expect(R.fromId('id-inexistente', document)).toBeNull();
	expect(R.fromId('nao-eh-input', document)).toBeNull();
	expect(R.fromId('nao-eh-radio', document)).toBeNull();
	expect(R.fromId('nao-possui-name', document)).toBeNull();
	expect(R.fromId('name-vazio', document)).toBeNull();
	expect(R.fromId('ok', document)).toEqual(document.getElementById('ok'));
});
