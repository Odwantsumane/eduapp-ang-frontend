import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class product {
  constructor(public name:string, public specs:Array<string>, public createdBy:string, 
    public category:string, public location:string, public price:Number, public imageUrl:string){}
}

export class uploadResp {
  constructor(public message:string, public path:string){}
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  maxAge = 3 * 24 * 60 * 60;
  

  Headers: HttpHeaders = new HttpHeaders(); //{Authorization: this.createBasicAuthHeaders()}, Cookie: `jwt=${this.createToken("myid")}`
  url : string = "http://localhost:4001/product";
  upload_url : string = "http://localhost:4001/upload";

  constructor(private http: HttpClient) { }

    getAll(token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.get<Array<product>>(`${this.url}/all`,  {headers: this.Headers, withCredentials: true});
    }

    getProduct(id: string, token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.get<product>(`${this.url}/getProduct/${id}`,  {headers: this.Headers, withCredentials: true});
    }

    uploadPicture(file: File, token:string) {
      const formData = new FormData();
      formData.append('File', file); // 'File' matches the key expected by formidable

      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.post<uploadResp>(`${this.upload_url}`, formData, {headers: this.Headers, withCredentials: true});
    }
  
    createProduct(product: product, token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.post<product>(`${this.url}/create`, product, {headers: this.Headers, withCredentials: true});
    }
  
    updateProduct(id: string, product: product, token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.post<product>(`${this.url}/update/${id}`, product, {headers: this.Headers, withCredentials: true});
    }
  
    removeProduct(id: string, token:string) {
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
