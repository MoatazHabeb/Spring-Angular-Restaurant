import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {Product} from '../../../model/product';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../../../service/cart.service';
import {CardOrder} from '../../../model/card-order';
import {AuthService} from "../../../service/auth/auth.service";
import {CategoryRefreshService} from "../../../service/category-refresh-service";
import {ProductRefreshService} from "../../../service/product-refresh-service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None, // Disables style encapsulation
})
export class ProductsComponent implements OnInit{
  pageNumber = 1;
  pageSize = 10;
  collectionSize: number ;

  products: Product[] = [];

  messageAr = '';
  messageEn = '';
  constructor(private productService: ProductService, private productRefreshService: ProductRefreshService, private refreshService: CategoryRefreshService, private activatedRoute: ActivatedRoute , private cartService: CartService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => this.finalProduct(this.pageNumber));

    this.productRefreshService.refresh$.subscribe(() => {
      this.finalProduct(this.pageNumber);
    });
  }

  // tslint:disable-next-line:typedef
  finalProduct(pageNo){
    const categoryIdExist = this.activatedRoute.snapshot.paramMap.has('id');
    const keyExist = this.activatedRoute.snapshot.paramMap.has('key');
    if (categoryIdExist) {
      const categoryId = this.activatedRoute.snapshot.paramMap.get('id');
      this.loadProductByCategoryId(categoryId, pageNo - 1);
    } else if (keyExist && this.activatedRoute.snapshot.paramMap.get('key') !== '') {
      const key = this.activatedRoute.snapshot.paramMap.get('key');
      this.searchProducts(key, pageNo - 1);
    } else {
      this.loadAllProduct(pageNo - 1);
    }
  }

  // tslint:disable-next-line:typedef
  searchProducts(key, pageNo){
    this.productService.search(key, pageNo, this.pageSize).subscribe(
      response => {
        // @ts-ignore
        if (response && 'status' in response && response.status === 'NOT_ACCEPTABLE') {
          this.products = [];
          // @ts-ignore
          this.messageAr = response.bundleMessage.message_ar;
          // @ts-ignore
          this.messageEn = response.bundleMessage.message_en;
        } else {
          // @ts-ignore
          this.products = response.products;
          // @ts-ignore
          this.collectionSize = response.totalProductSize;
        }

      }
    );
  }

  // tslint:disable-next-line:typedef
  loadProductByCategoryId(categoryId, pageNo){
    this.productService.getProductByCategoryId(categoryId, pageNo , this.pageSize).subscribe(
      response => {
        // @ts-ignore
        this.products = response.products;
        // @ts-ignore
        this.collectionSize = response.totalProductSize;
        // @ts-ignore
        if (response.products.length === 0) {
          this.messageAr = '🌟 ترقبوا! شيء مذهل قادم قريبًا. 🚀';
          this.messageEn = '🌟 Stay tuned! Something amazing is coming soon. 🚀';
        }
      }
    );
  }

  // tslint:disable-next-line:typedef
  loadAllProduct(pageNo){
    this.productService.getAllProduct(pageNo, this.pageSize).subscribe(
      response => {
        // @ts-ignore
        this.products = response.products;
        // @ts-ignore
        this.collectionSize = response.totalProductSize;
      }
    );
  }

  // tslint:disable-next-line:typedef
  doPagination() {
    this.finalProduct(this.pageNumber);
  }

  // tslint:disable-next-line:typedef
  addProduct(product: Product) {
    const order = new CardOrder(product);

    this.cartService.addProductToOrder(order);
  }

  deleteProduct(pro: Product): void {
    if (confirm(`Are you sure you want to delete ${pro.name}?`)) {
      this.productService.deleteProduct(pro.id).subscribe(() => {
        // 🔁 Trigger reload in CategoryComponent
        this.refreshService.triggerRefresh();
        // Trigger refresh event
        this.productRefreshService.triggerRefresh();
        this.pageNumber = 1;
      });
    }
  }

  // tslint:disable-next-line:typedef
  updateProduct(pro: any) {
    // @ts-ignore
    this.router.navigate(['/actions/updateproduct', pro.id]);
  }
}
