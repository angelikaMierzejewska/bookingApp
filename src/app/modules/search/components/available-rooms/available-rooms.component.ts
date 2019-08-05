import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from '../../resources/models/hotel.model';
import { Room } from '../../resources/models/room.model';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.scss']
})
export class AvailableRoomsComponent implements OnInit {
  @Input() rooms: Room[];
  private availableRooms = false;

  constructor() {}

  ngOnInit() {
    const availableRoom = this.rooms.find(room => room.booked === false);
    if (availableRoom) {
      this.availableRooms = true;
    }
  }
}
