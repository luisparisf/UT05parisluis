'use strict';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';

//Producto
class Product {
	constructor(defSerialNumber, defName, defDescription, defPrice, defTax = 0, defImage) {
		if (new.target === Product) throw new AbstractClassException('Product')
		if (!defSerialNumber) throw new EmptyValueException('serial number')
		if (!defName) throw new EmptyValueException('name')
		if (!defPrice) throw new EmptyValueException('price')
		if (defPrice < 0) throw new InvalidValueException('price', 'positive')
		if (typeof defPrice != 'number') throw new TypeValueException('price', 'Number')
		if (!defImage) throw new EmptyValueException('image')

		this.defSerialNumber = defSerialNumber
		this.defName = defName
		this.defDescription = defDescription
		this.defPrice = defPrice
		this.defTax = defTax
		this.defImage = defImage
	}

	get serialNumber() {
		return this.defSerialNumber
	}

	set serialNumber(newSerialNumber) {
		if (!newSerialNumber) throw new EmptyValueException('serial number')
		this.defSerialNumber = newSerialNumber
	}

	get name() {
		return this.defName
	}

	set name(newName) {
		if (!newName) throw new EmptyValueException('name')
		this.defName = newName
	}

	get description() {
		return this.defDescription
	}

	set description(newDescription) {
		this.defDescription = newDescription
	}

	get price() {
		return this.defPrice
	}

	set price(newPrice) {
		if (!newPrice) throw new EmptyValueException('price')
		if (newPrice < 0) throw new InvalidValueException('price', 'positive')
		if (typeof newPrice != 'number') throw new TypeValueException('price', 'Number')
		this.defPrice = newPrice
	}

	get tax() {
		return this.defTax
	}

	set tax(newTax) {
		this.defTax = newTax
	}

	get image() {
		return this.defImage
	}

	set image(newImage) {
		if (!newImage) throw new EmptyValueException('image')

		this.defImage = newImage
	}
}

//Subclases de Product
//Zapatos
class Shoe extends Product {
	constructor(defSerialNumber, defName, defDescription, defPrice, defTax, defImage, defColor, defSize) {
		//Invocacion del superconstructor
		super(defSerialNumber, defName, defDescription, defPrice, defTax, defImage)

		//Validacion de parametros locales
		if (!defColor) throw new EmptyValueException('color')
		if (!defSize) throw new EmptyValueException('size')
		if (typeof defSize != 'number') throw new TypeValueException('size', 'Number')

		this.defType = 'Zapato'
		this.defColor = defColor
		this.defSize = defSize
	}

	get type() {
		return this.defType
	}

	get color() {
		return this.defColor
	}

	set color(newColor) {
		if (!newColor) throw new EmptyValueException('color')
		this.defColor = newColor
	}

	get size() {
		return this.defSize
	}

	set size(newSize) {
		if (!newSize) throw new EmptyValueException('size')
		if (typeof newSize != 'number') throw new TypeValueException('size', 'Number')
		this.defSize = newSize
	}
}

//Camisas
class Shirt extends Product {
	constructor(defSerialNumber, defName, defDescription, defPrice, defTax, defImage, defColor, defSize, defSleeved) {
		//Invocacion del superconstructor
		super(defSerialNumber, defName, defDescription, defPrice, defTax, defImage)

		//Validacion de parametros locales
		if (!defColor) throw new EmptyValueException('color')
		if (!defSize) throw new EmptyValueException('size')
		if (typeof defSize != 'string') throw new TypeValueException('size', 'String')

		this.defType = 'Camisa'
		this.defColor = defColor
		this.defSize = defSize
		this.defSleeved = defSleeved
	}

	get type() {
		return this.defType
	}

	get sleeved() {
		return this.defSleeved
	}

	get color() {
		return this.defColor
	}

	set color(newColor) {
		if (!newColor) throw new EmptyValueException('color')
		this.defColor = newColor
	}

	get size() {
		return this.defSize
	}

	set size(newSize) {
		if (!newSize) throw new EmptyValueException('size')
		if (typeof newSize != 'number') throw new TypeValueException('size', 'Number')
		this.defSize = newSize
	}
}

