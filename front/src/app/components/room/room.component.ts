import { Component } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  public loading$ = new BehaviorSubject(true);
  load(){
    this.loading$.next(false);
  }
}
