import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './modules/search/containers/search/search.component';
import { ProfileComponent } from './modules/user/containers/profile/profile.component';
import { AuthGuard } from './modules/user/guard/auth.guard';
import { HotelComponent } from './modules/search/containers/hotel/hotel.component';
import { BookingComponent } from './modules/shared/containers/booking/booking.component';
import { BookingDetailComponent } from './modules/user/containers/booking-detail/booking-detail.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'hotel/:id', component: HotelComponent },
  // { path: 'booking/:roomId', component: BookingComponent },
  { path: 'booking/:bookinId', component: BookingDetailComponent },

  { path: '', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
