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

  // audio stuff
  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];
  public audioUrl: string | null = null;
  public isRecording: boolean = false;
  public startedRecording : boolean = false;

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
    this.receiveSenderMessage();
    this.receiveBroadcastMessage();
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
       console.log("Hello again");
       console.log(data);
    });
  }

  receiveBroadcastMessage() { 

    this.socketservice.onEvent<userTypingdetails>('chat message').subscribe(data => {
       // some logic
       console.log("Hello again");
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

  async MonitorMessageTyping(event:Event) { 
    
    if (this.messageFieldValue !== "") {

      const messageFieldData = {
        _id:"",
        username: "you",
        createdAt: "",
        message: this.messageFieldValue,
        room_id: this.roomId,
        __v: 0
      }
      // _id:"",__v:0,createdAt:"", username: "", message: "", room_id: ""

      //messageFieldData.message = this.messageFieldValue;
      //this.messages.push(messageFieldData);

      //const messageResp = await this.groupchatreqservice.createNewMessage(messageFieldData); 
      //if(messageResp) console.log(messageResp);

      this.socketservice.emitEvent('chat message', {input:this.messageFieldValue,path:"", filename:"", filetype:"", username: this.user[0].name + " " + this.user[0].surname, 
        roomId: this.roomId, userId: this.user[0]._id
      });
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

  async startRecording(): Promise<void> {
    console.log("starting recording")
    try {
      

      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      // Clear previous data
      this.audioChunks = [];

      // Start recording
      this.mediaRecorder.start();
      this.isRecording = true;

      // Collect audio chunks
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      console.log('Recording started...');
    } catch (error) {
      console.error('Error accessing the microphone:', error);
    }
  }

  stopRecording(): void {
    console.log("stopping recording")
    if (this.mediaRecorder) {
      // Stop recording
      this.mediaRecorder.stop();
      this.isRecording = false;

      // Generate audio URL after stopping
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioUrl = URL.createObjectURL(audioBlob);
        console.log('Recording stopped, audio URL created.');
      };
    }
  }

  attachEmoji(value: string) {  

    this.messageFieldValue = this.messageFieldValue + value;
    this.notifyWhenTyping();
  }
}
