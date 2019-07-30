import { Room } from './room.model';

export class Hotel {
  id: number;
  name: string;
  location: string;
  facalities: string;
  rooms: Room[];
}
