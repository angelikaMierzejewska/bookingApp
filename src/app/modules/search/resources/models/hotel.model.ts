import { Room } from './room.model';
import { Facility } from './facility.model';

export class Hotel {
  id: number;
  name: string;
  location: string;
  facilities: Facility[];
  rooms: Room[];
}
