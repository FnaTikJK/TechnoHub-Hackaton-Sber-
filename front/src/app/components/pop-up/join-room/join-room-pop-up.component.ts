import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HttpRequestsService} from "../../../services/http-requests.service";
import {Router} from "@angular/router";
import {switchMap} from "rxjs";
import {AppSignalrService} from "../../../services/websockets.service";

@Component({
  selector: 'app-pop-up',
  templateUrl: './join-room-pop-up.html',
  styleUrls: ['./join-room-pop-up.scss']
})
export class JoinRoomPopUpComponent {
  @ViewChild("roomID") roomInputRef!: ElementRef<HTMLInputElement>;
  constructor(
    private dialogRef: MatDialogRef<JoinRoomPopUpComponent>,
    private httpRequestS: HttpRequestsService,
    private router: Router,
    private socket: AppSignalrService
  ) {}

  closeDialog(){
    this.dialogRef.close();
  }

  joinRoom(){
    const roomGUId = this.roomInputRef.nativeElement.value;
    this.socket.sentToServer(roomGUId);
    this.httpRequestS.getRoomById(roomGUId)
      .subscribe( res =>
      this.router.navigate(["room"], {queryParams: {roomId: roomGUId}}));
    this.closeDialog();
  }
}
