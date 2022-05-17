import Manager from './manager.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './manager.js';
import { Product, Shoe, Shirt, Trouser, Category, Coords, Store} from './manager.js';
import {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException} from './manager.js';

class ManagerController {
  //Campos privados
  #manager;
  #managerView;

	#loadManagerObjects(){
		//Creamos categorías
		let category1 = new Category('Calzado', 'Los mejores zapatos de la mejor calidad.', 'img/categories/calzado.jpg');
		let category2 = new Category('Camisas', 'Todo para cubrir tu torso con calidad y estilo.','img/categories/camisas.webp');
		let category3 = new Category('Pantalones', 'Para lucir a donde quiera que vayas.', 'img/categories/pantalones.jpg');

		//Creamos tiendas
		const coord1 = new Coords('28.232', '15.234')
		const store1 = new Store('121243', 'img/stores/sprinter.png', 'Sprinter', 'Madrid, España', '+34 (163) 121243', coord1)

		const coord2 = new Coords('10.232', '-20.234')
		const store2 = new Store('872043', 'img/stores/bershka.jpg', 'Bershka', 'Barcelona, España', '+34 (534) 872043', coord2)

		const coord3 = new Coords('-12.483', '10.246')
		const store3 = new Store('123853', 'img/stores/decathlon.jpg', 'Decathlon', 'Ciudad Real, España', '+34 (263) 123853', coord3)

		//Añadimos categorías al Modelo
		let manager = this.#manager;
		//manager.addCategory(category1, category2, category3);

		//Añadimos tiendas al Modelo
		manager.addStore(store1, store2, store3);

		//Creamos productos
		let product1 = new Shoe('A-1', 'Mercurial', 'Ideal para jugar al fútbol profesional', 10, 1, 'img/products/zapatonike.jpg', 'Azul', 8)
		let product2 = new Shoe('A-2', 'Originals', 'Zapato para salir', 15, 2, 'img/products/zapatoadidas.jpg', 'Blanco', 7)
		let product3 = new Shoe('A-3', 'Predator', 'Para jugar fútbol', 20, 3, 'img/products/zapatoadidas2.jpg', 'Blanco', 9)

		let product4 = new Shirt('B-1', 'Camisa deportiva', 'Camisa para hacer deporte', 10, 0, 'img/products/camisanike.jpg', 'Blanco', 'M', 'Corta')
		let product5 = new Shirt('B-2', 'Camisa logo grande', 'Camisa con el logo grande', 20, 2, 'img/products/camisanike2.jpg', 'Negra', 'L', 'Corta')
		let product6 = new Shirt('B-3', 'Camisa deportiva', 'Camisa de calidad ideal para caminar', 10, 0, 'img/products/camisaadidas.jpg', 'Azul', 'S', 'Corta')
		//let product7 = new Shirt('B-4', 'Camisa originals', 'Camisa para uso cotidiano', 20, 2, 'img/products/camisaadidas2.webp', 'Roja', 'M', 'Corta')

		let product8 = new Trouser('C-1', 'Jean', 'Pantalon para diario', 15, 2, 'img/products/pantalondama.jpg', 'Azul', '28/30', 'Dama')
		let product9 = new Trouser('C-2', 'Bermudas', 'Ideal para un día caluroso', 15, 2, 'img/products/bermudaslevis.jpg', 'gris', '34/36', 'Caballero')
		let product10 = new Trouser('C-3', 'Pantalon deportivo', 'Para salir a correr en el parque', 15, 2, 'img/products/pantalonnike.webp', 'negro', '34/36', 'Caballero')

		manager.addCategoryInStore(store1, category1, category2, category3)
		manager.addCategoryInStore(store2, category3)
		manager.addCategoryInStore(store3, category1, category2)

		manager.addProduct2(category1, product1, product2, product3);
		manager.addProduct2(category2, product4, product5, product6); //, product7);
		manager.addProduct2(category3, product8, product9, product10);
	}

	constructor(model, view){
		console.log('Manager Controller');
		this.#manager = model;
		this.#managerView = view;

		// Eventos iniciales del Controlador
		this.onLoad();
		this.onInit();

		// Enlazamos handlers con la vista
		this.#managerView.bindInit(this.handleInit);
		this.#managerView.bindProductsTypeList(this.handleProductsTypeList);
	}

	onLoad = () => {
		this.#loadManagerObjects();
		this.#managerView.showProductTypes();
		this.onAddStore();
		this.onAddCategory();
		
		this.#managerView.bindViewHome(
			this.handleViewHome
		)
	}

	onInit = () => {
		this.#managerView.showCategories(this.#manager.categories);
		this.#managerView.showStores(this.#manager.stores);

		this.#managerView.bindProductsByCategory(
			this.handleProductsByCategory
		);
		this.#managerView.bindCategoriesByStore(
			this.handleCategoriesByStore
		);
	}

	onAddCategory = () => {
		this.#managerView.showCategoriesInMenu(this.#manager.categories);

		this.#managerView.bindViewCategory(
			this.handleViewCategory
		);
	}

	onAddStore = () => {
		this.#managerView.showStoresInMenu(this.#manager.stores);

		this.#managerView.bindViewStore(
			this.handleViewStore
		);
	}

	handleInit = () => {
		this.onInit();
	}

	handleProductsByCategory = (title) => {
		let category = this.#manager.getCategory(title);
		
		this.#managerView.listProducts(category.products, category.title);
		this.#managerView.bindShowProduct(
			this.handleShowProduct
		);
	}

	handleCategoriesByStore = (cif) => {
		let store = this.#manager.getStore(cif);

		this.#managerView.listCategoriesByStore(store.categories, store.name);
		this.#managerView.bindShowProduct(
			this.handleShowProduct
		);
	}

	handleProductsTypeList = (type) => {
		let instance = {
			Laptop: Laptop,
			Camera: Camera,
			Smartphone: Smartphone,
			Tablet: Tablet,
		}
		if (instance[type]){
			this.#managerView.listProducts(this.#manager.getTypeProducts(instance[type]), type);
		} else {
			throw new Error (`${type} isn't a type of Product.`)
		}
		this.#managerView.bindShowProduct(this.handleShowProduct);
	}

	handleShowProduct = (serial) => {
		try {
			let product = this.#manager.getProduct(serial);
			this.#managerView.showProduct(product);

			this.#managerView.bindGoBack(
				this.handleGoBack
			);
		} catch (error){
			console.log(error)
			this.#managerView.showProduct(null, 'No existe este producto en la página.');
		}
	}

	handleGoBack = () => {
		this.#managerView.goBack()
	}

	handleViewHome = () => {
		this.#managerView.viewHome(this.#manager.categories, this.#manager.stores);

		this.#managerView.bindProductsByCategory(
			this.handleProductsByCategory
		);
		this.#managerView.bindCategoriesByStore(
			this.handleCategoriesByStore
		);
	}

	handleViewCategory = (title) => {
		let category = this.#manager.getCategory(title);
		this.#managerView.viewCategory(category.products, category.title);
	}

	handleViewStore = (cif) => {
		let store = this.#manager.getStore(cif);
		this.#managerView.viewStore(store.categories, store.name);
	}
}

export default ManagerController;
