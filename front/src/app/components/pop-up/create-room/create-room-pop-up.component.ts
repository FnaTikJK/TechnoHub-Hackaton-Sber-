import {Component, ElementRef, ViewChild} from '@angular/core';
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
    name: new FormControl("Комната")
  })
  constructor(private dialogRef: MatDialogRef<CreateRoomPopUpComponent>, private router: Router, private httpRequestsS: HttpRequestsService) {}

  closeDialog(){
    this.dialogRef.close(this.form.value);
  }

  createRoom(){
    this.httpRequestsS.postRoom(this.form.value)
      .subscribe(res => {
        this.router.navigate(["room"],
          {queryParams: { roomId: res.id }});
      });
    this.closeDialog();
  }
}
