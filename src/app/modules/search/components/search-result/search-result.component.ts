import { Component, Input } from '@angular/core';
import { Hotel } from '../../resources/models/hotel.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  @Input() filterHotels: Hotel[];
}
