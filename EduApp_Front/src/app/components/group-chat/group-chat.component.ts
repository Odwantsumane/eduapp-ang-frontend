import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Group, Message } from '../../services/group-chats.service';
import { MiddlemanService } from '../../services/middleman.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { User } from '../../services/userrequest.service';
//import { SocketIoService } from '../../services/socket-io.service';
// import * as Connection from '../../../common/connection';

class user {
  constructor(public id: number, public username: string, public label: string) {}
}

class message {
  constructor(public author: string, public date: Date, public message: string) {}
}

@Component({
  selector: 'app-group-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.css'
})
export class GroupChatComponent implements OnInit {

  messageFieldValue: string = "";

  messages: Array<message> = [];
  user: Array<User> = [];
  groupChats: Array<Group> = [];
  filteredMessages: Array<Message> = [];

  constructor (private groupchatreqservice: MiddlemanService, private authservice: AuthenticateService) //private socketIoService: SocketIoService
  {
    // this.socketIoService.listenIoServer(Connection.change).subscribe((change) => {this.onChange(change)});

    // this.socketService.listenToServer(Connection.create).subscribe((user) => {this.onCreate(user)})
  }

  ngOnInit() {
    this.getAllGroupChats();
  }

  async getAllGroupChats() {
    this.user.push(await this.authservice.isLoggedInGetUser());
    this.groupChats = await this.groupchatreqservice.getAllChatGroups(); 
 
  }

  async getMessages(id:string) {
    // console.log(id);
    // get and filter messages
    this.filteredMessages = await this.groupchatreqservice.getAllChatMessages(id); 
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
  }

  // onChange(change: user) { // argtype=user
  //   //const index = this.users.findIndex((user) => user.id === change.id);

  //   //this.users[index].label = change.label;

  // }

  // onCreate(user: user) {
  //   // this.users.push(user);

  // }


}
