import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './containers/search/search.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, SharedModule],
  exports: [SearchComponent]
})
export class SearchModule {}
