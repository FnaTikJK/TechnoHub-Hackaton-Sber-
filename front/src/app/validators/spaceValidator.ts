import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function spaceValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null =>
    (/ /g.test(control.value)) ? {passwordStrength: true} : null;
}
