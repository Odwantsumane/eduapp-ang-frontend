import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor{ 

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let username = "user";
    let password = "password";

    let BasicAuthHeader = "Basic " + window.btoa(username + ":"+ password)
    
    req = req.clone({
      setHeaders: {
        Authorization: BasicAuthHeader
      }
    })
    return next.handle(req);
  }
}
