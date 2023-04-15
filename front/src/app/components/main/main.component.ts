import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateRoomPopUpComponent} from "../pop-up/create-room/create-room-pop-up.component";
import {JoinRoomPopUpComponent} from "../pop-up/join-room/join-room-pop-up.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private dialog: MatDialog) {}

  openCreationDialog(){
    const popUp = this.dialog.open(CreateRoomPopUpComponent, {
      width: "70%",
    });
    popUp.afterClosed().subscribe(v => console.log(v))
  }

  openJoinDialog(){
    const popUp = this.dialog.open(JoinRoomPopUpComponent, {
      width: "70%",
    });
    popUp.afterClosed().subscribe(v => console.log(v))
  }
}
