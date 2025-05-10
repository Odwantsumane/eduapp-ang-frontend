import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class notification {
  constructor(public id:string, public sentTo:string, public sentBy:string, 
    public category:string, public createdAt:string, public updatedAt:string, public read:string){}
}

export class uploadResp {
  constructor(public message:string, public path:string){}
}

export class result {
  constructor(public result: Array<notification>, public success: boolean, public fatal: boolean, public message: string){};
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  maxAge = 3 * 24 * 60 * 60;
  

  Headers: HttpHeaders = new HttpHeaders();
  url : string = "http://localhost:4001/notifications"; 

  constructor(private http: HttpClient) { }

    getAll(token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.get<Array<notification>>(`${this.url}/getAll_mysql`,  {headers: this.Headers, withCredentials: true});
    }

    getNotification(id: string, token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.get<result>(`${this.url}/get_mysql/${id}`,  {headers: this.Headers, withCredentials: true});
    } 
  
    createNotification(notification: notification, token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.post<result>(`${this.url}/post_mysql/create`, notification, {headers: this.Headers, withCredentials: true});
    }
  
    updateNotification(id: string, notification: notification, token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.put<result>(`${this.url}/put_mysql/${id}`, notification, {headers: this.Headers, withCredentials: true});
    }
  
    removeNotification(id: string, token:string) {
      this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
      return this.http.post<result>(`${this.url}/remove_mysql/${id}`, {headers: this.Headers, withCredentials: true});
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
