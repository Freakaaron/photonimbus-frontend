import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "https://photonimbus-h55hwlfx7a-uw.a.run.app/api/account/login";
  constructor(private http: HttpClient) { }


  login(username: string, password: string) {
    let body = {
      username: username,
      password: password
    }
    return this.http.post(this.url, body);
  }
}
