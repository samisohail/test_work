import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { interval, timer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ICompleteLocationModel } from './models/location/complete-location.model';
import { LocationService } from './services/location.service';
import { LocalStorageKeys } from './shared/local-storage-keys';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/dashboard',  icon: 'home' },
    { title: 'List', url: '/list', icon: 'list' },
    { title: 'IonicHomePage', url: '/home', icon: 'list' },
    { title: 'Send request', url: 'send-request', icon: 'person' },
    { title: 'Invitations',  url: 'invitations', icon: 'body' },
    { title: 'My connections', url: 'my-connections', icon: 'body' },
    { title: 'Settings', url: 'settings', icon: 'settings' }
  ];

  private showSplashScreen = true;
  private currentUrl: string;
  private localStorageKeys: LocalStorageKeys;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private locationService: LocationService
  ) {
    timer(3000).subscribe(() => {
      this.showSplashScreen = false;
    });
    this.localStorageKeys = new LocalStorageKeys();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((response: NavigationEnd) => {
        this.currentUrl = response.url.toLocaleLowerCase();
      });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {
    const locationUpdateFreq = localStorage.getItem(`${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.FREQUENCY}`);
    let frequency = (60000 * 2); // 2 minutes
    if (this.isNumber(locationUpdateFreq)) {
      frequency = 60000 * Number(locationUpdateFreq);
    }
    console.log('freq: ', frequency);

    interval(frequency).subscribe(() => {
      this.logLocation();
    });
  }

  logLocation() {
    if (this.currentUrl === undefined) {
      return;
    }

    if (
      this.currentUrl.indexOf('signin') > 0 ||
      this.currentUrl.indexOf('signup') > 0
    ) {
      return;
    }

    this.locationService.getMyLocationCoordinates().then(coordinates => {
      localStorage.setItem(`${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.LAT}`, coordinates.latitude.toString());
      localStorage.setItem(`${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.LNG}`, coordinates.longitude.toString());

      this.locationService
        .getCompleteLocation(coordinates.latitude, coordinates.longitude)
        .then((location: ICompleteLocationModel) => {
          this.locationService
            .sendSaveLocationRequest(location)
            .subscribe(() => {
              console.log('location logged.');

            });
        });
    });
  }

  isNumber(value: string | number): boolean {
     return ((value != null) && !isNaN(Number(value.toString())));
  }

}
