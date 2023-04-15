import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpRequestsService} from "../../../services/http-requests.service";

@Component({
  selector: 'app-pop-up',
  templateUrl: './create-room-pop-up.html',
  styleUrls: ['./create-room-pop-up.scss']
})
export class CreateRoomPopUpComponent {
  public form: FormGroup = new FormGroup({
    roomName: new FormControl("Комната")
  })

  constructor(private dialogRef: MatDialogRef<CreateRoomPopUpComponent>, private router: Router, private httpRequestsS: HttpRequestsService) {}

  closeDialog(){
    this.dialogRef.close(this.form.value);
  }

  createRoom(){
    this.httpRequestsS.postRoom(this.form.value);
    this.closeDialog();
    this.router.navigate(["room"]);
  }
}
