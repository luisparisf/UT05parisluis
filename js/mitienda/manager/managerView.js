import Manager from './manager.js';

class ManagerView {
  constructor(){
		this.main = $('main');
	  	this.categoryProducts = $('#category-products');
	  	this.storeCategories = $('#store-categories');
		this.categories = $('#categories');
		this.categoriesx = $('#categoriesx');
		this.storesx = $('#storesx');
		this.menu = $('.navbar-nav');

		$('#store').hide()
		$('#category').hide()
  }

	bindInit(handler){
		$('#init').click((event) => {
			handler();
		});
		$('#logo').click((event) => {
			handler();
		});
	}

	showProductTypes() {
		this.categories.empty();
		this.categories.append(`<div id="type-list" class="row">
			<div class="col-lg-3 col-md-6"><a data-type="Camera" href="#product-list">
					<div class="cat-list-image"><img alt="Categoría cámaras" src="img/catcamara.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Cámaras</h3>
						<div>Digitales y reflex</div>
					</div>
				</a>
			</div>
			<div class="col-lg-3 col-md-6"><a data-type="Smartphone" href="#product-list">
					<div class="cat-list-image"><img alt="Categoría móviles" src="img/catmovi.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Móviles</h3>
						<div>Modelos exclusivos</div>
					</div>
				</a>
			</div>
			<div class="col-lg-3 col-md-6"><a data-type="Laptop" href="#product-list">
					<div class="cat-list-image"><img alt="Categoría portátiles" src="img/catpportatil.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Portátiles</h3>
						<div>Intel y AMD</div>
					</div>
				</a>
			</div>
			<div class="col-lg-3 col-md-6"><a data-type="Tablet" href="#product-list">
					<div class="cat-list-image"><img alt="Categoría Tablets" src="img/cattablet.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Tablets</h3>
						<div>Android y iPad</div>
					</div>
				</a>
			</div>
		</div>`);
	}

	showCategories(categories) {
		for (let category of categories) {
			this.categoriesx.append(`
			<div class="col mb-5">
				<div class="card h-100">
					<!-- Product image-->
					<img class="card-img-top" src="${category.url}" alt="..." style="max-height: 200px; object-fit: cover; aspect-ratio: 1;" />
					<!-- Product details-->
					<div class="card-body p-4">
						<div class="text-center">
							<!-- Product name-->
							<h5 class="fw-bolder">${category.title}</h5>
							<!-- Product price-->
							${category.description}
						</div>
					</div>
					<!-- Product actions-->
					<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
						<div class="text-center"><a data-category="${category.title}" class="btn btn-outline-dark mt-auto" href="#product-list">Ver productos</a></div>
					</div>
				</div>
			</div>`)
		}
	}

	showStores(stores) {
		for (let store of stores) {
			this.storesx.append(`
			<div class="col mb-5">
				<div class="card h-100">
					<!-- Product image-->
					<img class="card-img-top" src="${store.url}" alt="..." style="max-height: 200px; object-fit: cover; aspect-ratio: 1;" />
					<!-- Product details-->
					<div class="card-body p-4">
						<div class="text-center">
							<!-- Product name-->
							<h5 class="fw-bolder">${store.name}</h5>
							<!-- Product price-->
							${store.address}
							<br>
							📞 ${store.phone}
						</div>
					</div>
					<!-- Product actions-->
					<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
						<div class="text-center"><a data-store="${store.cif}" class="btn btn-outline-dark mt-auto" href="#product-list">Ver productos</a></div>
					</div>
				</div>
			</div>`)
		}
	}

	showCategoriesInMenu (categories) {
		let li = $(`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Categorías
			</a>
		</li>`);
		let container = $('<div id="cats-menu" class="dropdown-menu" aria-labelledby="navCats"></div>');
		//if (!category.done) shopping
		for (let category of categories){
			container.append(`<a data-category="${category.title}" class="dropdown-item" href="#category-detail">${category.title}</a>`);
		}
		li.append(container);
		this.menu.append(li);
	}

	showStoresInMenu(stores) {
		let li = $(`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Tiendas
			</a>
		</li>`);
		let container = $('<div id="stores-menu" class="dropdown-menu" aria-labelledby="navCats"></div>');
		//if (!category.done) shopping
		for (let store of stores) {
			container.append(`<a data-store="${store.cif}" class="dropdown-item" href="#store-detail">${store.name}</a>`);
		}
		li.append(container);
		this.menu.append(li);
	}

