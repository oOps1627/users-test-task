export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: UserType;
}

export enum UserType {
  Admin = "Admin",
  Driver = "Driver"
}
