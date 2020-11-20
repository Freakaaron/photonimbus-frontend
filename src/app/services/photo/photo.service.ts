import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  url: string = "https://photonimbus-h55hwlfx7a-uw.a.run.app/photos/";
  images = [];
  constructor(
    private http: HttpClient
  ) { }

  get() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", sessionStorage.getItem("token"));
    let params = new HttpParams();
    params = params.append("username", sessionStorage.getItem("username"));
    return this.http.get(this.url + "get", {headers: headers, params: params});
  }

  share(user: string, image_id:string) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", sessionStorage.getItem("token"));
    let body = {
      username: sessionStorage.getItem("username"),
      user: user,
      image_id: image_id,
    }
    return this.http.post(this.url + "share", body, {headers: headers});
  }

  getImage(id: string) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", sessionStorage.getItem("token"));
    let params = new HttpParams();
    params = params.append("id", id);
    return this.http.get(this.url + "getImage",{headers: headers, params: params})
  }

  getSharedImages() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", sessionStorage.getItem("token"));
    let params = new HttpParams();
    params = params.append("username", sessionStorage.getItem("username"));
    return this.http.get(this.url + "getSharedImages", {headers: headers, params: params});
  }

  annotate(image_id: string, annotation: string) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", sessionStorage.getItem("token"));
    let body = {
      username: sessionStorage.getItem("username"),
      annotation: annotation,
      image_id: image_id,
    }
    return this.http.post(this.url + "annotate", body, {headers: headers});
  }

  getAnnotations(image_id: string) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", sessionStorage.getItem("token"));
    let params = new HttpParams();
    params = params.append("image_id", image_id);
    return this.http.get(this.url + "getAnnotations", {headers: headers, params: params});
  }

  getAnnotatedThumbnails(annotation: string) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", sessionStorage.getItem("token"));
    let params = new HttpParams();
    params = params.append("username", sessionStorage.getItem("username"));
    params = params.append("annotation", annotation);
    return this.http.get(this.url + "getAnnotatedThumbnails", {headers: headers, params: params});
  }
}
