import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ApiResponse } from '../models/api-response';
import { IConnections } from '../models/my-connections.model';
import { LoadingService } from '../shared/services/loading.service';
import { LocalStorageKeys } from '../shared/local-storage-keys';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService } from '../shared/services/toaster.service';
import { UserServices } from '../services/user-services.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit, OnDestroy {

  public queryText = '';
  conSubscription: Subscription;
  public connections: IConnections[] = [];
  public filteredConnections: IConnections[] = [];
  public searchControl: FormControl;
  myform: FormGroup;
  storageKeys: LocalStorageKeys;

  latitude = 0;
  longitude = 0;

  constructor(
    private userService: UserServices,
    private toaster: ToasterService,
    formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private router: Router
    ) {
      this.myform = formBuilder.group({
        searchControl: new FormControl()
     });
      this.storageKeys = new LocalStorageKeys();
    }

  ngOnInit() {

    this.getConnections();
    this.onChanges();

    // this.utilityService.requestGPSPermission().then(
    //   (response) => {
    //     console.log(response);
    //     if (response) {
    //       this.getConnections();
    //       this.onChanges();
    //     } else {
    //       this.toaster.toast('Enable Location service to continue.');
    //     }
    //   }
    // );
  }

  ngAfterViewInit() {
    console.log('on after view init');
    if (this.isNumber(localStorage.getItem(`${this.storageKeys.KEY_PREFIX}_${this.storageKeys.LAT}`))) {
      this.latitude = Number(localStorage.getItem(`${this.storageKeys.KEY_PREFIX}_${this.storageKeys.LAT}`));
    }
    if (this.isNumber(localStorage.getItem(`${this.storageKeys.KEY_PREFIX}_${this.storageKeys.LAT}`))) {
      this.longitude = Number(localStorage.getItem(`${this.storageKeys.KEY_PREFIX}_${this.storageKeys.LNG}`));
    }
  }

  ionViewDidLoad() {

  }
  onChanges(): void {
    this.myform.get('searchControl').valueChanges.subscribe(val => {
      this.filteredConnections = this.filterConnections(val);
    });
  }

  search() {
    console.log('query: ', this.queryText);

    if (this.queryText == null) {
      return;
    }

    if (this.queryText.length === 0) {
      this.getConnections();
    } else {
       this.connections = this.filterConnections(this.queryText);
    }
  }

  getConnections(forceRefresh = false, ionRefresher: any = null) {
    this.conSubscription = this.userService.getConnectionsWithLocation()
      .subscribe( (response: ApiResponse) => {
        this.connections = response.data;
        this.filteredConnections = response.data;
        console.log(this.connections);

        if (forceRefresh && ionRefresher) {
          ionRefresher.complete();
        }
    }, error => {
      this.toaster.toast('Oops! system seems busy at the moment.');
    });
  }


  filterConnections(searchTerm: string) {
    if (searchTerm.length < 1) {
      return this.connections;
    }
    return this.connections.filter (connection => {
      return connection.name.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1;
    });
  }

  // mapView(lat: number, lng: number) {
  //   const mapOptions: LaunchNavigatorOptions = {
  //     start: [this.latitude, this.longitude],
  //     app: this.navigator.APP.GOOGLE_MAPS
  //   };
  //   this.navigator.navigate([lat, lng], mapOptions)
  //   .then(
  //     success => console.log('map loaded'),
  //     error => console.log(error)
  //   );
  // }

  home() {
    console.log('home clicked');
  }

  // TODO: duplicate code, move in utility functions class
  isNumber(value: string | number): boolean {
    return ((value != null) && !isNaN(Number(value.toString())));
  }

  alerts() {
    this.router.navigate(['/user-board']);
  }
  refreshAll(refresher) {
    this.getConnections(true, refresher.target);
  }
  itemClick(user: IConnections) {
    this.userService.currentSelectUserId = user;
    this.router.navigate(['/user-board']);
    // this.router.navigate(['/user-board'] , { queryParams: { connectionUserId: connectionUserId }});
  }
  ngOnDestroy(): void {
    if (!!this.conSubscription) {
      this.conSubscription.unsubscribe();
    }
  }
}
