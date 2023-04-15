import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {HttpRequestsService} from "../services/http-requests.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private httpRequestS: HttpRequestsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.httpRequestS.isAutorized() ? next.handle(request.clone(
      {setHeaders: {Authorization: `Bearer ${this.httpRequestS.getToken()}`}})) : next.handle(request);
  }
}
