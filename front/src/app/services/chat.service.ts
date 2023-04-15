import { Injectable } from "@angular/core";
import {map, Subject} from "rxjs";
import {WebsocketService} from "./websockets.service";


const CHAT_URL = "ws://echo.websocket.org/";

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      }));
  }
}
