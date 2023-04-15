import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccountReg} from "../models/DTO/account/IAccountReg";
import {IAccountAuth} from "../models/DTO/account/IAccountAuth";
import {IRoom} from "../models/IRoom";
import {IRoomCreate} from "../models/DTO/IRoomCreate";
import {GUID} from "../models/DTO/GUID";
import {IQuestion} from "../models/IQuestion";
import {IAuthentication} from "../models/response/IAuthentication";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  private URL: string = "https://localhost:55434/api/";
  private token?: string;

  constructor(private httpClient: HttpClient) {}

  setToken(token: string){
    localStorage.setItem("accessToken", JSON.stringify(token));
    this.token = token;
  }

  getToken(){
    return this.token;
  }

  isAutorized(){
    console.log(this.token)
    return !!this.token;
  }

  register(accountReg: IAccountReg) {
    return this.httpClient.post<IAuthentication>(`${this.URL}Account/Register`, accountReg);
  }

  login(accountAuth: IAccountAuth) {
    return this.httpClient.post<IAuthentication>(`${this.URL}Account/Login`, accountAuth);
  }
  getQuestionsById(id: GUID) {
    return this.httpClient.get<IQuestion>(`${this.URL}Questions/${id}`);
  }
  getQuestions(normalQuestionsCount: number, roflQuestionsFrequency: number) {
    return this.httpClient.get<IQuestion[]>(`${this.URL}Questions?normalQuestionsCount=${normalQuestionsCount}
                    &roflQuestionsCount=${roflQuestionsFrequency}`);
  }
  getRoomById(id: GUID) {
    return this.httpClient.get(`${this.URL}Rooms/${id}`);
  }
  deleteRoom(id: GUID) {
    return this.httpClient.delete(`${this.URL}Rooms/${id}`);
  }
  postRoom(room: IRoomCreate) {
    return this.httpClient.post(`${this.URL}Rooms`, room);
  }
  updateRoom(room: IRoomCreate) {
    return this.httpClient.patch(`${this.URL}Rooms`, room);
  }
}
