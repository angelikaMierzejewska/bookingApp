import { Component, Input, OnInit } from '@angular/core';
import { Facilities } from '../../resources/models/facilities.model';

@Component({
  selector: 'app-facalities',
  templateUrl: './facalities.component.html',
  styleUrls: ['./facalities.component.scss']
})
export class FacalitiesComponent implements OnInit {
  @Input() facalities: Facilities[];

  constructor() {}

  ngOnInit(): void {}
}
