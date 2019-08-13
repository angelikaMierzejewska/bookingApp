import { Room } from './room.model';
import { Facilities } from './facilities.model';

export class Hotel {
  id: number;
  name: string;
  location: string;
  facilities: Facilities[];
  rooms: Room[];
}
