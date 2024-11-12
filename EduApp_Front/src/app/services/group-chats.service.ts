import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

export class Group {
  constructor(public _id:string, public title:string, public description:string, public messages:string[], 
    public participants:string, public createdAt:string, public __v: number, public imageUrl:"favicon.ico"){}
}

export class Message {
  constructor(public _id:string, public username:string, public message:string, public room_id:string[], 
  public createdAt:string, public __v: number){}
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

  getAllChatMessages(token: string, id:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.get<Array<Message>>(`${this.url}/room/${id}`,  {headers: this.Headers});
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