//Pantalones
class Trouser extends Product {
	constructor(defSerialNumber, defName, defDescription, defPrice, defTax, defImage, defColor, defSize, defGenre) {
		//Invocacion del superconstructor
		super(defSerialNumber, defName, defDescription, defPrice, defTax, defImage)

		//Validacion de parametros locales
		if (!defColor) throw new EmptyValueException('color')
		if (!defSize) throw new EmptyValueException('size')
		if (typeof defSize != 'string') throw new TypeValueException('size', 'String')

		this.defType = 'Pantalon'
		this.defColor = defColor
		this.defSize = defSize
		this.defGenre = defGenre
	}

	get type() {
		return this.defType
	}

	get genre() {
		return this.defGenre
	}

	get color() {
		return this.defColor
	}

	set color(newColor) {
		if (!newColor) throw new EmptyValueException('color')
		this.defColor = newColor
	}

	get size() {
		return this.defSize
	}

	set size(newSize) {
		if (!newSize) throw new EmptyValueException('size')
		if (typeof newSize != 'number') throw new TypeValueException('size', 'Number')
		this.defSize = newSize
	}
}

//Objetos de los diferentes elementos
//Categoria
class Category {
	constructor(defTitle, defDescription, defUrl) {
		if (!defTitle) throw new EmptyValueException('title')
		if (!defUrl) throw new EmptyValueException('url')

		this.defTitle = defTitle
		this.defDescription = defDescription
		this.defUrl = defUrl
		this.defProducts = []
	}

	get title() {
		return this.defTitle
	}

	set title(newTitle) {
		if (!newTitle) throw new EmptyValueException('title')
		this.defTitle = newTitle
	}

	get description() {
		return this.defDescription
	}

	set description(newDescription) {
		this.defDescription = newDescription
	}

	get url() {
		return this.defUrl
	}

	set url(newUrl) {
		this.defUrl = newUrl
	}

	get products() {
		return this.defProducts
	}

	set products(defProducts) {
		this.defProducts = defProducts
	}
}

//Coordenadas
class Coords {
	constructor(defLatitude, defLongitude) {
		if (!defLatitude) throw new EmptyValueException('latitude')
		if (!defLongitude) throw new EmptyValueException('longitude')

		this.defLatitude = defLatitude
		this.defLongitude = defLongitude
	}

	get latitude() {
		return this.defLatitude
	}

	set latitude(newLatitude) {
		if (!newLatitude) throw new EmptyValueException('latitude')
		this.defLatitude = newLatitude
	}

	get longitude() {
		return this.defLongitude
	}

	set longitude(newLongitude) {
		if (!newLongitude) throw new EmptyValueException('longitude')
		this.defLongitude = newLongitude
	}
}

//Tiendas
class Store {
	constructor(defCIF, defUrl, defName, defAddress, defPhone, defCoords) {
		if (!defCIF) throw new EmptyValueException('CIF')
		if (!defUrl) throw new EmptyValueException('url')
		if (!defName) throw new EmptyValueException('name')

		this.defCIF = defCIF
		this.defUrl = defUrl
		this.defName = defName
		this.defAddress = defAddress
		this.defPhone = defPhone
		this.defCoords = defCoords
		this.defCategories = []
	}

	get url() {
		return this.defUrl
	}

	get cif() {
		return this.defCIF
	}

	set cif(newCIF) {
		if (!newCIF) throw new EmptyValueException('CIF')
		this.defCIF = newCIF
	}

	get name() {
		return this.defName
	}

	set name(newName) {
		if (!defName) throw new EmptyValueException('name')
		this.defName = newName
	}

	get address() {
		return this.defAddress
	}

	set address(newAddress) {
		this.defAddress = newAddress
	}

	get phone() {
		return this.defPhone
	}

	set phone(newPhone) {
		this.defPhone = newPhone
	}

	get coords() {
		return this.defCoords
	}

	set coords(newCoords) {
		this.defCoords = newCoords
	}

	get categories() {
		return this.defCategories
	}

	set categories(newCategories) {
		this.defCategories = newCategories
	}
}


export {Product, Shoe, Shirt, Trouser, Category, Coords, Store};
