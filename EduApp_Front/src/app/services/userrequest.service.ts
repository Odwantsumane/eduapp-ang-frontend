import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as jwt from 'jsonwebtoken';

export class unreadMsgs {
  constructor (
    public room_id:string,
    public unreadNum: number
  ){};
}

class User {
  constructor(
    public _id:string,
    public name:string,
    public surname:string,
    public username:string,
    public password:string,
    public createdAt:string,
    public __v:string,
    public unreadMsgs:Array<unreadMsgs>,
    public institution:string,
    public occupation:string){};
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

class isLoggedIn {
  constructor(public loggedIn: boolean){};
}

@Injectable({
  providedIn: 'root'
})
export class UserrequestService {

  maxAge = 3 * 24 * 60 * 60;
  

  Headers: HttpHeaders = new HttpHeaders ({Authorization: this.createBasicAuthHeaders()}); //, Cookie: `jwt=${this.createToken("myid")}`
  url : string = "http://localhost:4001";

  constructor(private http: HttpClient) { }

  getAllUsers() {

    return this.http.get<Array<User>>(`${this.url}/AllUsers`,  {headers: this.Headers});
  }

  getUser(id: string) {

    return this.http.get<User>(`${this.url}/getUser/${id}`,  {headers: this.Headers});
  }

  addUser(user: User) {  
    return this.http.post<User>(`${this.url}/addUser`, user, {headers: this.Headers});
  }

  login (loginReq: LoginReq) {  
    return this.http.post<LoginResponse>(`${this.url}/user/login`, loginReq, {headers: this.Headers});
  }

  logout () {  
    return this.http.get<Logout>(`${this.url}/user/logout`, {headers: this.Headers});
  }

  isloggedIn() {
    return this.http.get<isLoggedIn>(`${this.url}/user/isloggedIn`, {headers: this.Headers});
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
