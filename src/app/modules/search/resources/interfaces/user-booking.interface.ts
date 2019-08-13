import { Room } from '../models/room.model';

export interface UserBooking {
  id?: number;
  user: string;
  endDate: Date;
  startDate: Date;
  rooms: Room[];
}
