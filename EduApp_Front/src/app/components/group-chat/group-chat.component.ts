import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Group, Message } from '../../services/group-chats.service';
import { MiddlemanService } from '../../services/middleman.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { User } from '../../services/userrequest.service';
import { SocketIoService } from '../../services/socket-io.service';
// import * as Connection from '../../../common/connection';

class user {
  constructor(public id: number, public username: string, public label: string) {}
}

class message {
  constructor(public author: string, public date: Date, public message: string) {}
}

class userTypingdetails {
  constructor(public name:string, public id: string, public roomId: string){};
} 

@Component({
  selector: 'app-group-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.css'
})
export class GroupChatComponent implements OnInit, OnDestroy {

  messageFieldValue: string = "";

  messages: Array<message> = [];
  user: Array<User> = [];
  groupChats: Array<Group> = [];
  filteredMessages: Array<Message> = [];
  message : string = "";

  name: string = "";
  roomId: string = "";
  userId: string = "";

  messagesTest: string[] = [];
  typing: boolean = false;
  typingData: userTypingdetails = {name:"", id:"", roomId:""};

  todayDate = new Date();
  yesterdayDate = new Date(this.todayDate);

  constructor (private groupchatreqservice: MiddlemanService, 
    private authservice: AuthenticateService, 
    private socketservice: SocketIoService)
  {
    this.yesterdayDate.setDate(this.todayDate.getDate() - 1); 
  }

  ngOnInit() { 
    // console.log(this.todayDate);
    this.getAllGroupChats();
    this.manageSocketActivity();
    this.receivedTypingNotification();
  }

  manageSocketActivity(): void {
    // Listen to a specific event
    this.socketservice.onEvent<string>('message').subscribe((data) => {
      this.messagesTest.push(data);
    }); 
  }

  emitEventTest() {
    // Emit an event test
    this.socketservice.emitEvent('joinRoom', { room: 'room1' });
  }

  enterUserInRoom() {
    // send user details
    this.socketservice.emitEvent("name", { name: this.user[0].name + " " + this.user[0].surname, userId: this.user[0]._id, roomId: this.roomId}); 
  }

  sendMessage() {
    this.socketservice.emitEvent('chat message', {input:this.message});
  }

  receiveSenderMessage() { 

    this.socketservice.onEvent<userTypingdetails>('sender chat message').subscribe(data => {
       // some logic
    });
  }

  receiveBroadcastMessage() { 

    this.socketservice.onEvent<userTypingdetails>('chat message').subscribe(data => {
       // some logic
    });
  }

  notifyWhenTyping() { 
    if(this.messageFieldValue !== "" && !this.isTextEmpty())
      this.socketservice.emitEvent('user is typing', {name:this.user[0].name + " " + this.user[0].surname, id: this.user[0]._id, roomId: this.roomId});
    else 
      this.socketservice.emitEvent('user is typing', {name:null, id: this.user[0]._id, roomId: this.roomId});
  }

  receivedTypingNotification() {
    // console.log(this.socketservice.onEvent("user typing"));

    this.socketservice.onEvent<userTypingdetails>('user typing').subscribe(data => {
      // console.log('Typing notification received:', data);
      (data.name && data.roomId === this.roomId) ? this.typing = true : this.typing = false;
      
      this.typingData = data;
    });
  }

  async getAllGroupChats() {
    this.user.push(await this.authservice.isLoggedInGetUser());
    this.groupChats = await this.groupchatreqservice.getAllChatGroups(); 
 

    // this.getMessages(this.groupChats[0]._id);
  }

  async getMessages(id:string) {
    // console.log(id);

    this.roomId = id;
    // get and filter messages
    this.filteredMessages = await this.groupchatreqservice.getAllChatMessages(id); 

    // console.log("sending test message to the backend");
    // this.emitEventTest();
    this.enterUserInRoom();
  }

  MonitorMessageTyping(event:Event): void { 
    
    if (this.messageFieldValue !== "") {

      const messageFieldData = {
        author: "you",
        date: new Date(),
        message: ""
      }

      messageFieldData.message = this.messageFieldValue;
      this.messages.push(messageFieldData);
    } 
 
    // clear field
    console.log("Clearing field value...");
    this.messageFieldValue = "";
    this.typing = false;
  }

  // onChange(change: user) { // argtype=user
  //   //const index = this.users.findIndex((user) => user.id === change.id);

  //   //this.users[index].label = change.label;

  // }

  // onCreate(user: user) {
  //   // this.users.push(user);

  // }

  ngOnDestroy(): void {
    this.socketservice.disconnect();
  }

  isTextEmpty(): boolean {
    const messageRegex = /^\s*$/;
    return messageRegex.test(this.messageFieldValue);
  }

  computeDateDisplay() {
    //| date: 'dd/MM/yyyy'
    if(true) {

    }
  }

}
