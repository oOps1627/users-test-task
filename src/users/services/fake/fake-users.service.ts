import { UsersService } from "../common/users.service";
import { IUser, UserType } from "../../models/user";
import { delay, Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";


const defaultUsers: IUser[] = [
  {
    username: 'User_1',
    firstName: 'John',
    lastName: 'Smitt',
    email: 'john.smitt@gmail.com',
    type: UserType.Admin,
    password: 'Password@123'
  },
  {
    username: 'User_2',
    firstName: 'Sara',
    lastName: 'Medison',
    email: 'sara@gmail.com',
    type: UserType.Driver,
    password: 'Password@123'
  }
];


@Injectable()
export class FakeUsersService implements UsersService {
  private _users: IUser[] = defaultUsers;

  public getItems(): Observable<IUser[]> {
    return this._wrapToObservable<IUser[]>(this._users);
  }

  public getItem(username: string): Observable<IUser> {
    const user = this._users.find(i => i.username === username);

    if (!user)
      return throwError(() => new HttpErrorResponse({status: 404}));

    return this._wrapToObservable<IUser>(user);
  }

  public createItem(user: IUser): Observable<IUser> {
    this._users.push(user);

    return this._wrapToObservable(user);
  }

  public updateItem(body: Partial<IUser>): Observable<IUser> {
    const index = this._users.findIndex(i => i.username === body.username);

    if (index == -1)
      return throwError(() => new HttpErrorResponse({status: 404}));

    this._users[index] = {...this._users[index], ...body};

    return this._wrapToObservable(this._users[index]);
  }

  public deleteItem(username: string): Observable<unknown> {
    this._users = this._users.filter(i => i.username !== username);

    return this._wrapToObservable(null);
  }

  public isUsernameAvailable(username: string): Observable<boolean> {
    const isAvailable = this._users.every(i => i.username !== username);

    return this._wrapToObservable(isAvailable);
  }

  private _wrapToObservable<T>(data: T): Observable<T> {
    return of(data).pipe(delay(500));
  }
}
