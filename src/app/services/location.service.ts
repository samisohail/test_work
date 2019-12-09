import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult
} from '@ionic-native/native-geocoder/ngx';
import { Observable, of } from 'rxjs';

import { AlertController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HttpClient } from '@angular/common/http';
import { ICompleteLocationModel } from '../models/location/complete-location.model';
import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../shared/local-storage-keys';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private API_BASE_URL = environment.API_BASE_URL;

  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  timestamp: number;

  geoAddress: any;
  timetest: any;

  storageKeys: LocalStorageKeys;

  // Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 3
  };

  constructor(
    private http: HttpClient,
    private geoLocation: Geolocation,
    private geocoder: NativeGeocoder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private alertController: AlertController
  ) {
    this.storageKeys = new LocalStorageKeys();
  }

  // Get current coordinates of device
  getGeolocation() {
    this.geoLocation
      .getCurrentPosition()
      .then(resp => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.accuracy = resp.coords.accuracy;
        this.getGeoencoder(this.latitude, this.longitude);
      })
      .catch(error => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  getMyLocationCoordinates(): Promise<ILatLong> {
    return new Promise((resolve, reject) => {
      this.geoLocation.getCurrentPosition().then(position => {
          localStorage.setItem(`${this.storageKeys.KEY_PREFIX}_${this.storageKeys.LAT}`, position.coords.latitude.toString());
          localStorage.setItem(`${this.storageKeys.KEY_PREFIX}_${this.storageKeys.LNG}`, position.coords.longitude.toString());

          const location: ILatLong = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp
          };
          resolve(location);
      }, error => {
        return reject('Location info not found.');
      });
    });
  }

  getCompleteLocation(
    latitude: number,
    longitude: number
  ): Promise<ICompleteLocationModel> {
    return new Promise((resolve, reject) => {
      this.geocoder.reverseGeocode(latitude, longitude).then(
        result => {
          resolve(this.mapToLocationObject(result[0]));
        },
        error => {
          return reject('Location not found.');
        }
      );
    });
  }

  // geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude, saveLocation = false) {
    return this.geocoder
      .reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then(result => {
        // console.log(result);
        this.geoAddress = this.generateAddress(result[0]);
        const location = this.mapToLocationObject(result[0]);
        // console.log('this.geoAddress: ', this.geoAddress);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  // // Return Comma saperated address
  generateAddress(addressObj) {
    const obj = [];
    let address = '';
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (const val in obj) {
      if (obj[val].length) {
        address += obj[val] + ', ';
      }
    }
    return address.slice(0, -2);
  }

  // Check if application having GPS access permission
  checkGPSPermission() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      )
      .then(
        result => {
          if (result.hasPermission) {
            // If having permission show 'Turn On GPS' dialogue
            this.askToTurnOnGPS();
          } else {
            // If not having permission ask for permission
            this.requestGPSPermission();
          }
        },
        err => {
          alert(err);
        }
      );
  }
  
  askToTurnOnGPS() {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          // When GPS Turned ON call method to get Accurate location coordinates
          this.getLocationCoordinates();
        },
        error =>
          alert(
            'Error requesting location permissions ' + JSON.stringify(error)
          )
      );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
      } else {
        // Show 'GPS Permission Request' dialogue
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          )
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              // Show alert if user click on 'No Thanks'
              alert(
                'Error requesting location permissions ' +
                  error
              );
            }
          );
      }
    });
  }

  getLocationCoordinates() {
    return this.geoLocation
      .getCurrentPosition()
      .then((resp: Geoposition) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.accuracy = resp.coords.accuracy;
        this.speed = resp.coords.speed;

        this.getGeoencoder(this.latitude, this.longitude, false);
      })
      .catch(error => {
        alert('getLocationCoordinates: ' + error);
      });
  }

  mapToLocationObject(result: NativeGeocoderResult): ICompleteLocationModel {
    const location: ICompleteLocationModel = {
      adminArea: result.administrativeArea,
      countryCode: result.countryCode,
      countryName: result.countryName,
      latitude: Number(result.latitude),
      longitude: Number(result.longitude),
      locality: result.locality,
      postalCode: result.postalCode,
      subAdminArea: result.subAdministrativeArea,
      subLocality: result.subLocality,
      subThoroughfare: result.subThoroughfare,
      thoroughfare: result.thoroughfare,
      timestamp: new Date()
    };
    return location;
  }

  saveLocation() {
    this.getLocationCoordinates().then(() => {
      console.log('saveLocation called.');
    });
  }

  sendSaveLocationRequest(location: ICompleteLocationModel): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/api/location/save`, location);
  }

  getLocationSharedByConnectionId(connectionId: number) {
    return this.http.get(`${this.API_BASE_URL}/api/location/connection/${connectionId}/loc/shared/details`);
  }
}
export interface ILatLong {
  latitude: number;
  longitude: number;
  timestamp?: number;
}
