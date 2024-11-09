import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieLocalService { 

  constructor(private cookieService: CookieService) {}

  // Set a cookie
  setCookie(token: string): void { 
    const maxAge = 3 * 24 * 60 * 60;
    this.cookieService.set('jwt', token, {expires: maxAge}); //, path: '/'
  }

  // Get a cookie
  getCookie(): string {
    const token = this.cookieService.get('jwt');
    // console.log('JWT Token:', token);
    return token;
  }

  // Delete a cookie
  deleteCookie(): void {
    this.cookieService.delete('jwt');
  }
}
