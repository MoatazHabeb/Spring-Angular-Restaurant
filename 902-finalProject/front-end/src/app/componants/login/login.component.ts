import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:ban-types
  messageAr: String = '';
  // tslint:disable-next-line:ban-types
  messageEn: String = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  togglePasswordVisibility(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    const toggle = field.nextElementSibling as HTMLElement;

    if (field.type === 'password') {
      field.type = 'text';
      toggle.textContent = '🙈';
    } else {
      field.type = 'password';
      toggle.textContent = '👁️';
    }
  }

  // tslint:disable-next-line:typedef
  login(email, password) {


    if (email === '') {
      this.messageAr = 'يجب ادخال الايميل';
      this.messageEn = 'please enter your email';
      this.extracted();
      return;
    }

    if (password === '' ) {
      this.messageAr = 'يجب ادخال الرقم السري';
      this.messageEn = 'please enter your password';
      this.extracted();
      return;
    }


    this.authService.login(email , password).subscribe(
      (response) => {
        localStorage.setItem('jwtToken', response.token); // Store token in localStorage
        if (response && 'status' in response && response.status === 'NOT_ACCEPTABLE') {
          // @ts-ignore
          this.messageAr = response.bundleMessage.message_ar;
          // @ts-ignore
          this.messageEn = response.bundleMessage.message_en;

          this.extracted();
        } else {
          sessionStorage.setItem('token', 'Bearer ' + response.token);
          sessionStorage.setItem('roles', 'Bearer ' + response.roles);
          this.router.navigateByUrl('/products');
        }
      }
    );
  }
  // tslint:disable-next-line:typedef
  private extracted() {
    setTimeout(() => {
      this.messageAr = '';
      this.messageEn = '';
    }, 3000);
  }

}
