import { adicionarEstilos } from './adicionarEstilos';

test('adicionarEstilos', () => {
	adicionarEstilos('.a, .b, .c {}');
	expect(document.head).toMatchInlineSnapshot(`
		<head>
		  <style>
		    .a, .b, .c {}
		  </style>
		</head>
	`);
});
