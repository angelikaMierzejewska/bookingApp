import { Deserializable } from '../interfaces/deserializable.interface';
import { Room } from './room.model';

export class Booking implements Deserializable {
  endDate: Date;
  rooms: Room[];
  startDate: Date;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
