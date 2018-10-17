import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message = '';
  token = '';

  constructor(private router: Router, private apitodoservice: ApiServiceService, private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(5), Validators.required])
    });

  }
  hide = true;


  ngOnInit() {
  }


  login() {
    if (this.loginForm.valid) {
      this.message = '';
      this.apitodoservice.loginApi(this.loginForm.value).subscribe((res: any) => {
        this.token = res.userToken;
        console.log(res.userToken);
        // console.log(res);
        if (res.message === 'ok') {
          this.cookieService.set('token', res.userToken);
          this.router.navigateByUrl('/home');
        } else {
          this.message = res.message;
        }
      });
    }
  }


}

