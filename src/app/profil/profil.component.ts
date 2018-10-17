import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  subjectForm: FormGroup;
  message = '';
  public user: any;
  public userSubjects: Array<object> = [];
  id = '';

  public info: Array<object> = [{ 'nvpo': 0, 'nvt': 0 }];
  nbVoteOptions: Array<any> = [];
  nbVotesTotal = 1;
  nboption = 0;

  constructor(private router: Router, private apiservice: ApiServiceService,
    private cookieService: CookieService) {

    this.subjectForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      option1: new FormControl('', [Validators.required]),
      option2: new FormControl('', [Validators.required]),
      option3: new FormControl(''),
      option4: new FormControl(''),
      option5: new FormControl(''),
      option6: new FormControl(''),
      description: new FormControl('')
    });
  }

  ngOnInit() {
    const test: string = this.cookieService.get('token');
    if (!test) {
      this.router.navigate(['login']);
    }
    const decoded = jwt_decode(test);
    // console.log(decoded);
    this.id = decoded.data._id;
    // console.log(this.id);
    this.getUserSubjects(this.id);
    // console.log(test);
  }


  getUserSubjects(idUser) {
    this.info = [{ 'nvpo': 0, 'nvt': 0 }];
    this.apiservice.getUserSubjectsApi(idUser).subscribe((data: any) => {
      this.user = data;
      this.userSubjects = data.subjects;
      for (const subj of data.subjects) {
        this.nbVoteOptions = [];
        this.nbVotesTotal = subj.votes.length;
        if (this.nbVotesTotal === 0) {
          this.info.push({ 'nvpo': 0, 'nvt': 0 });
        } else {
          for (const option of subj.options) {
            this.nboption = 0;
            for (const vote of subj.votes) {
              if (option === vote.text) {
                // console.log(option, vote.text);
                this.nboption = this.nboption + 1;
              }
            }
            this.nbVoteOptions.push(this.nboption);
          }
          console.log(this.nbVoteOptions, this.nbVotesTotal);
          this.info.push({ 'nvpo': this.nbVoteOptions, 'nvt': this.nbVotesTotal });
        }
      }
    });
  }

  addSubject() {
    // console.log(this.subjectForm.value);
    if (this.subjectForm.valid) {
      this.message = '';
      // console.log(this.subjectForm.value);
      const subject = {
        title: this.subjectForm.value.title,
        description: this.subjectForm.value.description,
        options: [this.subjectForm.value.option1, this.subjectForm.value.option2]
      };
      if (this.subjectForm.value.option3 !== '') {
        subject.options.push(this.subjectForm.value.option3);
      }
      if (this.subjectForm.value.option4 !== '') {
        subject.options.push(this.subjectForm.value.option4);
      }
      if (this.subjectForm.value.option5 !== '') {
        subject.options.push(this.subjectForm.value.option5);
      }
      if (this.subjectForm.value.option6 !== '') {
        subject.options.push(this.subjectForm.value.option6);
      }

      // console.log(subject);
      this.apiservice.addSubjectApi(this.id, subject).subscribe((res: any) => {
        // console.log(res);
        this.router.navigateByUrl('/profil');
      });
      return this.userSubjects.push(subject);
    }
  }


  deleteSubject(idU, idS) {
    this.apiservice.deleteSubjectFromUserApi(idU, idS).subscribe( async (res: any) => {
      // this.delete(idS);


      // await this.apiservice.deleteVotesApi(idU, idS);


    });
    // this.apiservice.reloadApi().subscribe((result: any) => {});


  }

  delete(id) {
     this.apiservice.deleteSubjectApi(id).subscribe( async (res: any) => {
       console.log('result', res);
     });

  }


  dec(): void {
    this.cookieService.delete('token');
    this.router.navigate(['login']);
  }

}
