import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router'; 
import { ChatOptionsComponent } from '../chat-options/chat-options.component';

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

  ngOnInit(): void { 
    if(this.allchats===3) this.chats.splice(3, this.chats.length); 
  }

}
