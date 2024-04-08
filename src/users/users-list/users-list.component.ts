import { Component } from "@angular/core";
import { UsersService } from "../services/common/users.service";
import { IUser } from "../models/user";
import { finalize, Observable } from "rxjs";

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss']
})
export class UsersListComponent {
  public loading: boolean = false;

  public users$: Observable<IUser[]> = this.loadUsers();

  constructor(
    private _usersService: UsersService
  ) {
  }

  private loadUsers(): Observable<IUser[]> {
    this.loading = true;

    return this._usersService.getItems().pipe(
      finalize(() => this.loading = false)
    );
  }
}
