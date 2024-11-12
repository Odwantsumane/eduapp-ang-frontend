import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router'; 
import { ChatOptionsComponent } from '../chat-options/chat-options.component';
import { Group } from '../../services/group-chats.service';
import { MiddlemanService } from '../../services/middleman.service';

class chat {
  constructor(public title:string, public profileUrl:string){}
}

@Component({
  selector: 'app-chats-view',
  standalone: true,
  imports: [RouterOutlet,RouterLink, FormsModule, CommonModule, ChatOptionsComponent],
  templateUrl: './chats-view.component.html',
  styleUrl: './chats-view.component.css'
})
export class ChatsViewComponent implements OnInit{

  @Input() allchats = 0;
  groupChats: Array<Group> = [];
  filterArray: Array<Group> = [];

  chats : Array<chat> = [
    {title: "Physics", profileUrl: "favicon.ico"},
    {title: "Chemistry", profileUrl: "favicon.ico"},
    {title: "Entomology", profileUrl: "favicon.ico"},
    {title: "Biology 102", profileUrl: "favicon.ico"},
    {title: "Biology 102", profileUrl: "favicon.ico"},
    {title: "Entomology", profileUrl: "favicon.ico"},
    {title: "Biology 102", profileUrl: "favicon.ico"},
    {title: "Biology 102", profileUrl: "favicon.ico"},
  ];

  constructor(private groupchatreqservice: MiddlemanService){}

  ngOnInit(): void { 
    // if(this.allchats===3) this.chats.splice(3, this.chats.length); 
    this.updateChats();

    if(this.allchats===3 && this.groupChats.length > 0) this.groupChats.splice(3, this.groupChats.length);
  }

  async updateChats() {
    this.groupChats = await this.groupchatreqservice.getAllChatGroups();
    // console.log(this.groupChats);

    if(this.groupChats && this.allchats !==0){
       for (let index = 0; index < 3; index++) {
         this.filterArray.push(this.groupChats[index]);
        
       }
    } else {
      this.filterArray = this.groupChats;
    }
  }

}
