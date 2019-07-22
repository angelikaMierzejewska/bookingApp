import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ProfileComponent } from './containers/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';

const USER_ROUTES: Route[] = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
