import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-pop-up',
  templateUrl: './join-room-pop-up.html',
  styleUrls: ['./join-room-pop-up.scss']
})
export class JoinRoomPopUpComponent {
  constructor(private dialogRef: MatDialogRef<JoinRoomPopUpComponent>) {}

  closeDialog(){
    console.log("Закрытие");
    this.dialogRef.close();
  }

  joinRoom(){
    console.log("Присоединение");
    this.closeDialog();
  }
}
