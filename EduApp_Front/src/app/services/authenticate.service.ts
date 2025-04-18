import { Injectable } from '@angular/core'; 
import { UserrequestService, LoginResponse, Logout, SignInUser, User, isLoggedIn } from './userrequest.service';
import * as jwt from 'jsonwebtoken';
import { CookieLocalService } from './cookie-local.service';
import { Article, ArticlesService } from './articles.service';

class LoginReq {
  constructor(public username:string, public password:string){};
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService { 

  username: string = ""; 
  password: string = "";
  token:string = "";
  PlaceHolderArray: Article[] = [];
  PlaceholderIsLoggedIn: isLoggedIn[] = [];
  isLoggedIn: boolean = false;
  loginReq: LoginReq = {username: "", password: ""};

  PlaceHolderUser:User = {
    id:"", name:"", surname:"",username:"",password:"", createdAt:"", __v:"", unreadMsgs:[], selectedCountry:"", selectedDesignation:"", selectedInstitution:"",selectedSubject:[]
  }

  constructor(private userservice: UserrequestService, private cookieservice: CookieLocalService, private articleservice: ArticlesService) { }

  LoginAuth(username : string, password : string) : Promise<boolean>{  
    this.loginReq.password = password;
    this.loginReq.username = username;

     
    return new Promise((resolve, reject) => {this.userservice.login(this.loginReq).subscribe(response => {
      resolve(this.handleLogin(response));
    },error => {
      this.handleError(error);
      reject(false);
    })});
  }

  SignUpAuth(SignInBody: SignInUser): Promise<boolean> {

    this.loginReq.password = SignInBody.password;
    this.loginReq.username = SignInBody.username;

    return new Promise((resolve, reject) => {this.userservice.addUser(SignInBody).subscribe(response => {
      resolve(this.handleSignIn(response));
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

  handleSignIn(response: LoginResponse): boolean {
    // return this.handleSuccess(response)  
    return response.success;
  }

  handleLogin(response: LoginResponse): boolean {    
    // will need to decrypt password
    //if(this.loginReq.username === response.result.username) {
      // sessionStorage.setItem("qazedcthmiklop*___p{}pkllsEduAppUserLoggedIn", response.username);

    if(response.success) {
      this.cookieservice.setCookie(response.token);
    }

    return response.success;}  

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
    this.token = this.cookieservice.getCookie() || "notoken";
    var response = false;;
 
    if(this.token !== "notoken") 
      {
        response = await this.isUserLoggedIn(this.token);
        return response;
      };

      return response;
     
    //return (this.cookieservice.getCookie() !== "" && this.cookieservice.getCookie() !== null);
  }

  async isAdmin() : Promise<boolean> {  
    this.token = this.cookieservice.getCookie() || "notoken";
    var response = false;

    const user = await this.isLoggedInGetUser();

    if(user) {
      if(user.username === "admin@studyo.co.za") return true;
    }

    return response; 
  }



  async isLoggedInGetUser() : Promise<User> {  
    this.token = this.cookieservice.getCookie() || "notoken";
    var response = this.PlaceholderIsLoggedIn;
 
    if(this.token !== "notoken") 
      {
        return new Promise((resolve, reject) => {this.userservice.isloggedIn(this.token).subscribe(response => {
          resolve(this.handleIsloggedInGetUser(response));
        },error => {
          this.handleError(error);
          reject(error);
        })}); 
      };

      return this.PlaceHolderUser; 
  }

  handleIsloggedInGetUser(response: isLoggedIn): User { 
    return response.user;
  }

  // async GetArticles() : Promise<Array<Article>>{ 
     
    
  //   if (!await this.isLoggedIn2()) return this.handleArticles(this.PlaceHolderArray);
  //   if (this.token === "notoken") return this.handleArticles(this.PlaceHolderArray);

  //   return new Promise((resolve, reject) => {this.articleservice.getAllArticles(this.cookieservice.getCookie() || "notoken").subscribe(response => {
  //     resolve(this.handleArticles(response));
  //   },error => {
  //     this.handleError(error);
  //     // reject(false);
  //   })});
  // }


  async GetArticles(): Promise<Array<Article>> {
    // Check if user is logged in
    // if (!(await this.isLoggedIn2())) {
    //   return this.handleArticles(this.PlaceHolderArray);
    // }
  
    // if (this.token === "notoken") {
    //   return this.handleArticles(this.PlaceHolderArray);
    // }
  
    try {
      const response = await this.articleservice
        .getAllArticles(this.cookieservice.getCookie() || "notoken")
        .toPromise();
      return this.handleArticles(response);
    } catch (error) {
      this.handleError(error);
      return this.PlaceHolderArray; // Return a placeholder array on error
    }
  }

  handleArticles(response: Array<Article> | undefined): Array<Article> {   

    if(response === undefined) return this.PlaceHolderArray;
    
    return response;
  }
}
