import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,

  ) { }

  async requestGPSPermission() {
    return new Promise(async resolve => {
      this.locationAccuracy.canRequest().then( (canRequest: boolean) => {
        if (canRequest) {
          return resolve(true);
        } else {
          this.androidPermissions
          .requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION       )
          .then (
            () => {
              // call method to turn on GPS
              const response = this.askToTurnOnGPS();
              console.log('response: ', response);
            },
            error => {
              // Show alert if user click on 'No Thanks'
              alert('Error requesting location permissions ' + error);
            });
        }
    });
  });
}


  async askToTurnOnGPS() {
    return new Promise(async resolve => {
      this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          return resolve(true);
        },
        () => {
          return resolve(false);
      });
    });
  }
}
