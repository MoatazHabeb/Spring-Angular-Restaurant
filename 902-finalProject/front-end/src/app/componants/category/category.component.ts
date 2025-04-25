import {Component, OnInit} from '@angular/core';
import {Category} from '../../../model/category';
import {CategoryService} from '../../../service/category.service';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {CategoryRefreshService} from "../../../service/category-refresh-service";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  category: Category[] = [];
  activeCategoryId: string | null = null;

  constructor(private categoryService: CategoryService, private router: Router, private activatedRoute: ActivatedRoute, private refreshService: CategoryRefreshService) { }

  ngOnInit(): void {
    // Reload when route params change
    this.activatedRoute.paramMap.subscribe(() => {
      this.updateActiveCategoryId();
      this.loadAllCategory();
    });

    // Reload when another component triggers refresh
    this.refreshService.refresh$.subscribe(() => {
      this.updateActiveCategoryId();
      this.loadAllCategory();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveCategoryId();
    });

    // Initialize active state on component load
    this.updateActiveCategoryId();
  }

  updateActiveCategoryId(): void {
    if (this.router.url === '/products') {
      this.activeCategoryId = 'ALL'; // Set 'ALL' as the active ID when on the main products page
    } else if (this.router.url.startsWith('/category/')) {
      const parts = this.router.url.split('/');
      this.activeCategoryId = parts[2];
    } else {
      this.activeCategoryId = null; // Handle other routes if necessary
    }
  }

  isActive(cat: Category): boolean {
    return this.activeCategoryId === cat.id?.toString() || (this.activeCategoryId === 'ALL' && cat.name === 'ALL');
  }

  // tslint:disable-next-line:typedef
  loadAllCategory(){
    this.categoryService.getAllCategory().subscribe(
      response => {
        this.category = response;
      }
    );
  }
}
