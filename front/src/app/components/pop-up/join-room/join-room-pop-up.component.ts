import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpRequestsService} from "../../../services/http-requests.service";
import {Router} from "@angular/router";
import {WebsocketService} from "../../../services/websockets.service";
import {HttpTransportType, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

@Component({
  selector: 'app-pop-up',
  templateUrl: './join-room-pop-up.html',
  styleUrls: ['./join-room-pop-up.scss']
})
export class JoinRoomPopUpComponent implements OnInit{
  @ViewChild("roomID") roomInputRef!: ElementRef<HTMLInputElement>;
  private connection: any;
  private messages: {from: string, body: string}[] = [];
  constructor(
    private dialogRef: MatDialogRef<JoinRoomPopUpComponent>,
    private httpRequestS: HttpRequestsService,
    private router: Router,
    private socket: WebsocketService
  ) {
  }
  initWebSocket() {
    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:55434/Room', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Information)
      .build();
    connection.on('Get', (r) => console.log('gothim',r));
    connection.on('JoinUser', (...r) => {
      console.log('recieved join user')
      console.log(r)
    })
    connection.start().then(() => {
      const rId = '856be5b2-1ced-4b95-19cd-08db3df84507';
      connection.send('JoinRoom', rId, "Nikita").then(console.log)
        .catch(console.error)
      console.log('sended');
    })
      .catch(console.error);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  joinRoom(){
    const roomGUId = this.roomInputRef.nativeElement.value;
    this.httpRequestS.getRoomById(roomGUId)
      .subscribe( res =>
      this.router.navigate(["room"], {queryParams: {roomId: roomGUId}}));
    this.closeDialog();
  }

  ngOnInit(): void {
    this.initWebSocket();
  }
}
