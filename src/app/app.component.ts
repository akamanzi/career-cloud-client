import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'job-portal';
  userLoggedIn: boolean = false;
  constructor(public fbAuth: AngularFireAuth,private authService: AuthService){
  }
  logout(){
    this.authService.logout();
  }

  updateLoginStatus(loginStatus: any){
    console.log("status update ", loginStatus)
    this.userLoggedIn = loginStatus
  }
}
