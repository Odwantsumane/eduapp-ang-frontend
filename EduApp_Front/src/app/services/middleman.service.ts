import { Injectable } from '@angular/core';
import { Group, GroupChatsService, Message } from './group-chats.service';
import { CookieLocalService } from './cookie-local.service';

@Injectable({
  providedIn: 'root'
})
export class MiddlemanService {

  PlaceHolderArray: Group[] = [];
  PlaceHolderArrayMessages: Message[] = [];

  constructor(private groupchatservice: GroupChatsService, private cookieservice: CookieLocalService) { }

  async getAllChatGroups(): Promise<Array<Group>> {
    // Check if user is logged in
    // if (!(await this.isLoggedIn2())) {
    //   return this.handleGroupChats(this.PlaceHolderArray);
    // }
  
    // if (this.token === "notoken") {
    //   return this.handleGroupChats(this.PlaceHolderArray);
    // }
  
    try {
      const response = await this.groupchatservice
        .getAllChatGroups(this.cookieservice.getCookie() || "notoken")
        .toPromise();
      return this.handleGroupChats(response);
    } catch (error) {
      this.handleError(error);
      return this.PlaceHolderArray; // Return a placeholder array on error
    }
  }
  async getAllChatMessages(id:string): Promise<Array<Message>> {
  
    try {
      const response = await this.groupchatservice
        .getAllChatMessages(this.cookieservice.getCookie() || "notoken", id)
        .toPromise();
      return this.handleGroupMessages(response);
    } catch (error) {
      this.handleError(error);
      return this.PlaceHolderArrayMessages; // Return a placeholder array on error
    }
  }

  handleGroupChats(response: Array<Group> | undefined): Array<Group> {

    if(response === undefined) return this.PlaceHolderArray;
    return response;
  }

  handleGroupMessages(response: Array<Message> | undefined): Array<Message> {

    if(response === undefined) return this.PlaceHolderArrayMessages;
    return response;
  }

  handleError(error: any) {

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