import {ProductModel} from './product-model';

export class OrderModel {
  id?: number;
  Product?: ProductModel;
  amount?: number;
  name?: string;
  phone?: string;
  email?: string;
  created_at?: Date;
}
