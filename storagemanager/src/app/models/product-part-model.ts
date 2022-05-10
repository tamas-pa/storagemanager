import {ProductModel} from './product-model';
import {PartModel} from './part-model';

export class ProductPartModel {
  id?: number;
  amount?: number;
  product?: ProductModel;
  usedPart?: PartModel;
}
