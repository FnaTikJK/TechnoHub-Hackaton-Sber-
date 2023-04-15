import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccountReg} from "../models/DTO/account/IAccountReg";
import {IAccountAuth} from "../models/DTO/account/IAccountAuth";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  private URL: string = "https://localhost:55434/api/";

  constructor(private httpClient: HttpClient) {
  }

  register(accountReg: IAccountReg) {
    return this.httpClient.post(`${this.URL}Account/Register`, accountReg);
  }

  login(accountAuth: IAccountAuth) {
    return this.httpClient.post(`${this.URL}Account/Login`, accountAuth);
  }
  getQuestionsById() {

  }
  getQuestions(normalQuestionsCount: number, roflQuestionsFrequency: number) {
    return this.httpClient.get(`/Questions?normalQuestionsCount=${normalQuestionsCount}
                    &roflQuestionsCount=${roflQuestionsFrequency}`);
  }
  getRooms() {
    return this.httpClient.get(``)
  }

}
