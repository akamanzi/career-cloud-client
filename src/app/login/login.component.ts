import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Route, Router } from '@angular/router';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from "firebaseui-angular";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  public loginValid = true;
  public username = '';
  public password = '';
  constructor(public fbAuth: AngularFireAuth, private route: Router) { }
  
  ngOnInit(): void {
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public onSubmit(): void {

    }

  successLoginCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult){
    this.route.navigate(['dashboard']);
  }

  errorLoginCallback(errorData: FirebaseUISignInFailure) {

  }
  uiShownCallback(){

  }
}
