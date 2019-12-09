import { Component, OnInit, OnDestroy } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserServices } from 'src/app/services/user-services.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { LocalStorageKeys } from '../../shared/local-storage-keys';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit, OnDestroy {
  private onDestroy = new Subject();
  private img: string;
  private accessCode: string;
  private locationFrequency = 5;
  private name: string;
  private email: string;
  private accountCreated: Date;
  private localStorageKeys: LocalStorageKeys;

  frequencies: IFrequencies[] = [
    { value: '1', viewValue: '1 minute' },
    { value: '2', viewValue: '2 minutes' },
    { value: '5', viewValue: '5 minutes' },
    { value: '10', viewValue: '10 minutes' },
    { value: '30', viewValue: '30 minutes' },
    { value: '60', viewValue: '60 minutes' },
    { value: '-1', viewValue: 'Stop updating my location' }
  ];

  constructor(
    private camera: Camera,
    private userService: UserServices,
    private toastService: ToasterService
  ) {
    this.localStorageKeys = new LocalStorageKeys();
  }

  ngOnInit() {
    this.img = localStorage.getItem(
      `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.PIC}`
    );
    this.locationFrequency = Number(
      localStorage.getItem(
        `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.FREQUENCY}`
      )
    );
    console.log(this.locationFrequency);
    this.getProfile();
  }

  updateLocationFrequency(minutes: number) {
    console.log(minutes);
    this.userService
      .updateLocationFrequency(minutes)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: ApiResponse) => {
          console.log(response);
          this.toastService.toast(response.message);
          if (response.status) {
            localStorage.setItem(
              `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.FREQUENCY}`,
              minutes.toString()
            );
          }
        },
        error => {
          this.toastService.toast(
            `System is not processing requests at the moment.`
          );
          console.log(error);
        }
      );
  }

  getPicture(picSourceType: number) {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      cameraDirection: 1,
      sourceType: picSourceType
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.img = 'data:image/jpeg;base64,' + imageData;
        // console.log(base64Image);
        this.userService
          .updatePhoto(imageData)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(
            (response: ApiResponse) => {
              // console.log('image save response: ', response);
              this.toastService.toast(response.message);
              localStorage.setItem(
                `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.PIC}`,
                this.img
              );
            },
            error => {
              console.log('image save error: ', error);
            }
          );
      },
      err => {
        // Handle error
        console.log('error: ', err);
      }
    );
  }

  getProfile() {
    this.userService
      .getUserProfile()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: ApiResponse) => {
          console.log('profile: ', response);
          if (response.status) {
            const user = response.data;
            this.accessCode = user.accessCode;
            this.locationFrequency = user.locationUpdateFrequency;
            this.name = user.firstName + ' ' + user.lastName;
            this.email = user.email;
            this.accountCreated = user.createdOn;
            if (!!user.picture) {
              this.img = 'data:image/jpeg;base64,' + user.picture;
            }
            console.log(this.locationFrequency);
          }
        },
        error => {
          this.toastService.toast(
            `Oops! something went wrong to fetch profile.`
          );
        }
      );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}

export interface IFrequencies {
  value: string;
  viewValue: string;
}
