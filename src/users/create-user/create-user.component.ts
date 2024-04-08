import { Component, inject, OnInit } from "@angular/core";
import { IUser, UserType } from "../models/user";
import { UserFormComponent } from "../user-form/user-form.component";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { usernameValidator } from "../user-form/validators";

@Component({
  selector: 'app-create-user',
  templateUrl: 'create-user.component.html',
  styleUrls: ['create-user.component.scss']
})
export class CreateUserComponent extends UserFormComponent implements OnInit {
  public readonly UserType = UserType;
  public user: IUser | undefined;

  private router: Router = inject(Router);

  ngOnInit(): void {
    this._initForm();
  }

  protected override _initForm() {
    super._initForm();
    this.form.controls.username.addAsyncValidators(usernameValidator(this._usersService));
  }

  protected override _submit(): Observable<any> {
    return this._usersService.createItem(this.form.value as IUser);
  }

  protected override _handleSubmitResponse(user: IUser): void {
    this.router.navigate(['../']);
  }
}
