import { Observable } from "rxjs";
import { IUser } from "../../models/user";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class UsersService {
  abstract getItems(): Observable<IUser[]>;

  abstract getItem(username: string): Observable<IUser>;

  abstract createItem(user: IUser): Observable<IUser>;

  abstract updateItem(user: Partial<IUser>): Observable<IUser>;

  abstract deleteItem(username: string): Observable<unknown>;

  // It implemented for task 'Form can display server side errors.'.
  // In the design I couldn't find how the server side errors should be handling.
  // Create some popups for the server errors and generate them in the fake back-end may be overcoding for the test task.
  // So I decided implement this simple async validation as the sample.
  abstract isUsernameAvailable(username: string): Observable<boolean>;
}
