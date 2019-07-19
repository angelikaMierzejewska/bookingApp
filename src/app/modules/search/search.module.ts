import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './containers/search/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule],
  exports: [SearchComponent]
})
export class SearchModule {}
