import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {OrderModel} from '../models/order-model';
import {PartService} from "./part.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getOrdersUrl = `${this.config.api}orders`;
  saveOrderUrl = `${this.config.api}save-order`;

  _orders;
  _sentParts;

  constructor(
    private config: ConfigService,
    private partService: PartService,
    private http: HttpClient) {
    this.sentParts = [];
  }

  get orders() {
    return this._orders;
  }

  set orders(val) {
    this._orders = val;
  }

  get sentParts() {
    return this._sentParts;
  }

  set sentParts(val) {
    this._sentParts = val;
  }


  getOrders() {
    return this.http.get(this.getOrdersUrl).pipe(map((resp: any) => {
      this.orders = resp;
      return resp;
    }));
  }

  setOrderData(order) {

    this.checkProductParts(order.Product.productParts, order.amount);
    this.checkProductProductParts(order.Product.productProductParts, order.amount);

    const newOrder = {
      order: order,
      usedParts: this.sentParts
    };
    console.log(this.sentParts);

    this.sentParts = [];

    return newOrder;
  }

  saveOrder(order: OrderModel): any {
    return this.http.post(this.saveOrderUrl, this.setOrderData(order)).pipe(map((resp: any) => {
      return resp;
    }));
  }

  checkPartOfObject(partId, amount) {
    let hasPart = false;
    this.sentParts.map((part, key) => {
      if (part.partId == partId) {
        this.sentParts[key].amount += amount;
        hasPart = true;
      }
    });
    if (!hasPart) {
      const object = {
        partId: partId,
        amount: amount
      };
      this.sentParts.push(object);
    }
  }

  checkProductParts(productParts, sumAmount) {
    productParts.forEach((productPart) => {
      this.checkPartOfObject(productPart.usedPart.id, sumAmount * productPart.amount);
    });
  }

  checkProductProductParts(productProductParts, sumAmount) {
    let actualProductProductParts = productProductParts;
    do {
      actualProductProductParts.forEach(productProductPart => {
        let usedProduct = productProductPart.usedProduct;
        if (usedProduct.productParts.length > 0) {
          sumAmount = sumAmount * productProductPart.amount;
          this.checkProductParts(usedProduct.productParts, sumAmount);
        }
        let usedProductProductParts = usedProduct.productProductParts;
        actualProductProductParts = usedProductProductParts;
      });
    } while (actualProductProductParts.length > 0);

  }

  //init

}
