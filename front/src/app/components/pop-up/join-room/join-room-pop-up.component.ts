import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HttpRequestsService} from "../../../services/http-requests.service";

@Component({
  selector: 'app-pop-up',
  templateUrl: './join-room-pop-up.html',
  styleUrls: ['./join-room-pop-up.scss']
})
export class JoinRoomPopUpComponent {
  @ViewChild("roomID") roomInputRef!: ElementRef<HTMLInputElement>;
  constructor(
    private dialogRef: MatDialogRef<JoinRoomPopUpComponent>,
    private httpRequestS: HttpRequestsService
  ) {}

  closeDialog(){
    console.log("Закрытие");
    this.dialogRef.close();
  }

  joinRoom(){
    this.httpRequestS.getRoomById(this.roomInputRef.nativeElement.value).subscribe();
    this.closeDialog();
  }
}
