import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GroupChatsService } from '../../services/group-chats.service';
import { MiddlemanService } from '../../services/middleman.service';
import { ManagerService } from '../../services/Aministration/manager.service';
import { User } from '../../services/userrequest.service';

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
  submit_disabled:boolean=false; 
  participants:Array<User> = [];
  selectedParticipants : Array<string> = [];


  newChat = {
    id:"",__v:0, title:"", description:"",messages:[],participants:[],groupPic:"",createdAt:""
  }
  constructor(private groupchatservice: MiddlemanService, private managerservice: ManagerService){}

  ngOnInit(): void {
    this.getUsers();
  }

  handleCreateChat() {
    this.groupchatservice.createNewChat(this.newChat)
  }

  async getUsers() {
    this.participants = await this.managerservice.getAllUsers();
  }

  verify() {

  }

}
