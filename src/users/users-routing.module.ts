import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { CreateUserComponent } from "./create-user/create-user.component";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UsersListComponent
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
      },
      {
        // can be bug if user will have username 'create-user' but with real app in url it probably will be 'id' instead 'username'
        // so I left it as is
        path: ':username',
        component: UserDetailsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {
}
