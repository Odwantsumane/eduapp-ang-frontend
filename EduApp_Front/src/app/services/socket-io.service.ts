import { Injectable } from '@angular/core';
// import * as Connection from '../../../comm'
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
const backendURL = 'http://localhost:4001';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private clientSocket: socketIo.Socket;

  constructor() {
    this.clientSocket = socketIo.io(backendURL);
    //, {
      //transports: ['websocket', 'polling'], // Explicitly allow these transports
      //withCredentials: true
    //}
  }

  // Emit an event
  emitEvent(event: string, data: any): void {
    this.clientSocket.emit(event, data);
  }

  listenIoServer(connection: any): Observable<any> {
    return new Observable((subscribe) => {
      this.clientSocket.on('', (data) => {
        subscribe.next(data);
      })
    });
  }

  // Listen for an event
  onEvent<T>(event: string): Observable<T> {
    return new Observable<T>(observer => {
      this.clientSocket.on(event, (data: T) => observer.next(data));
    });
  }

  emitToServer(connection: any, data: string): void {
    this.clientSocket.emit(connection, data);
  }

  // Close socket connection
  disconnect(): void {
    if (this.clientSocket) {
      this.clientSocket.disconnect();
    }
  }
}
