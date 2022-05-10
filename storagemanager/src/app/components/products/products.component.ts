import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ProductModel} from '../../models/product-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: ProductModel[];
  isLoading: boolean;

  constructor(
    private router: Router,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(resp => {
      this.products = resp;
      this.isLoading = false;
    });
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(resp => {
      this.productService.getProducts().subscribe((resp: any) => {
        this.products = resp;
      });
    });
  }

  navigate(route): void {
    this.router.navigateByUrl(route);
  }
}
