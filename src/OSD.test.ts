import { expect, test } from 'vitest';
import { OSD } from './OSD';

test('Resultado', () => {
	Object.defineProperty(document.documentElement, 'clientHeight', {
		get: () => 1002,
	});
	document.body.innerHTML = '<div>Elemento antes do resultado</div>';

	const resultado = OSD('"Mensagem inicial"');
	const div = document.querySelector('.gmResultado') as HTMLDivElement;

	expect(document.documentElement).toMatchInlineSnapshot(`
		<html>
		  <head>
		    <style
		      id="/home/nadameu/sandbox/baixa/src/OSD.css"
		      type="text/css"
		    />
		    <style />
		  </head>
		  <body>
		    <div>
		      Elemento antes do resultado
		    </div>
		    <div
		      class="gmResultado"
		      style="transition: opacity 500ms linear 1200ms; opacity: 0;"
		    >
		      "Mensagem inicial"
		    </div>
		  </body>
		</html>
	`);

	resultado.ocultar();
	div.dispatchEvent(new Event('transitioncancel'));

	expectStylesOf(div).toContain({ opacity: '0', fontSize: '334px' });

	resultado.mostrarTexto('45');

	expectStylesOf(div).toContain({
		opacity: '0',
		transition: 'opacity 500ms linear 150ms',
		fontSize: '334px',
	});
	expect(div.textContent).toBe('45');

	div.dispatchEvent(new Event('transitionend'));

	expectStylesOf(div).toContain({
		opacity: '0',
		transition: 'opacity 500ms linear 150ms',
		fontSize: '334px',
	});
});

function expectStylesOf(actual: HTMLElement) {
	return {
		toContain(expected: Partial<CSSStyleDeclaration>) {
			const values: Record<string, any> = {};
			for (const key of Object.keys(expected))
				values[key] = actual.style[key as keyof CSSStyleDeclaration];
			expect(values).toEqual(expected);
		},
	};
}
