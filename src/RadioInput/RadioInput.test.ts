/**
 * @jest-environment jsdom
 */

import { RadioInput } from '.';

test('fromId', () => {
	document.body.innerHTML = `
<div id="nao-eh-input"></div>
<input id="nao-eh-radio" />
<input id="nao-possui-name" type="radio" />
<input id="name-vazio" name="" type="radio" />
<input id="ok" type="radio" name="my-name" />
`;

	expect(RadioInput.fromId('id-inexistente')).toBeNull();
	expect(RadioInput.fromId('nao-eh-input')).toBeNull();
	expect(RadioInput.fromId('nao-eh-radio')).toBeNull();
	expect(RadioInput.fromId('nao-possui-name')).toBeNull();
	expect(RadioInput.fromId('name-vazio')).toBeNull();
	expect(RadioInput.fromId('ok')).toEqual(document.getElementById('ok'));
});
