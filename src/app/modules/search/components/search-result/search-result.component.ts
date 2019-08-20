import { Component, Input } from '@angular/core';
import { Hotel } from '../../resources/models/hotel.model';
import { Room } from '../../resources/models/room.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  @Input() filterHotels: Hotel[];

  checkAvailabilityRooms(hotelId: number): boolean {
    const hotel = this.filterHotels.find(obj => obj.id === hotelId);
    const count = hotel.rooms.filter(obj => obj.booked === true).length;
    return count !== hotel.rooms.length;
  }

  freeRooms(rooms: Room[]): number {
    return rooms.filter(room => room.booked === false).length;
  }
}
