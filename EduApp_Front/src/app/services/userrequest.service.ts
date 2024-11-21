import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as jwt from 'jsonwebtoken';

export class unreadMsgs {
  constructor (
    public room_id:string,
    public unreadNum: number
  ){};
}

export class User {
  constructor(
    public _id:string,
    public name:string,
    public surname:string,
    public username:string,
    public password:string,
    public createdAt:string,
    public __v:string,
    public unreadMsgs:Array<unreadMsgs>,
    public selectedInstitution:string,
    public selectedDesignation:string,
    public selectedCountry:string,
    public selectedSubject: Array<string>){};
}

export class SignInUser {
  constructor(
    public name: string,
    public surname: string,
    public username: string,
    public password1: string, 
    public password2: string,  
    public selectedSubject: Array<string>,
    public selectedDesignation: string,
    public selectedInstitution: string,
    public selectedCountry: string,){}

}

export class LoginResponse {
  constructor(public user: User, public code: number, public message: string, public token: string) {}
}

class LoginReq {
  constructor(public username:string, public password1:string){};
}

export class Logout {
  constructor(public loggedOut:boolean){};
}

export class isLoggedIn {
  constructor(public loggedIn: boolean, public user:User){};
}

@Injectable({
  providedIn: 'root'
})
export class UserrequestService {

  maxAge = 3 * 24 * 60 * 60;
  

  Headers: HttpHeaders = new HttpHeaders ({Authorization: this.createBasicAuthHeaders()}); //, Cookie: `jwt=${this.createToken("myid")}`
  url : string = "http://localhost:4001/user";

  constructor(private http: HttpClient) { }

  getAllUsers() { // will use token later to identify who is requesting
    return this.http.get<Array<User>>(`${this.url}/AllUsers`,  {headers: this.Headers});
  }

  getUser(id: string) {

    return this.http.get<User>(`${this.url}/getUser/${id}`,  {headers: this.Headers});
  }

  addUser(user: SignInUser) {  
    return this.http.post<LoginResponse>(`${this.url}/signin`, user, {headers: this.Headers});
  }

  login (loginReq: LoginReq) {  
    return this.http.post<LoginResponse>(`${this.url}/login`, loginReq, {headers: this.Headers});
  }

  logout () {  
    return this.http.get<Logout>(`${this.url}/logout`, {headers: this.Headers});
  }

  isloggedIn(token: string) { 
    return this.http.get<isLoggedIn>(`${this.url}/isloggedIn/${token}`, {headers: this.Headers});
  }

  createBasicAuthHeaders() { ;
    let username = "user";
    let password = "password"; 
    let BasicAuthHeader = "";

    if (typeof window !== 'undefined') {
      BasicAuthHeader = "Basic " + window.btoa(username + ":" + password);
    } else {
      console.error("Window is not defined. Ensure you're running this in a browser.");
    } 
    return BasicAuthHeader;
  }

  // createToken (id: string) : string {
  //   return jwt.sign({ id }, 'bmV0IG5pbmphIHNlY3JldA', {
  //       expiresIn: this.maxAge 
  //   })
  // }
}
