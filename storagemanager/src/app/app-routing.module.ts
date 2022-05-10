import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainpageComponent} from "./components/mainpage/mainpage.component";
import {PartsComponent} from "./components/parts/parts.component";
import {PartComponent} from "./components/part/part.component";
import {NewPartComponent} from "./components/new-part/new-part.component";
import {NewProductComponent} from "./components/new-product/new-product.component";
import {ProductsComponent} from "./components/products/products.component";
import {OrdersComponent} from './components/orders/orders.component';
import {NewOrderComponent} from './components/new-order/new-order.component';
import {AuthGuardServiceService} from "./services/auth-guard-service.service";


const routes: Routes = [
  {
    path: 'mainpage',
    component: MainpageComponent
  },
  {
    path: 'parts',
    component: PartsComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: 'part/:partId',
    component: PartComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: 'new-part',
    component: NewPartComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: 'new-product',
    component: NewProductComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: 'products',
    component: ProductsComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: 'new-order',
    component: NewOrderComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: '**',
    redirectTo: 'mainpage'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
