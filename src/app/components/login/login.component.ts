import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  constructor(
    private loginService: LoginService,
    private photoService: PhotoService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  
  login() {
    if(this.username && this.password) {
      this.loginService.login(this.username, this.password)
        .subscribe(data => {
          if(data["token"]) {
            console.log(data["token"]);
            sessionStorage.setItem("token", "Token " + data["token"]);
            sessionStorage.setItem("username", this.username);
            this.router.navigate(["/home"]);
          }
          else {
            alert("Invalid Username/Password combination.");
          }
      }, err => {
        console.log(err);
        alert("Invalid Username/Password combination.");
      });
    }
    else if (this.username == "" || this.password == "") {
      alert("Username/Password cannot be empty.");
    }
    else {
      alert("Username/Password cannot be empty.");
    }
  }

}
