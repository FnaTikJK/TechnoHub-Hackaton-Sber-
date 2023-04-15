import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {spaceValidator} from "../../../validators/spaceValidator";
import {HttpRequestsService} from "../../../services/http-requests.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../styles/authorization-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('myForm') formRef!: FormGroupDirective;

  public form: FormGroup = new FormGroup({
    login: new FormControl("", [Validators.required, spaceValidator()]),
    password: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(15), spaceValidator()])
  });

  public incorrectAccountError$: BehaviorSubject<Error | null> = new BehaviorSubject<Error | null>(null);

  constructor
  (
    private router: Router,
    private httpRequestsS: HttpRequestsService
  ) {}

  public ngAfterViewInit(): void {
    this.formRef.valueChanges?.subscribe(() => {
      if(this.incorrectAccountError$.value instanceof Error)
        this.incorrectAccountError$.next(null);
    });
  }

  public signIn(): void{
    this.httpRequestsS.login(this.form.value)
      .subscribe(res => {
        this.httpRequestsS.setToken(res.token);
        this.router.navigate(["main"]);
      });
  }

  public redirectToSignUp(): void{
    this.router.navigate(["registration"]);
  }
}
