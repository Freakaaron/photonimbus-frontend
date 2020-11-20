import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string = "https://photonimbus-h55hwlfx7a-uw.a.run.app/api/account/getUsers";

  constructor(private http: HttpClient) { }

  getUsers() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", sessionStorage.getItem("token"));
    let params = new HttpParams();
    params = params.append("username", sessionStorage.getItem("username"));
    return this.http.get(this.URL, {headers: headers, params: params});
  }
}
