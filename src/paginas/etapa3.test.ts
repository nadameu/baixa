/**
 * @jest-environment jsdom
 */

import * as Constantes from '../constantes';
import { etapa3 } from './etapa3';

beforeEach(() => {
	fake(window);
	window.opener = fake({} as Window);
	window.opener.documentosAbertos = {
		fechada: fake({} as Window, true),
		aberta1: fake({} as Window),
		aberta2: fake({} as Window),
	};
});

test('Sem preferência salva', () => {
	localStorage.removeItem(Constantes.FECHAR_APOS_BAIXAR);

	etapa3();

	expect(window.closed).toBe(false);
	expect(window.opener.closed).toBe(false);
	expect(window.opener.documentosAbertos.fechada.closed).toBe(true);
	expect(window.opener.documentosAbertos.aberta1.closed).toBe(false);
	expect(window.opener.documentosAbertos.aberta2.closed).toBe(false);
});

test('Preferência salva (Não)', () => {
	localStorage.setItem(Constantes.FECHAR_APOS_BAIXAR, 'N');

	etapa3();

	expect(window.closed).toBe(false);
	expect(window.opener.closed).toBe(false);
	expect(window.opener.documentosAbertos.fechada.closed).toBe(true);
	expect(window.opener.documentosAbertos.aberta1.closed).toBe(false);
	expect(window.opener.documentosAbertos.aberta2.closed).toBe(false);
});

test('Preferência salva (Sim)', () => {
	localStorage.setItem(Constantes.FECHAR_APOS_BAIXAR, 'S');

	etapa3();

	expect(window.closed).toBe(true);
	expect(window.opener.closed).toBe(true);
	expect(window.opener.documentosAbertos.fechada.closed).toBe(true);
	expect(window.opener.documentosAbertos.aberta1.closed).toBe(true);
	expect(window.opener.documentosAbertos.aberta2.closed).toBe(true);
});

function fake(win: Window, isClosed = false): Window {
	let closed = isClosed;
	Object.defineProperties(win, {
		closed: { get: () => closed, configurable: true },
		close: {
			value: () => {
				closed = true;
			},
			configurable: true,
		},
		setTimeout: {
			value: (f: Function, _: number, ...args: any[]) => f(...args),
			configurable: true,
		},
	});
	return win;
}
