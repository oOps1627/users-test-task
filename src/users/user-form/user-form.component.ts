import { IUser } from "../models/user";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../services/common/users.service";
import { matchValidator, PasswordValidators } from "./validators";
import { inject } from "@angular/core";
import { filter, finalize, Observable, take } from "rxjs";

type UserForm = { [key in keyof (IUser & { confirmPassword: string })]: FormControl<string | null> };

export abstract class UserFormComponent {
  public form!: FormGroup<UserForm>;
  public loading: boolean = false;

  protected _usersService = inject(UsersService);

  protected abstract _submit(): Observable<any>;

  protected abstract _handleSubmitResponse(data: any): void;

  protected _initForm(): void {
    this.form = new FormGroup<UserForm>({
      username: new FormControl<string>('', [Validators.required]),
      firstName: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      type: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', PasswordValidators),
      confirmPassword: new FormControl<string>('', [matchValidator('password')]),
    });
  }

  public save(): void {
    this.form.statusChanges.pipe(
        filter((status) => status !== 'PENDING'),
        take(1)
      ).subscribe(() => {
        if (this.form.invalid)
          return;

        this.loading = true;
        this._submit()
          .pipe(finalize(() => this.loading = false))
          .subscribe({
            next: (data) => this._handleSubmitResponse(data),
            error: (error) => console.error(error)
          });
      });

    this._validateForm();
  }

  protected _validateForm(): void {
    const controls: any = this.form.controls;

    for (const key in controls)
      if (controls.hasOwnProperty(key)) {
        const control = controls[key];
        control.markAsTouched({onlySelf: true});
        control.markAsDirty({onlySelf: true});
        control.updateValueAndValidity({onlySelf: true});
      }

      this.form.updateValueAndValidity({onlySelf: true});
  }
}
