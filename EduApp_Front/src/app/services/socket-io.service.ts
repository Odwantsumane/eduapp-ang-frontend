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
    this.clientSocket = socketIo.connect(backendURL);
  }

  listenIoServer(connection: any): Observable<any> {
    return new Observable((subscribe) => {
      this.clientSocket.on('', (data) => {
        subscribe.next(data);
      })
    });
  }

  emitToServer(connection: any, data: string): void {
    this.clientSocket.emit(connection, data);
  }
}
