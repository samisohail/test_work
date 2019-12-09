import { Component, OnDestroy, OnInit } from '@angular/core';

import { LocationService } from 'src/app/services/location.service';
import { UserServices } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit, OnDestroy {
  connectionUserId: any;
  constructor(
    private userService: UserServices,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    console.log('messages - current - selected: ', this.userService.currentSelectUserId);
    this.locationService.getLocationSharedByConnectionId(this.userService.currentSelectUserId.connectionId)
    .subscribe(response => {
      console.log(response);
    });
  }

  ngOnDestroy(): void {

  }

}
