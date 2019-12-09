import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  NavController,
  ToastController
} from '@ionic/angular';

import { ApiResponse } from '../models/api-response';
import { UserServices } from '../services/user-services.service';
import { LocationService } from '../services/location.service';
import { ICompleteLocationModel } from '../models/location/complete-location.model';
import { Subscription, Observable, Subject } from 'rxjs';
import { LoadingService } from '../shared/services/loading.service';
import { LocalStorageKeys } from '../shared/local-storage-keys';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss']
})
export class SigninPage implements OnInit, OnDestroy {
  private userIdFound = true;
  private name: string;
  private userId: string;
  private keys: number[];
  private loading: any;
  private localStorageKeys: LocalStorageKeys;

  authenticationDone: Subject<boolean>;
  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private userService: UserServices,
    private toastController: ToastController,
    private locationService: LocationService,
    private loadingService: LoadingService
  ) {
    this.keys = [];
    this.localStorageKeys = new LocalStorageKeys();

    localStorage.setItem(
      `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.TOKEN}`,
      this.getTempToken()
    );
    localStorage.setItem(
      `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.USER_ID}`,
      'a4b67e6e-5253-40f8-946d-128b9f540a74'
    );
    localStorage.setItem(
      `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.FREQUENCY}`,
      '20'
    );
    localStorage.setItem(
      `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.NAME}`,
      'ssf'
    );


    this.userId = localStorage.getItem(
      `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.USER_ID}`
    );
    if (!!this.userId) {
      this.userIdFound = true;
    }

    this.authenticationDone = new Subject();
    this.name = localStorage.getItem(
      `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.NAME}`
    );
  }
  ngOnInit() {
    this.locationService.checkGPSPermission();
    this.locationService.getMyLocationCoordinates().then(coordinates => {
      this.locationService
        .getCompleteLocation(coordinates.latitude, coordinates.longitude)
        .then((location: ICompleteLocationModel) => {
          this.locationService
            .sendSaveLocationRequest(location)
            .subscribe(() => {});
        });
    });

    // this.setupBannerAd();
    this.authenticationDone.subscribe((response) => {
      if (response) {
        if  (!!this.loading) {
            this.loading.dismiss();
        }
      }
    });
  }

  getKey(n: number) {
    if (this.keys.length === 4) {
      return;
    }

    if (this.keys.length < 4) {
      this.keys.push(n);
    }

    if (this.keys.length === 4) {
      this.loadingService.present('Validating key');
      this.userService
        .validateUserKey(this.userId, this.keys.join(''))
        .subscribe(
          (response: ApiResponse) => {
            this.loadingService.dismiss();
            // this.authenticationDone.next(true);
            if (response.status) {
              this.setLocalStorageInfo(response.data);
              this.navCtrl.navigateRoot(['dashboard']);
            } else {
              this.showToaster(response.message);
            }
          },
          error => {
            this.loadingService.dismiss();
            this.showToaster(`Oops! something went wrong. Please re-try.`);
          }
        );
    }
  }

  remove() {
    if (this.keys.length === 1) {
      this.keys = [];
    } else if (this.keys.length > 1) {
      this.keys.splice(-1, 1);
    }
    console.log('remove: ', this.keys);
  }

  redirectToSignUp() {
    this.router.navigate([`signup`]);
  }

  showToaster(message: string) {
    this.toastController
      .create({
        message: message,
        duration: 4000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'Close'
      })
      .then(t => t.present());
  }

  setLocalStorageInfo(data: any) {

    localStorage.removeItem(`${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.USER_ID}`);
    localStorage.removeItem(`${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.TOKEN}`);
    localStorage.removeItem(`${this.localStorageKeys.KEY_PREFIX}_update_frequency`);

    localStorage.setItem(`${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.USER_ID}`, data.userId);
    localStorage.setItem(`${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.TOKEN}`, data.token);
    localStorage.setItem(`${this.localStorageKeys.KEY_PREFIX}_update_frequency`, data.LocationUpdateFreq);
    localStorage.setItem(`${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.IS_AUTHENTICATED}`, '1');
  }

  // setupBannerAd() {
  //   const bannerConfig: AdMobFreeBannerConfig = {
  //     isTesting: true,
  //     autoShow: true
  //   };
  //   this.adMob.banner.prepare().then( () => {
  //   }).catch(e => console.log('AdMob error: ', e)
  //   );
  // }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  emailPIN() {
    console.log('email PIN');
  }
  getTempToken(): string {
    return `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3NmIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6IiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InNzZkBhYmMuY29tIiwiVXNlcklkIjoiYTRiNjdlNmUtNTI1My00MGY4LTk0NmQtMTI4YjlmNTQwYTc0IiwiZXhwIjoxNzMwNDk5NjEwLCJpc3MiOiJodHRwczovL3dlYmFwaTI0Ny5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6Ijg3NjE0NjEyLTE4MWItNDk2Ni04ZmRlLWNhYjk5ODdjZmRhNSJ9.WOqmWLFQ3RL9295mfugyVgy4GrFYq8Mi180AkNLKHgsUdpnmaCh7O79ijlEk2H3uQk1jQHI8VjScnaX1aKhmOg`;
  }
}
