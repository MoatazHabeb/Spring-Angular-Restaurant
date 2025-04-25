import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../service/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit{

  totalSize = 0;
  totalPrice = 0;

  constructor(private cartService: CartService) {
  }
  ngOnInit(): void {
    this.getTotals();
  }
  // tslint:disable-next-line:typedef
  getTotals(){
    this.cartService.totalOrdersSize.subscribe(
      data => {
        this.totalSize = data;
      }
    );

    this.cartService.totalOrdersPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );
  }


}
