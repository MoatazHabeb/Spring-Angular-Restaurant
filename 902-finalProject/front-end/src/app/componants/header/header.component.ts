import {Component, OnInit} from '@angular/core';
import {Category} from '../../../model/category';
import {CategoryService} from '../../../service/category.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  category: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAllCategory();
  }

  // tslint:disable-next-line:typedef
  search(keySearch){
    this.router.navigateByUrl('/search/' + keySearch); // rice
  }

  // tslint:disable-next-line:typedef
  loadAllCategory(){
    this.categoryService.getAllCategory().subscribe(
      response => {
        this.category = response;
      }
    );
  }

  // tslint:disable-next-line:typedef
  logOut() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/login'); // rice
  }

  // tslint:disable-next-line:typedef
  isUserLogin(){
    return this.authService.isUserLogIn();
  }

  // tslint:disable-next-line:typedef
  login() {
    this.router.navigateByUrl('/login');
  }

  // tslint:disable-next-line:typedef
  signup() {
    this.router.navigateByUrl('/signup');
  }
}
