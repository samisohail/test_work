import { Component, OnDestroy, OnInit } from '@angular/core';

import { ApiResponse } from 'src/app/models/api-response';
import { CompleteLocation } from 'src/app/models/location/complete-location';
import { IConnections } from 'src/app/models/my-connections.model';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { UserServices } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-location-shared',
  templateUrl: './location-shared.page.html',
  styleUrls: ['./location-shared.page.scss'],
})
export class LocationSharedPage implements OnInit, OnDestroy {

  selectedUser: IConnections;
  locationSharedInfo: any;
  locationUpdate: CompleteLocation = new CompleteLocation();
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private locationService: LocationService,
    private userService: UserServices,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    // console.log(' lcoation-shared-selected: ', this.userService.currentSelectUserId);
    if (this.userService) {
      this.selectedUser = this.userService.currentSelectUserId;
      this.getSharedLocation(this.selectedUser.connectionId);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  getSharedLocation(connectionId: number) {
    this.subscriptions.push(

    this.locationService.getLocationSharedByConnectionId(connectionId).subscribe( (result: ApiResponse) => {
      if (result.status) {
        this.locationSharedInfo = result.data;
        this.mapLocation(result.data.mySharedLocationDetails);
      }
    })

    );
  }

  locationSelectionChanged( locationBit: string, shared: any) {
    switch (locationBit) {
      case 'building':
        this.locationUpdate.building = shared;
        break;
      case 'street':
        this.locationUpdate.street = shared;
        break;
      case 'city':
        this.locationUpdate.city = shared;
        break;
      case 'state':
        this.locationUpdate.state = shared;
        break;
      case 'country':
        this.locationUpdate.country = shared;
        break;
    }
    console.log(this.locationUpdate);
  }

  mapLocation(sharedLocation: any) {
    // console.log('map: ', sharedLocation);
    if (sharedLocation) {
      for (const prop in sharedLocation) {
        switch(prop.toLowerCase()) {
          case `building`:
            this.locationUpdate.building = sharedLocation[prop];
            break;
          case `street`:
            this.locationUpdate.street = sharedLocation[prop];
            break;
          case `city`:
            this.locationUpdate.city = sharedLocation[prop];
            break;
            case `state`:
                this.locationUpdate.state = sharedLocation[prop];
                break;
            case `country`:
                this.locationUpdate.country = sharedLocation[prop];
                break;
            case `distance`:
                this.locationUpdate.distance = sharedLocation[prop];
                break;
        }
      }
    }
  }

  updateLocationDetails() {
    this.subscriptions.push
    ( this.userService.updateConnectionSharedDetails
      (this.selectedUser.connectionId, JSON.stringify( this.locationUpdate))
        .subscribe( (response: ApiResponse) => {
            console.log(response);
            this.toaster.toast(response.message);
        }, error => {
          console.log('error: ', error);
          this.toaster.toast(`Oops! something went wrong. Please try in a while.`);
        })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }
}