	showProduct(product) {
		$('#products-of-category').hide();
		$('#product-detail').show();
		$('#product-detail').empty();

		let productInfo = $(`
			<div id="productsx" class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-1 row-cols-xl-1 justify-content-center">
				<div class="col mb-5">
					<div class="card h-100">
						<div class="row px-2 gx-4 gx-lg-5 row-cols-2 row-cols-md-2 row-cols-xl-2 justify-content-center">
							<div class="col-4 py-2">
								<img class="ml-2" src="${product.image}" alt="..." style="border-radius: 10px; max-width: 100%;" />
							</div>

							<div class="col-8 pl-2 py-2">
								<div class="card-body">
									<div id="product-specifications" class="text-left">
										<h5 class="fw-bolder">${product.name}</h5>
										<span>${product.description}</span>
										<br>
										<span>${product.price} €</span>
										<br>
										<span>Impuesto: (${product.tax}%)</span>
										<br>
									</div>
								</div>
								<div class="text-left card-footer p-4 pt-0 border-top-0 bg-transparent">
									<div class="text-left"><a id="goback" class="btn btn-outline-dark mt-auto" href="#product-list">Volver</a></div>
								</div>
							</div>
					</div>
				</div>
			</div>`);

		$('#product-detail').append(`<h1 id="product-title">${product.name}</h1>`)
		$('#product-detail').append(productInfo);

		this.categoryProducts.append($('#product-detail'));

		if (product.type == 'Zapato') {
			$('#product-specifications').append(`
				<span>Color: ${product.color}</span>
				<br>
				<span>Tamaño: ${product.size}</span>
			`)
		}
		else if (product.type == 'Camisa') {
			$('#product-specifications').append(`
				<span>Tipo de manga: ${product.sleeved}</span>
				<br>
				<span>Color: ${product.color}</span>
				<br>
				<span>Tamaño: ${product.size}</span>
			`)
		}
		else {
			$('#product-specifications').append(`
				<span>Género: ${product.genre}</span>
				<br>
				<span>Color: ${product.color}</span>
				<br>
				<span>Tamaño: ${product.size}</span>
			`)
		}
	}

	goBack() {
		$('#product-detail').hide()
		$('#products-of-category').show()
	}

	listProducts(products, title) {
		$('#product-detail').hide()
		$('#products-of-category').show()

		if ($('#selected-category').text() == title) {
			$('#products-of-category').empty()
			return
		}

		$('#products-of-category').empty()

		let category_title = $('<h1 id="selected-category"></h1>').text(title).css({ 'text-align': 'center' })

		$('#products-of-category').append(category_title)

		let productsx = $(`
			<div id="productsx" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
			</div>`);

		for (let product of products){
			productsx.append(`
			<div class="col mb-5">
				<div class="card h-100">
					<img class="card-img-top" src="${product.image}" alt="..." style="aspect-ratio: 1; object-fit: cover; max-height: 200px; max-width: 100%;" />
					<div class="card-body p-4">
						<div class="text-center">
							<h5 class="fw-bolder">${product.name}</h5>
							${product.description}
							<br>
							${product.price} €
						</div>
					</div>
					<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
						<div class="text-center"><a data-product="${product.serialNumber}" class="btn btn-outline-dark mt-auto" href="#product-details">Ver más</a></div>
					</div>
				</div>
			</div>`);
		}

		$('#products-of-category').append(productsx);
	}

	listCategoriesByStore(categories, name) {
		if ($('#selected-store').text() == name) {
			$('#categories-of-store').empty()
			return
		}

		$('#categories-of-store').empty()

		let store_name = $('<h1 id="selected-store"></h1>').text(name).css({ 'text-align': 'center' })

		$('#categories-of-store').append(store_name)

		for (let category of categories) {
			let categoriesbystorex = $(`
				<div id="categoriesbystorex" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
				</div>`);

			for (let product of category.products) {
				categoriesbystorex.append(`
				<div class="col mb-5">
					<div class="card h-100">
						<img class="card-img-top" src="${product.image}" alt="..." style="aspect-ratio: 1; object-fit: cover; max-height: 200px; max-width: 100%;" />
						<div class="card-body p-4">
							<div class="text-center">
								<h5 class="fw-bolder">${product.name}</h5>
								${product.description}
								<br>
								${product.price} €
							</div>
						</div>
						<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
							<div class="text-center"><a data-product="${product.serialNumber}" class="btn btn-outline-dark mt-auto" href="#product-details">Ver más</a></div>
						</div>
					</div>
				</div>`);
			}

			$('#categories-of-store').append(`<h1>${category.title}</h1>`)
			$('#categories-of-store').append(categoriesbystorex);
		}
	}

