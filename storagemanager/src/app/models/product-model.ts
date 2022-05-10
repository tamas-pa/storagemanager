import {ProductPartModel} from './product-part-model';
import {ProductProductPartModel} from './product-product-part-model';

export class ProductModel {
  id?: number;
  name?: string;
  productParts?: ProductPartModel[];
  productProductParts?: ProductProductPartModel[];
}
