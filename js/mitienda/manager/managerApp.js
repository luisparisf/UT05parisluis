import Manager from './manager.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './manager.js';
import { Product, Shoe, Shirt, Trouser, Category} from './manager.js';
import {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException} from './manager.js';
import ManagerController from './managerController.js';
import ManagerView from './managerView.js';

$(function(){
  const ManagerApp = new ManagerController(
    Manager.getInstance(), new ManagerView()
  );
});

