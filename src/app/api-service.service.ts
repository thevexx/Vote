import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  loginApi(user) {
    return this.http.post('http://localhost:3000/api/user/login', user);
  }

  registerApi(user) {
    return this.http.post('http://localhost:3000/api/user/register', user);
  }

  getSubjectsApi() {
    return this.http.get('http://localhost:3000/api/subject/');
  }

  getSubjectApi(idSub) {
    return this.http.get('http://localhost:3000/api/subject/' + idSub);
  }

  getUserSubjectsApi(idUser) {
    return this.http.get('http://localhost:3000/api/user/' + idUser);
  }

  addSubjectApi(idUser, subject) {
    return this.http.post('http://localhost:3000/api/subject/' + idUser, subject);
  }

  deleteSubjectFromUserApi(idUser, idSub) {
    return this.http.delete('http://localhost:3000/api/user/' + idUser + '/' + idSub);
  }
  deleteSubjectApi(idSub) {
    return this.http.get('http://localhost:3000/api/subject/' + idSub);
  }

  postVoteApi(idUser, idSub, vote) {
    return this.http.post('http://localhost:3000/api/vote/' + idUser + '/' + idSub, vote);
  }

  getExistVote(idUser, idSub) {
    return this.http.get('http://localhost:3000/api/vote/' + idUser + '/' + idSub);
  }
  reloadApi() {
    return this.http.get('http://localhost:3000/api/user/');
  }

}

