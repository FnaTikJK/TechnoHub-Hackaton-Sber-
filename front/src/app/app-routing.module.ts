import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {CreateRoomPopUpComponent} from "./components/pop-up/create-room/create-room-pop-up.component";
import {QuestionComponent} from "./components/question/question.component";
import {RoomComponent} from "./components/room/room.component";
import {LoginComponent} from "./components/authorization/login/login.component";
import {RegistrationComponent} from "./components/authorization/registration/registration.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "main", component: MainComponent},
  {path: "pop", component: CreateRoomPopUpComponent},
  {path: "question", component: QuestionComponent},
  {path: "room", component: RoomComponent},
  {path: "", component: AppComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
