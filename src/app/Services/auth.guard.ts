import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router){

  }
  canActivate() {
    let allowed: boolean;
    if (this.authService.isAuthenticated()) {
      allowed = true
      
    }
    else {
      allowed = false
      this.router.navigate(['/login'])
    }
    console.log("guard ", allowed)
    return allowed
  }
    


    // this.authService.isAuthenticated().then((auth) => {
    //   if (auth){
    //     return true;
    //   }
    //   else {
    //     this.router.navigate(['/']);
    //   }
    // });


  // route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
}
