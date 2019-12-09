import { Component, OnInit, Input, LOCALE_ID, Inject } from '@angular/core';
import { ICompleteLocationModel } from 'src/app/models/location/complete-location.model';
import { RequestsService } from 'src/app/services/requests.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'src/app/models/api-response';

@Component({
  selector: 'app-location-shared',
  templateUrl: './location-shared.page.html',
  styleUrls: ['./location-shared.page.scss']
})
export class LocationSharedPage implements OnInit {
  country: any;
  [x: string]: any;
  // const location: ICompleteLocationModel;
  // @Input() requestIddd = 0;

  LOCATION_DATA: ISharedLocationDetails[] = [
    {
      locationBit: 'State', // state
      shared: true
    },

    {
      locationBit: 'Council', // state
      shared: true
    },

    {
      locationBit: 'Country name', // state
      shared: true
    },

    { locationBit: 'City', shared: true },
    { locationBit: 'Sub locality', shared: true },
    { locationBit: 'Post code', shared: true },
    { locationBit: 'Street/road', shared: true },
    { locationBit: 'Street/road', shared: true } // sub-thorough-fare
  ];

  displayedColumns: string[] = ['LocationBit', 'Shared'];
  dataSource = this.LOCATION_DATA;
  name: any;
  distance: any;
  street: any;
  city: any;
  state: any;

  requestId: any;

  constructor(
    private requestService: RequestsService,
    public dialogRef: MatDialogRef<LocationSharedPage>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data: ', data);

    this.requestId = data.requestId;
    console.log('data: ', this.requestId);

  }

  ngOnInit() {
    this.getSharedLocation(this.requestId);
  }

  getSharedLocation(requestId: string) {

    this.requestService.getRequestById(requestId)
      .subscribe( (response: ApiResponse) => {
        console.log(response);
        if (response.status) {
          this.name = response.data.requestByName;
          const location = response.data.locationShared;
          Object.keys(location).forEach( (element, val) => {
            switch(element) {
              case `distance`:
                this.distance = location[element];
                break;
              case `street`:
                this.street = location[element];
                break;
              case `city`:
                this.city = location[element];
                break;
              case `state`:
                this.state = location[element];
                break;
              case `country`:
                this.country = location[element];
                break;
            }
          });
        }
      },
      error => {

      });
  }
  
}

export interface ISharedLocationDetails {
  locationBit: string;
  shared: boolean;
}
