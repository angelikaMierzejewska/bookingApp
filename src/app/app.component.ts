import { Component, OnInit } from '@angular/core';
import { SearchFacade } from './modules/search/+state/search.facade';
import { UserFacade } from './modules/user/+state/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bookingApp';

  constructor(private searchFacade: SearchFacade, private userFacade: UserFacade) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    this.userFacade.setToken(token);
    this.userFacade.setUser(JSON.parse(user));
    this.searchFacade.getBookings();
    this.searchFacade.getHotels();
  }
}
