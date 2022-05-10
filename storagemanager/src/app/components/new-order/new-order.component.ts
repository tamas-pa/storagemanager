import {Component, OnInit} from '@angular/core';
import {OrderModel} from '../../models/order-model';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  products;
  order = new OrderModel();
  productId;
  selectedProduct;
  isAmountError: boolean;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    if (!this.productService.products) {
      this.productService.getProducts().subscribe(resp => {
        this.products = resp;
      });
    } else {
      this.products = this.productService.products;
    }

  }

  onProductPick() {
    this.selectedProduct = this.productService.getProductById(this.productId);
  }

  onSubmitProductForm() {
    this.order.Product = this.selectedProduct;
    this.order.created_at = new Date();
    this.orderService.saveOrder(this.order).subscribe(resp => {
      if (resp.enough){
        this.router.navigateByUrl('orders');
      }else {
        this.isAmountError = true;
      }
    });
  }
}
