import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';
import { Product, Shoe, Shirt, Trouser, Category, Coords, Store} from '../entities/products.js';

class ManagerException extends BaseException {
	constructor (message = 'Error: Manager Exception.', fileName, lineNumber){
			super(message, fileName, lineNumber);
			this.name = 'ManagerException';
	}
}

class ObjecManagerException extends ManagerException {
  constructor (param, className, fileName, lineNumber){
    super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
    this.param = param;
    this.param = className;
    this.name = 'ObjecManagerException';
  }
}

class CategoryExistsException extends ManagerException {
  constructor (category, fileName, lineNumber){
    super(`Error: The ${category.title} already exists in the manager.`, fileName, lineNumber);
    this.category = category;
    this.name = 'CategoryExistsException';
  }
}

class StoreExistsException extends ManagerException {
	constructor(store, fileName, lineNumber) {
		super(`Error: The ${store.name} already exists in the manager.`, fileName, lineNumber);
		this.store = store;
		this.name = 'StoreExistsException';
	}
}

class ProductExistsException extends ManagerException {
  constructor (product, fileName, lineNumber){
    super(`Error: The ${product.serialNumber} already exists in the manager.`, fileName, lineNumber);
    this.product = product;
    this.name = 'ProductExistsException';
  }
}

class ProductExistInCategoryException extends ManagerException {
  constructor (product, category, fileName, lineNumber){
    super(`Error: The ${product.serialNumber} already exist in ${category.title}.`, fileName, lineNumber);
    this.category = category;
    this.product = product;
    this.name = 'ProductExistInCategoryException';
  }
}

class CategoryNotExistException extends ManagerException {
  constructor (category, fileName, lineNumber){
    super(`Error: The ${category.title} doesn't exist in the manager.`, fileName, lineNumber);
    this.category = category;
    this.name = 'CategoryNotExistException';
  }
}

class StoreNotExistException extends ManagerException {
	constructor(store, fileName, lineNumber) {
		super(`Error: The ${store.name} doesn't exist in the manager.`, fileName, lineNumber);
		this.store = store;
		this.name = 'StoreNotExistException';
	}
}

class ProductNotExistInManagerException extends ManagerException {
  constructor (product, fileName, lineNumber){
    super(`Error: The ${product.serialNumber} doesn't exist in the manager.`, fileName, lineNumber);
    this.product = product;
    this.name = 'ProductNotExistInManagerException';
  }
}

class ProductNotExistInCategoryException extends ManagerException {
  constructor (product, category, fileName, lineNumber){
    super(`Error: The ${product.serialNumber} doesn't exist in ${category.title}.`, fileName, lineNumber);
    this.category = category;
    this.product = product;
    this.name = 'ProductNotExistInCategoryException';
  }
}

