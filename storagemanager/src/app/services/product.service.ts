import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {PartService} from './part.service';
import {ProductModel} from '../models/product-model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProductsUrl = `${this.config.api}products`;
  getProductUrl = `${this.config.api}product/`;
  saveProductUrl = `${this.config.api}save-product`;
  updateProductUrl = `${this.config.api}update-product`;
  deleteProductUrl = `${this.config.api}delete-product/`;

  _products;

  constructor(
    private config: ConfigService,
    private partService: PartService,
    private http: HttpClient) {
  }

  get products() {
    return this._products;
  }

  set products(val) {
    this._products = val;
  }

  getProducts() {
    return this.http.get(this.getProductsUrl).pipe(map((resp: any) => {
      this.products = resp;
      return resp;
    }));
  }


  saveProduct(product: ProductModel): any {
    return this.http.post(this.saveProductUrl, product).pipe(map((resp: any) => {
      return resp;
    }));
  }

  getProductById(id): any {
    return this.products.find(x => x.id == id);
  }


  deleteProduct(id): any {
    return this.http.delete(this.deleteProductUrl + id).pipe(map((resp: any) => {
      return resp;
    }));
  }

}
