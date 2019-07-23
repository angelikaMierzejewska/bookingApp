import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './modules/search/containers/search/search.component';
import { ProfileComponent } from './modules/user/containers/profile/profile.component';
import { AuthGuard } from './modules/user/guard/auth.guard';

const routes: Routes = [
  { path: '', component: SearchComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