let Manager = (function () {
  let instantiated;

  function init(){ //Inicialización del Singleton
		class Manager {
			#categories = [];
			#stores = [];
			#products = [];

			#order = {
				serialNumber: (productA, productB) => {return productA.serialNumber < productB.serialNumber? -1 : 1},
				brand: (productA, productB) => {return productA.brand < productB.brand? -1 : 1},
				model: (productA, productB) => {return productA.model < productB.model? -1 : 1},
				price: (productA, productB) => {return productA.price < productB.price? -1 : 1},
			}

			constructor (){
				if (!new.target) throw new InvalidAccessConstructorException();
			}

			addCategory(){
				for (let category of arguments){
					if (!(category instanceof Category)) {
						throw new ObjecManagerException ('category', 'Category');
					}
					let position = this.#getCategoryPosition(category);
					if (position === -1){
						this.#categories.push({
							category: category,
							products: []
						});
						this.#categories.sort((catA, catB) => {
							return (catA.title.toLocaleLowerCase() < catB.title.toLocaleLowerCase())? -1:1;
						})
					} else {
						throw new CategoryExistsException(category);
					}
				}
				return this;
			}

			addCategoryInStore(store) {
				if (!store)		throw new EmptyValueException('store')

				for (let i = 1; i < arguments.length; i++) {
					let category = arguments[i]

					if (!(category instanceof Category)) {
						throw new ObjecManagerException('category', 'Category');
					}

					let position = this.#getCategoryPosition(category);
					let storesx = this.#getStorePosition(store);

					if (position === -1) {
						this.#categories.push(category);

						this.#categories.sort((catA, catB) => {
							return (catA.title.toLocaleLowerCase() < catB.title.toLocaleLowerCase()) ? -1 : 1;
						})

						this.#stores[storesx].categories.push(category)

						this.#stores[storesx].categories.sort((catA, catB) => {
							return (catA.title.toLocaleLowerCase() < catB.title.toLocaleLowerCase()) ? -1 : 1;
						})
					} else {
						let categoryPos = this.#getCategoryPositionInStore(category, store)

						if (categoryPos >= 0) {
							throw new CategoryExistsException(category);
						}

						this.#stores[storesx].categories.push(category)

						this.#stores[storesx].categories.sort((catA, catB) => {
							return (catA.title.toLocaleLowerCase() < catB.title.toLocaleLowerCase()) ? -1 : 1;
						})
					}
				}
				return this;
			}

			//Añadir una nueva tienda
			addStore() {
				for (let store of arguments) {
					if (!(store instanceof Store)) {
						throw new ObjecManagerException('store', 'Store');
					}
					let position = this.#getStorePosition(store);
					if (position === -1) {
						this.#stores.push(store);
						this.#stores.sort((stoA, stoB) => {
							return (stoA.name.toLocaleLowerCase() < stoB.name.toLocaleLowerCase()) ? -1 : 1;
						})
					} else {
						throw new StoreExistsException(store);
					}
				}
				return this
			}

			#getCategoryPosition(category){
				return this.#categories.findIndex(x => x.title === category.title);
			}

			#getStorePosition(store) {
				return this.#stores.findIndex(x => x.name === store.name);
			}

			addProduct(){
				for (let product of arguments){
					if (!(product instanceof Product)) {
						throw new ObjecManagerException ('product', 'Product');
					}
					let position = this.#getProductPosition(product);
					if (position === -1){
						this.#products.push(product);
						this.#products.sort((productA, productB) => {
							if (productA.price < productB.price){
								return -1;
							} else if (productA.price > productB.price){
								return 1;
							} else {
								return 0
							}
						});
					} else {
						throw new ProductExistsException(product);
					}
				}
				return this;
			}

			#getProductPosition(product){
				return this.#products.findIndex(x => x.serialNumber === product.serialNumber);
			}

			addProductInCategory (category){
				if (!(category instanceof Category)) {
					throw new ObjecManagerException ('category', 'Category');
				}
				let pCategory = this.#getCategoryPosition(category);
				if (pCategory === -1){
					this.addCategory(category);
					pCategory = this.#getCategoryPosition(category);
				}

				for (let i = 1; i < arguments.length; i++){
					let product = arguments[i];
					if (!(product instanceof Product)) {
						throw new ObjecManagerException ('product', 'product');
					}
					let pProduct = this.#getProductPosition (product);
					if (pProduct === -1){
						this.addProduct(product);
						pProduct = this.#getProductPosition (product);
					}
					let position = this.#getProductPositionInCategory(product,  this.#categories[pCategory]);
					if (position === -1){
						this.#categories[pCategory].products.push(this.#products[pProduct]);
						this.#categories[pCategory].products.sort((productA, productB) => {
							return (productA.price > productB.price)? -1:1;
						});
					} else {
						throw new ProductExistInCategoryException(product, category);
					}
				}
				return this;
			}

			//Añadir un producto asociado a una categoria
			addProduct2(category) {
				if (!category) throw new EmptyValueException('category')

				let categoryx = this.#getCategoryPosition(category);

				if (categoryx === -1) {
					this.addCategory(category);
					categoryx = this.#getCategoryPosition(category);
				}

				for (let i = 1; i < arguments.length; i++) {
					let product = arguments[i]

					let productx = this.#getProductPosition(product);

					if (productx === -1) {
						this.addProduct(product);
						productx = this.#getProductPosition(product);
					}

					let position = this.#getProductPositionInCategory(product, this.#categories[categoryx]);
					
					if (position === -1) {
						this.#categories[categoryx].products.push(this.#products[productx]);
						this.#categories[categoryx].products.sort((productA, productB) => {
							return (productA.price > productB.price) ? -1 : 1;
						});
					} else {
						throw new ProductExistInCategoryException(product, category);
					}
				}
				return this
			}

			//Añadimos un producto en una tienda con una cantidad
			/*addProductInStore(store) {
				if (!store) throw new EmptyValueException('store')

				let storex = this.#getStorePosition(store);

				if (storex === -1) {
					this.addStore(store);
					storex = this.#getStorePosition(store);
				}

				for (let i = 1; i < arguments.length; i++) {
					let product = arguments[i]

					let productx = this.#getProductPosition(product);

					if (productx === -1) {
						this.addProduct(product);
						productx = this.#getProductPosition(product);
					}

					let position = this.#getProductPositionInStore(product, this.#stores[storex]);

					if (position === -1) {
						this.#stores[storex].products.push(this.#products[productx]);
						this.#stores[storex].products.sort((productA, productB) => {
							return (productA.price > productB.price) ? -1 : 1;
						});
					}
					else {
						throw new ProductExistInStoreException(product, category);
					}
				}

				for (let i in this.categories) {
					for (let j in this.categories[i].products) {
						if (this.categories[i].products[j].product.serialNumber == product.serialNumber) {
							let obj = {
								store: store,
								quantity: quantity
							}

							for (let item of this.categories[i].products[j].stores) {
								if (item.store.cif == store.cif) throw new DuplicatedValueException('product in store')
							}
							//Añadimos tiendas con productos para relacionarlo
							this.categories[i].products[j].stores.push(obj)
						}
					}
				}

				//Añadimos el producto de manera literal 
				for (let i in this.stores) {
					if (this.stores[i].store.cif == store.cif) {
						let obj = {
							product: product,
							type: product.type,
							quantity: quantity
						}

						this.stores[i].products.push(obj)

						return this.stores[i].products.length
					}
				}
			}*/

			#getProductPositionInCategory(product, category){
				return category.products.findIndex(x => x.serialNumber === product.serialNumber);
			}

			#getCategoryPositionInStore(category, store) {
				return store.categories.findIndex(x => x.title === category.title);
			}

			//Devuelve un iterator de las categorías
			get categories(){
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto
				let array = this.#categories;
				return {
					* [Symbol.iterator](){
						for (let arrayCat of array){
							yield arrayCat;
						}
					}
				}
			}

			//Devuelve un iterator de las tiendas
			get stores() {
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto
				let array = this.#stores;
				return {
					*[Symbol.iterator]() {
						for (let arrayStore of array) {
							yield arrayStore;
						}
					}
				}
			}

			//Devuelve un iterator de los productos
			get products(){
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto
				let array = this.#products;
				return {
					* [Symbol.iterator](){
						for (let product of array){
							yield product;
						}
					}
				}
			}

			*getCategoryProducts(category){
				if (!(category instanceof Category)) {
					throw new ObjecManagerException ('category', 'Category');
				}
				let position = this.#getCategoryPosition(category);
				if (position !== -1){
					let nextIndex = 0;
					let array = this.#categories[position].products;
					for (let product of array){
						yield product;
					}
				} else{
					throw new CategoryNotExistException(category);
				}
			}

			//Devolvemos todos los productos de una categoría con sus stocks
			getCategoryProducts2(category) {
				if (!category) throw new EmptyValueException('category')

				for (let i in this.#categories) {
					if (this.#categories[i].title == category.title) {
						return this.#categories[i].products
					}
					else {
						return []
					}
				}
			}

			getStoreProducts2(store) {
				if (!store) throw new EmptyValueException('store')

				for (let i in this.#stores) {
					if (this.#stores[i].cif == store.cif) {
						return this.#stores[i].categories
					}
					else {
						return []
					}
				}
			}

			toString (separator = '\n'){
				let str = '';
				for (let category of this.categories){
					str += category.title + separator;
					for (let product of this.getCategoryProducts(category)){
						str += product.toString() + separator;
					}
				}
				return str;
			}

			removeCategory(){
				for (let category of arguments){
					if (!(category instanceof Category)) {
						throw new ObjecManagerException ('category', 'Category');
					}
					let position = this.#getCategoryPosition(category);
					if (position !== -1){
						this.#categories.splice(position,1);
					} else{
						throw new CategoryNotExistException(category);
					}
				}
				return this;
			}

			removeProduct(){
				for (let product of arguments){
					if (!(product instanceof Product)) {
						throw new ObjecManagerException ('product', 'product');
					}
					let position = this.#getProductPosition(product);
					if (position !== -1){
						let storedProduct = this.#products[position];
						for (let category of this.#categories){
							let pProduct = this.#getProductPositionInCategory(storedProduct, category);
							if (pProduct !== -1){
								category.products.splice(pProduct,1);
							}
						}
						this.#products.splice(position,1);
					} else{
						throw new ProductNotExistInManagerException(product);
					}
				}
				return this;
			}

			removeProductInCategory(category){
				if (!(category instanceof Category)) {
					throw new ObjecManagerException ('category', 'Category');
				}
				let pCategory = this.#getCategoryPosition(category);
				if (pCategory !== -1){
					for (let i = 1; i < arguments.length; i++){
						let product = arguments[i];
						if (!(product instanceof Product)) {
							throw new ObjecManagerException ('product', 'product');
						}
						let pProduct = this.#getProductPositionInCategory(product, this.#categories[pCategory]);
						if (pProduct !== -1){
							this.#categories[pCategory].products.splice(pProduct,1);
						} else {
							throw new ProductNotExistInCategoryException(product, this.#categories[pCategory].category);
						}
					}
				} else{
					throw new CategoryNotExistException(category);
				}

				return this;
			}

			clean (){
				this.#categories.length = 0;
				this.#products.length = 0;
			}

			* getTypeProducts(type, field){
				let nextIndex = 0;
				let array = this.#products.filter(product => {
					return product instanceof type;
				});
				if (this.#order[field]){
					array.sort(this.#order[field]);
				}

				for (let product of array){
					yield product;
				}
			}

			getCategory(title){
				let position = this.#categories.findIndex(x => x.title === title);
				if (position === -1)
					throw new CategoryNotExistException(new Category(title));
				return this.#categories[position];
			}

			getStore(cif) {
				let position = this.#stores.findIndex(x => x.cif === cif);
				if (position === -1)
					throw new StoreNotExistException(new Store(cif));
				return this.#stores[position];
			}

			getProduct(serialNumber){
				let position = this.#products.findIndex(x => x.serialNumber === serialNumber);
				if (position === -1)			throw new ProductNotExistInManagerException({ serialNumber })
				return this.#products[position];
			}

			//Devolvemos todos los productos de una categoría con sus stocks
			getStoreProductsGroupedByCategory(store) {
				if (!store) throw new EmptyValueException('store')

				let result = []

				/*
				[
					{
						category: { ... },
						products: [
							{ ... },
							{ ... },
							...
						]
					}
				]
				*/

				let storesx = this.#getStorePosition(store)

				if (storesx == -1) {
					throw new StoreNotExistException(store)
				}

				return this.#stores[storesx].categories
			}
		}

		Object.defineProperty(Manager.prototype, 'categories', {enumerable: true});
		Object.defineProperty(Manager.prototype, 'products', {enumerable: true});

		let manager = new Manager();
		Object.freeze(manager);
		return manager;
	}
  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    }
  };
})();

export {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException};
export default Manager;
export {BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';
export { Product, Shoe, Shirt, Trouser, Category, Coords, Store} from '../entities/products.js';

