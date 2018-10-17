import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  idUser = '';
  idSub = '';
  idUserInSubject = '';
  subject: any;
  votes: Array<object> = [];

  title: '';
  description: '';
  options: Array<object> = [];
  nbVoteOptions: Array<any> = [];
  nbVotesTotal = 1;
  nboption = 0;
  voteUser: Array<any> = [];

  optionText = '';

  testVoteExist = false;
  test = false;

  public shown = 'false';

  constructor(private route: ActivatedRoute, private router: Router, private apiservice: ApiServiceService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.idSub = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    const test: string = this.cookieService.get('token');
    if (!test) {
      this.router.navigate(['login']);
    }
    const decoded = jwt_decode(test);
    this.idUser = decoded.data._id;
    this.getSubject(this.idSub);
  }

  getSubject(id) {
    this.apiservice.getSubjectApi(id).subscribe((data: any) => {
      // console.log('id user: ', data.user._id);
      this.idUserInSubject = data.user;
      this.votes = data.votes;
      this.title = data.title;
      this.description = data.description;
      this.options = data.options;

      this.nbVotesTotal = data.votes.length;
      for (const option of data.options) {
        this.nboption = 0;
        for (const vote of data.votes) {
          if (option === vote.text) {
            this.nboption = this.nboption + 1;
          }
        }
        this.nbVoteOptions.push(this.nboption);
      }
    });
  }


  vote() {

    if (this.idUserInSubject === this.idUser) {
      setTimeout(function() { alert('How dare you !!!! \rYou can NOT vote your own subject! come on !!'); }, 3000);
    } else {
      this.apiservice.getExistVote(this.idUser, this.idSub).subscribe((v: any) => {
        // console.log(v.exist);
        if (v.exist) {
          setTimeout(function() { alert('You have already voted for: " ' + v.text + ' "'); }, 3000);
          return this.router.navigateByUrl('/home');
        } else {
          const radios = document.getElementsByName('vote');
          for (let i = 0; i < radios.length; i++) {
            // console.log(this.shown);

            if (this.shown !== 'false') {
              this.optionText = this.shown;
              // console.log(this.optionText);
              const today = new Date();
              const dd = today.getDate();
              const mm = today.getMonth() + 1;
              const yyyy = today.getFullYear();
              const tod = mm + '-' + dd + '-' + yyyy;

              const vote = {
                text: this.optionText,
                date: tod
              };

              console.log(vote);
              this.apiservice.postVoteApi(this.idUser, this.idSub, vote).subscribe((data: any) => {
                // console.log(data);
                setTimeout(function() { alert('Thank you for voting ! :) :)'); }, 3000);
                this.router.navigateByUrl('/home');
                return this.votes.push(data);
              });
              break;
            }
          }
        }
      });
    }
  }


  dec(): void {
    this.cookieService.delete('token');
    this.router.navigate(['login']);
  }

}
