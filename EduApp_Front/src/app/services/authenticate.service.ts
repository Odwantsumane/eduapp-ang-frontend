import { Injectable } from '@angular/core'; 
import { User, UserrequestService } from './userrequest.service';

class LoginReq {
  constructor(public username:string, public password1:string){};
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService { 

  username: string = ""; 
  password: string = "";
  loginReq: LoginReq = {username: "", password1: ""};

  constructor(private userservice: UserrequestService) { }

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

  isUserLoggedIn() : boolean {
    try {
      let user = sessionStorage.getItem("qazedcthmiklop*___p{}pkllsEduAppUserLoggedIn");
      return !(user === null);
    } catch (e) {
      console.log("sessionStorage is not defined")
      return false;
    }
    

    
  }

  loggout() : void {
    sessionStorage.removeItem("qazedcthmiklop*___p{}pkllsEduAppUserLoggedIn");
  }

  handleSuccess(response: User): boolean {    
    // will need to decrypt password
    if(this.loginReq.username === response.username) {sessionStorage.setItem("qazedcthmiklop*___p{}pkllsEduAppUserLoggedIn", response.username); return true;}
    return false;
  }

  handleError(error: any) { 

    console.log("Error: " + error);
  }
}
