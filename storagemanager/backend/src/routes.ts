import {PartController} from './controller/PartController';
import {ProductController} from "./controller/ProductController";
import {OrderController} from "./controller/OrderController";

export const Routes = [
  {
    method: 'get',
    route: '/parts',
    controller: PartController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/part/:id',
    controller: PartController,
    action: 'one'
  },
  {
    method: 'post',
    route: '/save-part',
    controller: PartController,
    action: 'save'
  },
  {
    method: 'post',
    route: '/update-part',
    controller: PartController,
    action: 'update'
  },
  {
    method: 'delete',
    route: '/delete-part/:id',
    controller: PartController,
    action: 'remove'
  },
  {
    method: 'post',
    route: '/save-product',
    controller: ProductController,
    action: 'save'
  },
  {
    method: 'get',
    route: '/product/:id',
    controller: ProductController,
    action: 'one'
  },
  {
    method: 'get',
    route: '/products',
    controller: ProductController,
    action: 'all'
  },
  {
    method: 'delete',
    route: '/delete-product/:id',
    controller: ProductController,
    action: 'remove'
  },
  {
    method: 'post',
    route: '/save-order',
    controller: OrderController,
    action: 'save'
  },
  {
    method: 'get',
    route: '/orders',
    controller: OrderController,
    action: 'all'
  },
];
