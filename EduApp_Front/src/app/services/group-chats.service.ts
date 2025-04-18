import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

export class Group {
  constructor(public id:string, public title:string, public description:string, public messages:string[], 
    public participants:string[], public createdAt:string, public __v: number, public groupPic:string){}
}

export class Message {
  constructor(public id:string, public username:string, public message:string, public room_id:string, 
  public createdAt:string, public __v: number, public audioUrl:string, public full_name: string){}
} 

export class readMessage {
  constructor(public userId:string, public roomId:string, public read:boolean){}
}

export class finalResponse {
  constructor(public result: Array<Message>, public success: boolean, public fatal: boolean, public message: string){};
}

export class singleMessageFinalResponse {
  constructor(public result: Array<Message>, public success: boolean, public fatal: boolean, public message: string){};
}


@Injectable({
  providedIn: 'root'
})
export class GroupChatsService {

  url : string = "http://localhost:4001/chat";
  url_ : string = "http://localhost:4001/topic";
  url__ : string = "http://localhost:4001/message";
  Headers: HttpHeaders = new HttpHeaders(); //, Cookie: `jwt=${this.createToken("myid")}`

  constructor(private http: HttpClient) { }


  // getAllChatGroups(token: string) {
  //   this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
  //   return this.http.get<Array<Group>>(`${this.url}/allChatRooms`,  {headers: this.Headers, withCredentials: true});
  // }

  getAllChatGroups(token: string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.get<Array<Group>>(`${this.url}/getAll_mysql`,  {headers: this.Headers, withCredentials: true});
  }

  getAllChatMessages(token: string, room_id:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    //return this.http.get<Array<Message>>(`${this.url}/room/${room_id}`,  {headers: this.Headers, withCredentials: true});
    return this.http.get<finalResponse>(`${this.url}/room/${room_id}`,  {headers: this.Headers, withCredentials: true});
  }

  createNewChat(token:string, newChat:Group) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.post<finalResponse>(`${this.url}/post_mysql/create`, newChat, {headers: this.Headers, withCredentials: true});
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
