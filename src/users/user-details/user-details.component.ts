import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IUser, UserType } from "../models/user";
import { UserFormComponent } from "../user-form/user-form.component";
import { finalize, Observable } from "rxjs";
import { AppRoutes } from "../../app/app.routes";

@Component({
  selector: 'app-user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: ['user-details.component.scss']
})
export class UserDetailsComponent extends UserFormComponent implements OnInit {
  public readonly UserType = UserType;
  public user: IUser | undefined;
  public override loading: boolean = true;

  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);

  ngOnInit() {
    this._initForm();
    this._loadUser();
  }

  public deleteUser(): void {
    this.loading = true;

    this._usersService.deleteItem(this.user!.username)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => this._router.navigate(['../']),
        error: (error) => console.error(error)
      });
  }

  protected override _submit(): Observable<any> {
    return this._usersService.updateItem(this.form.value as Partial<IUser>);
  }

  protected override _handleSubmitResponse(user: IUser): void {
    this.user = user;
    this.form.patchValue({...user, confirmPassword: user.password});
  }

  private _loadUser(): void {
    this.loading = true;
    const username = (this._route.snapshot.params as any).username;

    this._usersService.getItem(username)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (user) => this._handleSubmitResponse(user),
        error: (error) => this._router.navigate([AppRoutes.NotFound]),
      });
  }
}
