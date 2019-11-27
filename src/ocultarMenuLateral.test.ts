import { ocultarMenuLateral } from './ocultarMenuLateral';

test('ocultarMenuLateral', () => {
	document.body.innerHTML =
		'<div id="wrapper" class="abre-automaticamente"><div id="sidebar"></div></div>';

	ocultarMenuLateral(
		document.getElementById('wrapper')!,
		document.getElementById('sidebar')!
	);

	expect(document.body).toMatchInlineSnapshot(`
		<body>
		  <div
		    class="toggled"
		    id="wrapper"
		    style=""
		  >
		    <div
		      id="sidebar"
		      style=""
		    />
		  </div>
		</body>
	`);
});
