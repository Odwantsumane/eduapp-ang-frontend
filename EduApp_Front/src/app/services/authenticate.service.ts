import { Injectable } from '@angular/core'; 
import { UserrequestService, LoginResponse, Logout } from './userrequest.service';
import * as jwt from 'jsonwebtoken';
import { CookieLocalService } from './cookie-local.service';

class LoginReq {
  constructor(public username:string, public password1:string){};
}

class isLoggedIn {
  constructor(public loggedIn: boolean){};
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService { 

  username: string = ""; 
  password: string = "";
  isLoggedIn: boolean = false;
  loginReq: LoginReq = {username: "", password1: ""};

  constructor(private userservice: UserrequestService, private cookieservice: CookieLocalService) { }

  LoginAuth(username : string, password : string) : Promise<boolean>{  
    this.loginReq.password1 = password;
    this.loginReq.username = username;

     
    return new Promise((resolve, reject) => {this.userservice.login(this.loginReq).subscribe(response => {
      resolve(this.handleSuccess(response));
    },error => {
      this.handleError(error);
      reject(false);
    })});
  }

  isUserLoggedIn(token: string) : Promise<boolean> { 
    // try {
      // let user = sessionStorage.getItem("qazedcthmiklop*___p{}pkllsEduAppUserLoggedIn");
      return new Promise((resolve, reject) => {this.userservice.isloggedIn(token).subscribe(response => {
        resolve(this.handleIsloggedIn(response));
      },error => {
        this.handleError(error);
        reject(false);
      })}); 
  }

  loggout() : Promise<boolean> {
    // sessionStorage.removeItem("qazedcthmiklop*___p{}pkllsEduAppUserLoggedIn");

    return new Promise((resolve, reject) => {this.userservice.logout().subscribe(response => {
      resolve(this.handleLogout(response));
    },error => {
      this.handleError(error);
      reject(false);
    })});
  }

  handleSuccess(response: LoginResponse): boolean {    
    // will need to decrypt password
    if(this.loginReq.username === response.user.username) {
      // sessionStorage.setItem("qazedcthmiklop*___p{}pkllsEduAppUserLoggedIn", response.username);

      if(response.token !== null) this.cookieservice.setCookie(response.token);

      return true;}
    return false;
  }

  handleError(error: any) { 

    console.log("Error: " + error);
  }

  handleLogout(response: Logout) { 
    // delete a token 
    this.cookieservice.deleteCookie();

    return response.loggedOut;
  }

  handleIsloggedIn(response: isLoggedIn): boolean { 

    if(response.loggedIn) {this.isLoggedIn=response.loggedIn; return true};
    this.isLoggedIn=response.loggedIn;
    return false;
  }

  async isLoggedIn2() : Promise<boolean> {  
    const token = this.cookieservice.getCookie() || "notoken";
    var response = false;;
 
    if(token !== "notoken") 
      {
        response = await this.isUserLoggedIn(token);
        return response;
      };

      return response;
     
    //return (this.cookieservice.getCookie() !== "" && this.cookieservice.getCookie() !== null);
  }
}
