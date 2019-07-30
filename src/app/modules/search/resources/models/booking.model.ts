import { Deserializable } from '../interfaces/deserializable.interface';

export class Booking implements Deserializable {
  endDate: Date;
  rooms: string[];
  startDate: Date;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
