import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {OrderModel} from '../../models/order-model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  isLoading: boolean;
  orders: OrderModel[];
  pipe = new DatePipe('en-GB');
  constructor(
    private router: Router,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.orderService.getOrders().subscribe(resp => {
      this.orders = resp;
      this.isLoading = false;
    });
  }

  navigate(route): void {
    this.router.navigateByUrl(route);
  }

  dateFormat(date) {
    return this.pipe.transform(date, 'short');
  }

}
