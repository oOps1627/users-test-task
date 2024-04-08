import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from "../not-found-page/not-found-page.component";
import { AppRoutes } from "./app.routes";

const routes: Routes = [
  {
    path: AppRoutes.Users,
    loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
  },
  {
    path: AppRoutes.NotFound,
    component: NotFoundPageComponent,
  },
  {
    path: '',
    redirectTo: AppRoutes.Users,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
