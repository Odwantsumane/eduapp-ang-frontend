import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class unreadMsgs {
  constructor (
    public room_id:string,
    public unreadNum: number
  ){};
}

export class User {
  constructor(
    public _id:number,
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

class LoginReq {
  constructor(public username:string, public password1:string){};
}

@Injectable({
  providedIn: 'root'
})
export class UserrequestService {

  Headers: HttpHeaders = new HttpHeaders ({Authorization: this.createBasicAuthHeaders()});
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
    return this.http.post<User>(`${this.url}/user/login`, loginReq, {headers: this.Headers});
  }

  createBasicAuthHeaders() {
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
}
