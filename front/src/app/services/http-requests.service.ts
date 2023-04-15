import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccountReg} from "../models/DTO/account/IAccountReg";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  private URL: string = "https://localhost:55434/api/";
  constructor(private httpClient: HttpClient) { }

  register(accountReg: IAccountReg){
   return  this.httpClient.post(`${this.URL}Account/Register`, accountReg);
  }
}
