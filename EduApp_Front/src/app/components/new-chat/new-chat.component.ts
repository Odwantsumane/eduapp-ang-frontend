import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GroupChatsService } from '../../services/group-chats.service';
import { MiddlemanService } from '../../services/middleman.service';
import { ManagerService } from '../../services/Aministration/manager.service';
import { User } from '../../services/userrequest.service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-new-chat',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.css'
})
export class NewChatComponent implements OnInit{

  title:string="";
  description:string="";
  createChat:boolean=false; 
  participants:Array<User> = [];
  selectedParticipants : Array<string> = [];
  createSuccess: boolean = false;
  sent:boolean = false;

  newChat = {
    id:"",__v:0, title:"", description:"",messages:[],participants:[""],groupPic:"",createdAt:"", createdBy:""
  }
  constructor(private groupchatservice: MiddlemanService, private managerservice: ManagerService, private auth:AuthenticateService){}

  ngOnInit(): void {
    this.getUsers();
  }

  async handleCreateChat() {
    this.newChat.title = this.title;
    this.newChat.description = this.description;
    this.newChat.participants = this.selectedParticipants;
    this.newChat.createdBy = (await this.auth.isLoggedInGetUser()).username;
    this.createSuccess = await this.groupchatservice.createNewChat(this.newChat);
    this.sent = true;
  }

  async getUsers() {
    this.participants = await this.managerservice.getAllUsers();
  }

  async verify() { 
    if(!this.isTextEmpty(this.title) && !this.isTextEmpty(this.description) && this.selectedParticipants.length > 0) {
      this.createChat = true;
    } else {
      this.createChat = false;
    }
  } 

  isTextEmpty(value: string): boolean {
    const messageRegex = /^\s*$/;
    return messageRegex.test(value);
  }

}
