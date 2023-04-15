import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pop-up',
  templateUrl: './create-room-pop-up.html',
  styleUrls: ['./create-room-pop-up.scss']
})
export class CreateRoomPopUpComponent {
  public form: FormGroup = new FormGroup({
    roomName: new FormControl("Комната"),
    sideQuestions: new FormControl(false),
    sideQuestionsFrequency: new FormControl(1)
  })

  constructor(private dialogRef: MatDialogRef<CreateRoomPopUpComponent>, private router: Router) {}

  closeDialog(){
    this.dialogRef.close(this.form.value);
  }

  createRoom(){
    this.closeDialog();
    this.router.navigate(["room"]);
  }
}
