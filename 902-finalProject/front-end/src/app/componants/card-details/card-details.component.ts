import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../service/cart.service';
import {CardOrder} from '../../../model/card-order';
import {OrderService} from '../../../service/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit{
  order: CardOrder[] = [];
  totalPrice = 0;
  totalQuantity = 0;
  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {
  }
  ngOnInit(): void {
  this.getOrders();
  }
  // tslint:disable-next-line:typedef
  getOrders(){
    this.order = this.cartService.order;
  }


  // tslint:disable-next-line:typedef
  increaseOrder(order: CardOrder) {
    this.cartService.addProductToOrder(order);
  }

  // tslint:disable-next-line:typedef
  deCreaseOrder(order: CardOrder) {
    this.cartService.deCreaseOrder(order);
  }


  // tslint:disable-next-line:typedef
  removeOrder(order: CardOrder){
    this.cartService.removeOrder(order);
  }
  // tslint:disable-next-line:typedef
  createOrder() {
    const products = this.cartService.order.map(order => ({
      productId: order.id,
      quantity: order.quantity
    }));

    this.orderService.createOrder(products).subscribe(
      value => {
        this.cartService.order = [];
        this.cartService.totalOrdersSize.next(0);
        this.cartService.totalOrdersPrice.next(0);
        this.router.navigateByUrl('/orderDetails/' + value.code);
      },
      error => {
        console.error('Error occurred while placing the order:', error);
        alert('Failed to place order. Please try again later.');
      }
    );
  }

}
