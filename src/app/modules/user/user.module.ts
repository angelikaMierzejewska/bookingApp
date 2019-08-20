import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './containers/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDataService } from './services/user-data.service';
import { ProfileComponent } from './containers/profile/profile.component';
import { BookingDetailComponent } from './containers/booking-detail/booking-detail.component';
import { CustomMaterialModule } from '../shared/modules/custom-material.module';

@NgModule({
  declarations: [LoginComponent, ProfileComponent, BookingDetailComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, CustomMaterialModule],
  entryComponents: [LoginComponent],
  bootstrap: [LoginComponent],
  providers: [UserDataService]
})
export class UserModule {}
