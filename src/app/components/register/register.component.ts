import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
  constructor(
    private registerService: RegisterService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  register(){
    if(this.username && this.password && this.password2 && this.first_name && this.last_name && this.email) {
      this.registerService.register(this.username, this.email, this.first_name, this.last_name, this.password, this.password2)
        .subscribe(data => {
          if(data["response"] == "Successfully registered new user") {
            console.log(data["response"]);
            this.router.navigate(["/login"]);
            alert("Registration Success");
          }
          else {
            alert("Could not register please try again");
          }
      }, err => {
        console.log(err);
        alert("Could not register please try again");
      });
    }
    else if (this.username == "" || this.password == "" || this.password2 == "" || this.email == "" || this.first_name == "" || this.last_name == "" ) {
      alert("Please fill out entire form");
    }
    else {
      alert("Please fill out entire form");
    }
  }

}
