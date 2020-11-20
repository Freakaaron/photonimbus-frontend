import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  url: string = "https://photonimbus-h55hwlfx7a-uw.a.run.app/photos/upload";

  uploadFile(file) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", sessionStorage.getItem("token"));
    let formData: FormData = new FormData();
    formData.append('image', file);
    formData.append("username", sessionStorage.getItem("username"));
    return this.http.post(this.url, formData, {headers: headers});
  }
}