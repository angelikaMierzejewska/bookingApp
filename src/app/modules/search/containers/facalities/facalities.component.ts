import { Component, Input, OnInit } from '@angular/core';
import { Facility } from '../../resources/models/facility.model';

@Component({
  selector: 'app-facalities',
  templateUrl: './facalities.component.html',
  styleUrls: ['./facalities.component.scss']
})
export class FacalitiesComponent implements OnInit {
  @Input() facalities: Facility[];

  constructor() {}

  ngOnInit(): void {}
}
