import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

export class Group {
  constructor(public _id:string, public title:string, public description:string, public messages:string[], 
    public participants:string, public createdAt:string, public __v: number, public imageUrl:"favicon.ico"){}
}

@Injectable({
  providedIn: 'root'
})
export class GroupChatsService {

  url : string = "http://localhost:4001/chat";
  Headers: HttpHeaders = new HttpHeaders ({Authorization: this.createBasicAuthHeaders()}); //, Cookie: `jwt=${this.createToken("myid")}`

  constructor(private http: HttpClient) { }


  getAllChatGroups(token: string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.get<Array<Group>>(`${this.url}/allChatRooms`,  {headers: this.Headers});
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
