import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Route, Router } from '@angular/router';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from "firebaseui-angular";
import { AuthService } from '../Services/auth.service';

export const loginData = {
  email: "careercloudtest@example.com",
  password: "Test123!",
  role: "Admin"
}
export interface login {
  email: string,
  password: string,
  role: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  @Output() notifyToolBar = new EventEmitter<boolean>();
  formLoginData: login = <login>{};
  public loginValid = true;
  public username = '';
  public password = '';
  constructor(
    public fbAuth: AngularFireAuth, 
    private route: Router,
    private auth: AuthService) { }
  
  ngOnInit(): void {
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public submit(form: any): void { 
      this.formLoginData.email = form.value.username,
      this.formLoginData.password = form.value.password,
      this.formLoginData.role = "Admin"
      this.auth.validateLogin(this.formLoginData)
      if (this.auth.isLoggedIn) {
        console.log("status ",this.auth.isLoggedIn);
        this.notifyToolBar.emit(this.auth.isLoggedIn)
        this.route.navigate(['admin']);
      }
      else {
        console.log("login failed")
        console.log("login data ", this.formLoginData)
      }
    }

  successLoginCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult){
    console.log(signInSuccessData.authResult.user)
    console.log(signInSuccessData.authResult.additionalUserInfo)
  }

  errorLoginCallback(errorData: FirebaseUISignInFailure) {

  }
  uiShownCallback(){

  }
}
