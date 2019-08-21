import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './containers/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDataService } from './services/user-data.service';
import { ProfileComponent } from './containers/profile/profile.component';
import { BookingDetailComponent } from './containers/booking-detail/booking-detail.component';
import { CustomMaterialModule } from '../shared/modules/custom-material.module';
import { UserFacade } from './+state/user.facade';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './+state/user.effects';
import { initialState, USER_FEATURE_KEY, userReducer } from './+state/user.reducer';

@NgModule({
  declarations: [LoginComponent, ProfileComponent, BookingDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer, { initialState }),
    EffectsModule.forFeature([UserEffects])
  ],
  entryComponents: [LoginComponent],
  bootstrap: [LoginComponent],
  providers: [UserDataService, UserFacade]
})
export class UserModule {}
