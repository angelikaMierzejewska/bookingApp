import { Hotel } from './hotel.model';
import { Price } from './price.model';

export class Room {
  capacity: number;
  hotel: Hotel;
  id: number;
  number: number;
  prices: Price[];
  booked? = false;
}
