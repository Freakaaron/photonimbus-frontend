import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url: string = "http://127.0.0.1:8000/api/account/register";
  constructor(private http: HttpClient) { }
  

  register(username: string,email: string, first_name: string, last_name: string, password: string, password2: string) {
    let body = {
      username: username,
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password,
      password2: password2
    }
    return this.http.post(this.url, body);
  }
}
