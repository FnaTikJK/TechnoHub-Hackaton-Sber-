import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpRequestsService} from "../../services/http-requests.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit{
  public roomId!: string;
  public loading$ = new BehaviorSubject(true);
  public normalQuestionsCount: string = "";
  public roflQuestionsCount: string = "";

  constructor(
    private httpRequestsS: HttpRequestsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
        this.activatedRoute.queryParams
          .subscribe(params => this.roomId = params["roomId"]);
    }

  load(){
    this.loading$.next(false);
  }

  getQuestions(){
    this.httpRequestsS.getQuestions({
      normalQuestionsCount: parseInt(this.normalQuestionsCount),
      roflQuestionsFrequency: parseInt(this.roflQuestionsCount),
      usedQuestions: []
    }).subscribe();
  }

  questionsAreValid(){
    return this.normalQuestionsCount.length !== 0 && this.roflQuestionsCount.length !== 0 &&
    !isNaN(Number(this.normalQuestionsCount)) && !isNaN(Number(this.roflQuestionsCount))
  }

  deleteRoom(){
    this.httpRequestsS.deleteRoom(this.roomId).subscribe(() => this.router.navigate(["main"]));
  }
}
