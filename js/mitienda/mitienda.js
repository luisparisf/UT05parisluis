// import * as ShoppingCartTest from './shoppingcart/shoppingCartTest.js';
// import {testShoppingCart as newTestFunctionName} from './shoppingcart/shoppingCartTest.js';
// import * as ManagerCartTest from './manager/managerTest.js';
//import './shoppingcart/shoppingCartApp.js';
import './manager/managerApp.js';

function showResultLayer(){
	// Mostramos capa de ejemplos
	let examples = $('#examples');
	let examplesRows = examples.children();
	examplesRows.hide();
	$(examplesRows[examplesRows.length - 1]).show();
	$('#result').empty();

	// Invocación de ejemplos
	$$result.clear();
}

//showResultLayer();

