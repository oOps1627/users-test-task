import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { UsersService } from "../services/common/users.service";
import { map, Observable } from "rxjs";

export const PasswordValidators: ValidatorFn[] = [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/)];

export function matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
  return (control: AbstractControl):
    ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
    !!control.parent.value &&
    control.value ===
    (control.parent?.controls as any)[matchTo].value
      ? null
      : {matching: true};
  };
}

export function usernameValidator(usersService: UsersService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return usersService.isUsernameAvailable(control.value).pipe(
      map((result: boolean) => result ? null : {usernameExist: true})
    );
  };
}

