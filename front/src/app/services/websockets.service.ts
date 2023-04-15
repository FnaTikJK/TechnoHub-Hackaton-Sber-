import { Injectable } from "@angular/core";
import {Observable, Observer, Subject} from "rxjs";
import {SignalrClient, SignalrConnection} from "ngx-signalr-websocket";
import {HttpClient} from "@angular/common/http";
import {IHubMessage} from "ngx-signalr-websocket/lib/protocol";

@Injectable()
export class WebsocketService {

  public socket!: SignalrConnection;
  constructor(private httpClient: HttpClient) {
    new SignalrClient(this.httpClient).connect("https://localhost:55434/Room").subscribe(v =>{
      this.socket = v;
    });
    // new SignalrConnection("https://localhost:55434/Room", {
    //   serialize: (messages: any) => "",
    //   deserialize: (messageEvent: any) => <IHubMessage>{}
    // })
  }

}
