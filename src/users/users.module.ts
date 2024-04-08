import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UsersService } from "./services/common/users.service";
import { FakeUsersService } from "./services/fake/fake-users.service";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersComponent } from "./users.component";
import { UsersRoutingModule } from "./users-routing.module";
import { SharedModule } from "../shared/shared.module";
import { CreateUserComponent } from "./create-user/create-user.component";
import { LoaderModule } from "../shared/loader/loader.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule,
    LoaderModule,
  ],
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserDetailsComponent,
    CreateUserComponent,
  ],
  providers: [
    {
      provide: UsersService,
      useClass: FakeUsersService,
    }
  ]
})
export class UsersModule {
}
