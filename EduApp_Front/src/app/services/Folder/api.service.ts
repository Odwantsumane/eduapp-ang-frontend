import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../../const/endpoints';

export class folder {
  constructor(public id:string, public title:string, public description:string, public createdBy:string, public course:string, public createdAt:string){}
}

export class resultFolder {
  constructor(public result:Array<folder>,public success: boolean, public fatal: boolean, public message: string){}
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  maxAge = 3 * 24 * 60 * 60;
  

  Headers: HttpHeaders = new HttpHeaders(); //{Authorization: this.createBasicAuthHeaders()}, Cookie: `jwt=${this.createToken("myid")}`
  url : string = endpoints.repository//"http://localhost:4001/folder";

  constructor(private http: HttpClient) { }

  getAll(token:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.get<resultFolder>(`${this.url}/getAll_mysql`,  {headers: this.Headers, withCredentials: true});
  }

  getFolder(id: string, token:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.get<resultFolder>(`${this.url}/${id}`,  {headers: this.Headers, withCredentials: true});
  }

  createFolder(folder: folder, token:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.post<resultFolder>(`${this.url}/post_mysql/create`, folder, {headers: this.Headers, withCredentials: true});//create
  }

  updateFolder(id: string, folder: folder, token:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.put<resultFolder>(`${this.url}/update/${id}`, folder, {headers: this.Headers, withCredentials: true});
  }

  removeFolder(id: string, token:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.delete<resultFolder>(`${this.url}/remove_mysql/${id}`, {headers: this.Headers, withCredentials: true});
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
} 

