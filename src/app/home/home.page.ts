import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  members: GroupMembers[] = [
    {
      city:'Sydney',
      name: 'Neil',
      country: 'Australia',
      distance: 16,
      street: 'Ross Street',
      suburb: 'Parra'
    },
    {
      city: 'Melbourne',
      name: 'Bahalul',
      country: 'Australia',
      distance: 16,
      street: 'Ross Street',
      suburb: 'Tarneit'
    },
    {
      city: 'Brisbane',
      name: 'Imran',
      country: 'Australia',
      distance: 16,
      street: 'Mazquire Street',
      suburb: 'Sub'
    },
    {
      city: 'Perth',
      name: 'Zulfiqar',
      country: 'Australia',
      distance: 16,
      street: 'Main road',
      suburb: 'Penrith'
    }
  ];
  constructor(private locationService: LocationService) {
    this.locationService.getGeolocation();
  }

}

export interface GroupMembers {
  name: string;
  distance: number;
  city: string;
  street: string;
  suburb: string;
  country: string;
}
