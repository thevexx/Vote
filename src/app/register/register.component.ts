import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message = '';
  message2 = '';

  constructor(private router: Router, private apiservice: ApiServiceService) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(5), Validators.required]),
      firstName: new FormControl('', [Validators.minLength(3), Validators.required]),
      lastName: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }

  ngOnInit() {
  }

  register() {
    this.message2 = '';
    if (this.registerForm.valid) {
      this.message = '';
      // console.log(this.registerForm.value);
      this.apiservice.registerApi(this.registerForm.value).subscribe((res: any) => {
        console.log(res);
        this.router.navigateByUrl('/login');
      });

    } else {
      this.message2 = 'Enter VALID email and password';
    }
  }
}
