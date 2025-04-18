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
    public id:string,
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
    public selectedSubject: Array<string>,
    public profilePicture: string,
    public SuperUser: number,  // Convert 0 to Boolean for clarity
    public ManagerUser: number,
    public NormalUser: number,
    public RequestedSignUp: number, // Convert 1 to Boolean for clarity
    public active: number){};
}

export class SignInUser {
  constructor(
    public name: string,
    public surname: string,
    public username: string,
    public password: string, 
    //public password2: string,  
    public selectedSubject: Array<string>,
    public selectedDesignation: string,
    public selectedInstitution: string,
    public selectedCountry: string,){}

}

export class LoginResponse {
  constructor(public result:User, public success:boolean, public message:string, public token: string
  ) {}
}

class LoginReq {
  constructor(public username:string, public password:string){};
}

export class Logout {
  constructor(public loggedOut:boolean){};
}

export class isLoggedIn {
  constructor(public loggedIn: boolean, public user:User){};
}

export class getAllResult {
  constructor(public result: Array<User>, public success: boolean, public fatal: boolean, public message: string){};
}

@Injectable({
  providedIn: 'root'
})
export class UserrequestService {

  maxAge = 3 * 24 * 60 * 60;
  

  Headers: HttpHeaders = new HttpHeaders (); //, Cookie: `jwt=${this.createToken("myid")}`
  url : string = "http://localhost:4001/user";

  constructor(private http: HttpClient) { }

  getAllUsers() { // will use token later to identify who is requesting
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders()});
    return this.http.get<getAllResult>(`${this.url}/getAll_mysql`,  {headers: this.Headers, withCredentials: true});
  }

  getUser(id: string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders()});
    return this.http.get<User>(`${this.url}/getUser/${id}`,  {headers: this.Headers});
  }

  addUser(user: SignInUser) {  
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders()});
    return this.http.post<LoginResponse>(`${this.url}/post_mysql/signin`, user, {headers: this.Headers});
  }

  login (loginReq: LoginReq) { 
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders()}); 
    return this.http.post<LoginResponse>(`${this.url}/login`, loginReq, {headers: this.Headers});
  }

  logout () {  
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders()});
    return this.http.get<Logout>(`${this.url}/logout`, {headers: this.Headers});
  }

  isloggedIn(token: string) { 
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.get<isLoggedIn>(`${this.url}/isloggedIn`, {headers: this.Headers, withCredentials: true}); 
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
