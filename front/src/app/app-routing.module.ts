import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {CreateRoomPopUpComponent} from "./components/pop-up/create-room/create-room-pop-up.component";
import {QuestionComponent} from "./components/question/question.component";
import {RoomComponent} from "./components/room/room.component";

const routes: Routes = [
  {path: "main", component: MainComponent},
  {path: "", redirectTo: "main", pathMatch: "full"},
  {path: "pop", component: CreateRoomPopUpComponent},
  {path: "question", component: QuestionComponent},
  {path: "room", component: RoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
