import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {HttpRequestsService} from "../../../services/http-requests.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss', '../styles/authorization-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements AfterViewInit{

  @ViewChild('myForm') formRef!: FormGroupDirective;
  public form: FormGroup = new FormGroup({
    login: new FormControl<string>("", [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
    name: new FormControl<string>("", [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
    password: new FormControl<string>("", [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
  });

  public incorrectAccountError$: BehaviorSubject<Error | null> = new BehaviorSubject<Error | null>(null);

  constructor
  (
    private router: Router,
    private httpRequestS: HttpRequestsService
  ) {}

  public ngAfterViewInit(): void {
    this.formRef.valueChanges?.subscribe(() => {
      if(this.incorrectAccountError$.value instanceof Error)
        this.incorrectAccountError$.next(null);
    });
  }

  public signUp(): void{
    this.httpRequestS.register(this.form.value).subscribe(v => alert("антон пидор"));
  }

  public redirectToSignIn(): void{
    this.router.navigate(["login"]);
  }
}
