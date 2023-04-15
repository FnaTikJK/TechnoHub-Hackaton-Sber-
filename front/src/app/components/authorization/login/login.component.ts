import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../styles/authorization-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('myForm') formRef!: FormGroupDirective;

  public form: FormGroup = new FormGroup({
    login: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(15)])
  });

  public incorrectAccountError$: BehaviorSubject<Error | null> = new BehaviorSubject<Error | null>(null);

  constructor
  (
    private router: Router
  ) {}

  public ngAfterViewInit(): void {
    this.formRef.valueChanges?.subscribe(() => {
      if(this.incorrectAccountError$.value instanceof Error)
        this.incorrectAccountError$.next(null);
    });
  }

  public signIn(): void{

  }

  public redirectToSignUp(): void{
    this.router.navigate(["registration"]);
  }
}
