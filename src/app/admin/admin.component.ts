import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any;
  subjects: any;

  constructor(private router: Router, private apiservice: ApiServiceService) { }

  ngOnInit() {
    this.getUsers();
    this.getSubjects();
  }

  getUsers() {
    this.apiservice.getUsersApiAdmin().subscribe((responce: any) => {
      this.users = responce;
    });
  }


  deleteUsers(id) {
    this.apiservice.deleteUsersApiAdmin(id).subscribe((responce: any) => {
      console.log(responce);

    });

  }

  getSubjects () {
    this.apiservice.getSubjectsApiAdmin().subscribe((responce: any) => {
      this.subjects = responce;
    });

  }

  deleteSubjects(id) {
    console.log('1');
    this.apiservice.deleteSubjectsApiAdmin(id).subscribe((responce: any) => {
      console.log(responce);
    });

  }

}
