import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HttpRequestsService} from "../../../services/http-requests.service";
import {Router} from "@angular/router";
import {switchMap} from "rxjs";
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-pop-up',
  templateUrl: './join-room-pop-up.html',
  styleUrls: ['./join-room-pop-up.scss']
})
export class JoinRoomPopUpComponent {
  @ViewChild("roomID") roomInputRef!: ElementRef<HTMLInputElement>;
  private message = {
    author: "nik",
    message: "howdy folks"
  }
  constructor(
    private dialogRef: MatDialogRef<JoinRoomPopUpComponent>,
    private httpRequestS: HttpRequestsService,
    private router: Router,
    private chatS: ChatService
  ) {    this.chatS.messages.subscribe(msg => {
    console.log("Response from WS Server " + msg)
  });}

  closeDialog(){
    this.dialogRef.close();
  }

  sendMsg(){
    console.log("New Msg sent");
    this.chatS.messages.next(this.message);
  }
  joinRoom(){
    this.sendMsg();
    const roomGUId = this.roomInputRef.nativeElement.value;
    this.httpRequestS.getRoomById(roomGUId)
      .subscribe( res =>
      this.router.navigate(["room"], {queryParams: {roomId: roomGUId}}));
    this.closeDialog();
  }
}
