import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Group, Message, readMessage } from '../../services/group-chats.service';
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
export class GroupChatComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
  @ViewChild('chatContainer')
  private chatContainer!: ElementRef;

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
  public audioUrl: string = "";
  public isRecording: boolean = false;
  public startedRecording : boolean = false;
  audioBlobStore : Blob | null = null;

  scroll: boolean = true;
  newMessageInd : boolean = false;
  scrollPosition: number = 0;

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
    this.readMessageReceipt();
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

  // sendMessage() {
  //   this.socketservice.emitEvent('chat message', {input:this.message});
  // }

  // sendAudio() {
  //   this.socketservice.emitEvent('chat message', {input:this.audioUrl});
  // }

  receiveSenderMessage() { 

    this.socketservice.onEvent<Message>('sender chat message').subscribe(data => {
       // some logic 
       console.log(data);
       this.filteredMessages.push(data);
       this.scroll = true;
    });
  }

  receiveBroadcastMessage() { 

    this.socketservice.onEvent<Message>('chat message').subscribe(data => {
       // some logic
      if (data && data.room_id === this.roomId) {
        this.filteredMessages.push(data);
        this.newMessageInd = true;
      }

    });
  }

  readMessageEmit() : void {
    this.socketservice.emitEvent('read message', {userId: this.user[0]._id, roomId: this.roomId, read: true});
  }

  readMessageReceipt() { 

    this.socketservice.onEvent<readMessage>('read message').subscribe(data => {
       // some logic  
       this.newMessageInd = !data.read;
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
 
    this.enterUserInRoom();
    this.scroll = true;
  }

  async sendMessage() { 
    console.log("blob: "+ this.audioBlobStore);
    if (this.messageFieldValue !== "" || this.audioUrl !== "") {

      this.socketservice.emitEvent('chat message', {input:this.messageFieldValue,path:"", filename:"frontaudio.mp3", filetype:"audio/mpeg", username: this.user[0].name + " " + this.user[0].surname, 
        roomId: this.roomId, userId: this.user[0]._id, audioBlob:this.audioBlobStore
      });
    } 
 
    // clear field
    console.log("Clearing field value...");
    this.messageFieldValue = "";
    this.typing = false;
    this.audioUrl = "";
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
        this.audioBlobStore = audioBlob;
        this.audioUrl = URL.createObjectURL(audioBlob);
        console.log('Recording stopped, audio URL created.');
      };
    }
  }

  generateAudioUrl(audioUrl:string):string { 
    console.log(audioUrl);
    return audioUrl;
  }

  attachEmoji(value: string) {  

    this.messageFieldValue = this.messageFieldValue + value;
    this.notifyWhenTyping();
  }

  ngAfterViewChecked(): void {  
    this.scrollSpy();

    if (this.scroll) {
      this.scrollToBottom();
      this.scroll = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error("Scroll error:", err);
    }
  }

  private scrollSpy(): void { 
    if(this.newMessageInd && this.chatContainer.nativeElement.scrollTop === this.chatContainer.nativeElement.scrollHeight) {
      this.newMessageInd = false;
    }
  }

  ngAfterViewInit(): void {
    const div = this.chatContainer.nativeElement;
    const per = 

    // Listen to scroll event on the specific div
    div.addEventListener('scroll', () => {
      this.scrollPosition = div.scrollTop;
      //console.log('Scroll Position:', this.scrollPosition);
      // console.log("height: "+ (div.scrollHeight) + " "+ "scrollpos: "+ this.scrollPosition + " okay: "+ (div.scrollHeight - div.clientHeight)); 
      // Trigger your custom logic
      if (this.scrollPosition >= ((div.scrollHeight - div.clientHeight)-5)) {
        this.readMessageEmit(); 
      }
    });
  }
}
