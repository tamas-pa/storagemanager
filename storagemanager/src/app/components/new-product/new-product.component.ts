import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../../models/product-model';
import {ActivatedRoute, Router} from '@angular/router';
import {PartService} from '../../services/part.service';
import {ProductService} from '../../services/product.service';
import {PartModel} from '../../models/part-model';
import {ProductPartModel} from '../../models/product-part-model';
import {ProductProductPartModel} from '../../models/product-product-part-model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  product = new ProductModel();
  usedParts = new ProductPartModel();
  usedProductProductPart = new ProductProductPartModel();
  selectedParts: any[] = [];
  partSelector: any;
  amountSelector: any;
  selectedProductParts: any[] = [];
  productPartSelector: any;
  productAmountSelector: any;
  parts;
  productParts;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partService: PartService,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    if (!this.partService.parts) {
      this.partService.getParts().subscribe(resp => {
        this.parts = resp;
      });
    } else {
      this.parts = this.partService.parts;
    }
    if (!this.productService.products) {
      this.productService.getProducts().subscribe(resp => {
        this.productParts = resp;
      });
    } else {
      this.productParts = this.productService.products;
    }
  }

  onSubmitProductForm() {
    this.product.productParts = [];
    this.selectedParts.forEach((obj, key) => {
      this.product.productParts[key] = new ProductPartModel();
      this.product.productParts[key].usedPart = new PartModel();
      this.product.productParts[key].usedPart = this.partService.getPartById(obj.id);
      this.product.productParts[key].amount = obj.amount;
    });
    this.product.productProductParts = [];
    this.selectedProductParts.forEach((obj, key) => {
      this.product.productProductParts[key] = new ProductProductPartModel();
      this.product.productProductParts[key].usedProduct = new ProductModel();
      this.product.productProductParts[key].usedProduct = this.productService.getProductById(obj.id);
      this.product.productProductParts[key].amount = obj.amount;
    });
    this.productService.saveProduct(this.product).subscribe(resp => {
      this.router.navigateByUrl('products');
    });
  }

  onNewPart() {
    if (this.partSelector && this.amountSelector) {
      const newPart = {
        id: this.partSelector,
        amount: this.amountSelector
      };

      this.selectedParts.push(newPart);
      this.partSelector = null;
      this.amountSelector = null;
    }
  }

  onNewProductPart() {
    if (this.productPartSelector && this.productAmountSelector) {
      const newPart = {
        id: this.productPartSelector,
        amount: this.productAmountSelector
      };

      this.selectedProductParts.push(newPart);
      this.productPartSelector = null;
      this.productAmountSelector = null;
    }
  }

  onDeletePart(index) {
    this.selectedParts.splice(index, 1);
  }

  onDeleteProductPart(index) {
    this.selectedProductParts.splice(index, 1);
  }

}