	viewHome(categories, stores) {
		$('#store').hide()
		$('#category').hide()
		$('#homepage').show()

		$('#homepage').empty()

		$('#homepage').html(`
			<div class="container px-4 px-lg-5 mt-5">
				<div id="store-categories">
					<h1>Tiendas</h1>

					<div id="storesx" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
					</div>

					<div id="categories-of-store">
                        
                    </div>
				</div>
				
				<hr class="mb-5">

				<div id="category-products">
					<h1>Categorías</h1>

					<div id="categoriesx" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
					</div>
					
					<div id="products-of-category">
                    
                    </div>

					<div id="product-detail">
                    
                    </div>
				</div>
			</div>`)

		this.categoriesx = $('#categoriesx');
		this.storesx = $('#storesx');
		this.categoryProducts = $('#category-products');
		this.storeCategories = $('#store-categories');

		this.showCategories(categories)
		this.showStores(stores)
	}

	viewCategory(products, title) {
		$('#homepage').hide()
		$('#store').hide()
		$('#category').show()

		$('#category-titlex').text("Categoría: "+title)

		$('#the-categoriesxx').empty()

		for (let product of products) {
			$('#the-categoriesxx').append(`
			<div class="col mb-5">
				<div class="card h-100">
					<img class="card-img-top" src="${product.image}" alt="..." style="aspect-ratio: 1; object-fit: cover; max-height: 200px; max-width: 100%;" />
					<div class="card-body p-4">
						<div class="text-center">
							<h5 class="fw-bolder">${product.name}</h5>
							${product.description}
							<br>
							${product.price} €
						</div>
					</div>
					<!--<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
						<div class="text-center"><a data-product="${product.serialNumber}" class="btn btn-outline-dark mt-auto" href="#product-details">Ver más</a></div>
					</div>-->
				</div>
			</div>`);
		}
	}

	viewStore(categories, name) {
		$('#homepage').hide()
		$('#category').hide()
		$('#store').show()

		$('#store-name').text("Tienda: "+name).css({ 'text-align': 'center' })

		$('#the-categoriesx').empty()

		for (let category of categories) {
			let title = $('<h1></h1>').text(category.title)

			let categoriesbystorex = $(`
				<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
				</div>`);

			for (let product of category.products) {
				categoriesbystorex.append(`
				<div class="col mb-5">
					<div class="card h-100">
						<img class="card-img-top" src="${product.image}" alt="..." style="aspect-ratio: 1; object-fit: cover; max-height: 200px; max-width: 100%;" />
						<div class="card-body p-4">
							<div class="text-center">
								<h5 class="fw-bolder">${product.name}</h5>
								${product.description}
								<br>
								${product.price} €
							</div>
						</div>
						<!--<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
							<div class="text-center"><a data-product="${product.serialNumber}" class="btn btn-outline-dark mt-auto" href="#product-details">Ver más</a></div>
						</div>-->
					</div>
				</div>`);
			}

			$('#the-categoriesx').append(title)
			$('#the-categoriesx').append(categoriesbystorex);
		}
	}

	bindViewHome(handler) {
		$("#home").click(function (event) {
			handler();
		});
	}

	bindViewStore(handler) {
		$("#stores-menu").find('a').click(function (event) {
			handler(this.dataset.store);
		});
	}

	bindViewCategory(handler) {
		$("#cats-menu").find('a').click(function (event) {
			handler(this.dataset.category);
		});
	}

	bindProductsByCategory(handler) {
		$('#categoriesx').find('a').click(function (event) {
			handler(this.dataset.category);
		});
	}

	bindCategoriesByStore(handler) {
		$('#storesx').find('a').click(function (event) {
			handler(this.dataset.store);
		});
	}

	bindProductsCategoryList(handler){
		$('#navCats').next().children().click(function(event){
			handler(this.dataset.category);
		});
		$('#category-list').find('a').click(function(event){
			handler(this.dataset.category);
		});
	}

	bindProductsTypeList(handler){
		$('#type-list').find('a').click(function(event){
			handler(this.dataset.type);
		});
	}

	bindShowProduct(handler){
		$('#productsx').find('a').click(function(event){
			handler(this.dataset.product);
		});
	}

	bindGoBack(handler) {
		$('#goback').click(function (event) {
			handler();
		});
	}

}

export default ManagerView;
