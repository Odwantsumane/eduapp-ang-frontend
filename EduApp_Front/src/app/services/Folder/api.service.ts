import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class folder {
  constructor(public title:string, public description:string, public createdBy:string, public course:string){}
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  maxAge = 3 * 24 * 60 * 60;
  

  Headers: HttpHeaders = new HttpHeaders(); //{Authorization: this.createBasicAuthHeaders()}, Cookie: `jwt=${this.createToken("myid")}`
  url : string = "http://localhost:4001/folder";

  constructor(private http: HttpClient) { }

  getAll(token:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.get<Array<folder>>(`${this.url}/all`,  {headers: this.Headers, withCredentials: true});
  }

  getFolder(id: string, token:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.get<folder>(`${this.url}/${id}`,  {headers: this.Headers, withCredentials: true});
  }

  createFolder(folder: folder, token:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.post<folder>(`${this.url}/create`, folder, {headers: this.Headers, withCredentials: true});
  }

  updateFolder(id: string, folder: folder, token:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.post<folder>(`${this.url}/update/${id}`, folder, {headers: this.Headers, withCredentials: true});
  }

  removeFolder(id: string, token:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.post<folder>(`${this.url}/remove/${id}`, {headers: this.Headers, withCredentials: true});
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

