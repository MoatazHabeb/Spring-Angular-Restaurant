import { Component } from '@angular/core';
import {AuthService} from '../service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) { }

  // tslint:disable-next-line:typedef
  isUserLogin(){
    return this.authService.isUserLogIn();
  }

}
