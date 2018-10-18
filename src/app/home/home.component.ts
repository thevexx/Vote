import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  index = 1;
  public subjects: Array<object> = [];
  subject: any;
  id = '';
  idSub = '';

  constructor(private router: Router, private apiservice: ApiServiceService, private cookieService: CookieService) {

  }
  ngOnInit() {
    const test: string = this.cookieService.get('token');
    if (!test) {
      this.router.navigate(['login']);
    }
    const decoded = jwt_decode(test);
    this.id = decoded.data._id;
    this.getSubjects();
    // console.log(test);
  }


  getSubjects() {
    // console.log(this.id);
    this.apiservice.getSubjectsApi().subscribe((data: Array<object>) => {
      this.subjects = data;
      // console.log(this.subjects);
    });
  }

  dec(): void {
    this.cookieService.delete('token');
    this.router.navigate(['login']);
  }


}

