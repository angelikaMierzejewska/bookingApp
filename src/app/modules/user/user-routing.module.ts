import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

const ANIMAL_ROUTES: Route[] = [];

@NgModule({
  imports: [RouterModule.forChild(ANIMAL_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
