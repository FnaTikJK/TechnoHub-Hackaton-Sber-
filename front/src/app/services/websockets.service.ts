
import { Injectable, OnDestroy } from '@angular/core';
import {webSocket} from "rxjs/webSocket";
//import * as fromRoot from '@app/store/reducers';


@Injectable({
  providedIn: 'root'
})
export class AppSignalrService{
  constructor() {}
  subject = webSocket("ws://localhost:55434/");

  sentToServer($event: any){
    this.subject.subscribe();
    this.subject.next($event);
    this.subject.complete();
  }
}
