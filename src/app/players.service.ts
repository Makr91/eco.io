import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PlayersService {

  socket: any;
  socketConnected$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.socket = io("https://tokyo.m4kr.net:3003", {});

    this.socket.on('connect', () => this.socketConnected$.next(true));
    this.socket.on('disconnect', () => this.socketConnected$.next(false));

    // this.listen('statsUpdate').subscribe(res => {
    //   this.totalRooms  = res.roomsCount;
    //   this.totalClients = res.clientsCount;
    // });

    this.socketConnected$.asObservable().subscribe( connected => {
      console.log('Socket connected: ', connected);
    });
  }

}
