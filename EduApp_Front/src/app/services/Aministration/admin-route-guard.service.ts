import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteGuardService implements CanActivate{

  constructor(private authenticate:  AuthenticateService, private router: Router) { }

  // async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if(await this.authenticate.isLoggedIn2()) return true;

  //   this.router.navigate(['login']);
  //   return false;
  // }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(await this.authenticate.isAdmin()) { 
      return true;
    }

    if(await this.authenticate.isLoggedIn2()) { 
      this.router.navigate(['']);
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
