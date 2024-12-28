import { Injectable } from '@angular/core';
import { Group, GroupChatsService, Message } from './group-chats.service';
import { CookieLocalService } from './cookie-local.service';

@Injectable({
  providedIn: 'root'
})
export class MiddlemanService {

  PlaceHolderArray: Group[] = [];
  PlaceHolderArrayMessages: Message[] = [];

  PlaceHolderGroup:Group = {
    _id:"",__v:0, title:"", description:"",messages:[],participants:[],groupPic:"",createdAt:""
  }
  PlaceHolderMsg:Message = {
    _id:"",__v:0,createdAt:"", username: "", message: "", room_id: ""
  }

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

  async createNewChat(newChat:Group): Promise<Group> {
  
    try {
      const response = await this.groupchatservice
        .createNewChat(this.cookieservice.getCookie() || "notoken", newChat)
        .toPromise();
      return this.handleCreateChatResp(response);
    } catch (error) {
      this.handleError(error);
      return this.PlaceHolderGroup; // Return a placeholder array on error
    }
  }

  async createNewMessage(newMesssage:Message): Promise<Message> {
  
    try {
      const response = await this.groupchatservice
        .createNewMessage(this.cookieservice.getCookie() || "notoken", newMesssage)
        .toPromise();
      return this.handleCreateMsgResp(response);
    } catch (error) {
      this.handleError(error);
      return this.PlaceHolderMsg; // Return a placeholder array on error
    }
  }

  handleCreateMsgResp(response: Message | undefined): Message {

    if(response === undefined) return this.PlaceHolderMsg;
    return response;
  }

  handleCreateChatResp(response: Group | undefined): Group {

    if(response === undefined) return this.PlaceHolderGroup;
    return response;
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
}
