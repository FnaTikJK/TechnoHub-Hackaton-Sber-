import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {HttpRequestsService} from "../../../services/http-requests.service";
import {spaceValidator} from "../../../validators/spaceValidator";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss', '../styles/authorization-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements AfterViewInit{

  @ViewChild('myForm') formRef!: FormGroupDirective;
  public form: FormGroup = new FormGroup({
    login: new FormControl<string>("", [Validators.required, Validators.minLength(1), Validators.maxLength(15), spaceValidator()]),
    name: new FormControl<string>("", [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
    password: new FormControl<string>("", [Validators.required, Validators.minLength(1), Validators.maxLength(15), spaceValidator()]),
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

  public signUp(): void{
    this.httpRequestsS.register(this.form.value)
      .subscribe(res => {
        this.httpRequestsS.setToken(res.token);
        this.router.navigate(["main"]);
      });
  }

  public redirectToSignIn(): void{
    this.router.navigate(["login"]);
  }
}
