import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

export class Group {
  constructor(public _id:string, public title:string, public description:string, public messages:string[], 
    public participants:string[], public createdAt:string, public __v: number, public groupPic:string){}
}

export class Message {
  constructor(public _id:string, public username:string, public message:string, public room_id:string, 
  public createdAt:string, public __v: number){}
} 

export class readMessage {
  constructor(public userId:string, public roomId:string, public read:boolean){}
}


@Injectable({
  providedIn: 'root'
})
export class GroupChatsService {

  url : string = "http://localhost:4001/chat";
  url_ : string = "http://localhost:4001/topic";
  url__ : string = "http://localhost:4001/message";
  Headers: HttpHeaders = new HttpHeaders ({Authorization: this.createBasicAuthHeaders()}); //, Cookie: `jwt=${this.createToken("myid")}`

  constructor(private http: HttpClient) { }


  getAllChatGroups(token: string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.get<Array<Group>>(`${this.url}/allChatRooms`,  {headers: this.Headers, withCredentials: true});
  }

  getAllChatMessages(token: string, room_id:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.get<Array<Message>>(`${this.url}/room/${room_id}`,  {headers: this.Headers, withCredentials: true});
  }

  createNewChat(token:string, newChat:Group) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.post<Group>(`${this.url_}/add-topic`, newChat, {headers: this.Headers, withCredentials: true});
  }

  createNewMessage(token:string, newMessage:Message) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.post<Message>(`${this.url__}/new-message`, newMessage, {headers: this.Headers, withCredentials: true});
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
