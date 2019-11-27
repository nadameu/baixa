import { Grupo } from '.';

describe('fromIds', () => {
	document.body.innerHTML = `
<input id="ok" type="radio" name="grupo-a" />
<input id="nao-eh-radio" type="text" />
<input id="ok-tambem" type="radio" name="grupo-b" />
<p id="nao-eh-input"></p>
<input id="mais-um-ok" type="radio" name="grupo-a" />
`;
	describe('Inválidos', () => {
		test('Elemento repetido', () => {
			expect(Grupo.fromIds(['ok', 'ok'])).toBeNull();
		});

		test('Um elemento inválido em meio a outros válidos', () => {
			expect(
				Grupo.fromIds(['ok', 'ok-tambem', 'mais-um-ok', 'nao-eh-radio'])
			).toBeNull();
		});

		test('Atributos "name" diferentes', () => {
			expect(Grupo.fromIds(['ok', 'ok-tambem'])).toBeNull();
		});
	});

	describe('Válidos', () => {
		test('Vazio', () => {
			expect(Grupo.fromIds([])).toEqual([]);
		});

		test('Todos os elementos inválidos', () => {
			expect(Grupo.fromIds(['inexistente-1', 'inexistente-2'])).toEqual([]);
		});

		test('Um elemento válido', () => {
			expect(Grupo.fromIds(['ok'])).toEqual([document.getElementById('ok')]);
		});

		test('Mesmo atributo "name"', () => {
			const ids = ['ok', 'mais-um-ok'];
			expect(Grupo.fromIds(ids)).toEqual(
				ids.map(id => document.getElementById(id)!)
			);
		});
	});
});
