import { Component, Input, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { from } from 'rxjs';
import { filter, map, toArray } from 'rxjs/operators';
import { Facalitie } from '../../resources/models/facalitie.model';

@Component({
  selector: 'app-facalities',
  templateUrl: './facalities.component.html',
  styleUrls: ['./facalities.component.scss']
})
export class FacalitiesComponent implements OnInit {
  private allFacalities: Facalitie[] = [];
  private hotelFacalities: Facalitie[] = [];

  @Input() hotelId: number;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.getAllFacalities();
  }

  public getAllFacalities(): void {
    this.hotelService.getFacalities().subscribe((data: Facalitie[]) => {
      this.allFacalities = data;
      this.getHotelFacalities(this.hotelId);
    });
  }

  public getHotelFacalities(id: number): void {
    from(this.allFacalities)
      .pipe(
        map((results: Facalitie) => results),
        filter((result: Facalitie) => result.hotel.id === id),
        toArray()
      )
      .subscribe((data: Facalitie[]) => {
        this.hotelFacalities = data;
      });
  }
}
