import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { CreateRoomPopUpComponent } from './components/pop-up/create-room/create-room-pop-up.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { QuestionComponent } from './components/question/question.component';
import {JoinRoomPopUpComponent} from "./components/pop-up/join-room/join-room-pop-up.component";
import { RoomComponent } from './components/room/room.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { LoginComponent } from './components/authorization/login/login.component';
import { RegistrationComponent } from './components/authorization/registration/registration.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {HttpRequestsService} from "./services/http-requests.service";
import {MatExpansionModule} from "@angular/material/expansion";
import {WebsocketService} from "./services/websockets.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreateRoomPopUpComponent,
    QuestionComponent,
    JoinRoomPopUpComponent,
    RoomComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatExpansionModule
  ],
  providers: [
    WebsocketService,
    HttpRequestsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
