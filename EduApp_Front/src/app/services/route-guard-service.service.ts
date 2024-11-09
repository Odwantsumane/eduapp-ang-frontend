import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardServiceService implements CanActivate { 

  constructor(private authenticate:  AuthenticateService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authenticate.isLoggedIn2()) return true;

    this.router.navigate(['login']);
    return false;
  }

}
