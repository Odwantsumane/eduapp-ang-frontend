import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

class product {
  constructor(private name:string, private specs:Array<string>, private createdBy:string, 
    private category:string, private location:string, private price:Number, private imageUrl:string){}
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  maxAge = 3 * 24 * 60 * 60;
  

  Headers: HttpHeaders = new HttpHeaders(); //{Authorization: this.createBasicAuthHeaders()}, Cookie: `jwt=${this.createToken("myid")}`
  url : string = "http://localhost:4001/product";

  constructor(private http: HttpClient) { }

    getFolder(id: string, token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.get<product>(`${this.url}/getProduct/${id}`,  {headers: this.Headers, withCredentials: true});
    }
  
    createFolder(product: product, token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.post<product>(`${this.url}/create`, product, {headers: this.Headers, withCredentials: true});
    }
  
    updateFolder(id: string, product: product, token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.post<product>(`${this.url}/update/${id}`, product, {headers: this.Headers, withCredentials: true});
    }
  
    removeFolder(id: string, token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.post<product>(`${this.url}/remove/${id}`, {headers: this.Headers, withCredentials: true});
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
