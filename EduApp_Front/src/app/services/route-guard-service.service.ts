import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardServiceService implements CanActivate { 

  constructor(private authenticate:  AuthenticateService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(await this.authenticate.isLoggedIn2()) return true;

    this.router.navigate(['login']);
    return false;
  }

  // async isAdmin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if(await this.authenticate.isAdmin()) return true;

  //   this.router.navigate(['manager']);
  //   return false;
  // }

}
