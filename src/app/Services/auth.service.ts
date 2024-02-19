import { Injectable } from '@angular/core';
import { loginData, login } from "../login/login.component";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false
  constructor() { }
  validateLogin(login: login){
    if (login.email == loginData.email && login.password == loginData.password && login.role == loginData.role) {
      this.isLoggedIn = true
    }
  }
  logout(){
    this.isLoggedIn = false
  }
  isAuthenticated() {
    return this.isLoggedIn;
    // const promise = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.isLoggedIn);
    //   }, 800);
    // });
    // return promise;
  }
}
