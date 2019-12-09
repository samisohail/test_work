import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AlertController, LoadingController } from '@ionic/angular';

import { ApiResponse } from '../models/api-response';
import { ILocation } from '../models/location/location.model';
import { IAddRequest } from '../models/requests/add-request.model';
import { RequestsService } from '../services/requests.service';
import { UserServices } from '../services/user-services.service';
import { Router } from '@angular/router';

export interface ILocationAttributes {
  name: string;
}

const dataSource: ILocationAttributes[] = [
  { name: `My Distance` },
  { name: `Street` },
  { name: `City` },
  { name: `State` },
  { name: `Country` }
];

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.page.html',
  styleUrls: ['./send-request.page.scss']
})
export class SendRequestPage implements OnInit {
  private form: FormGroup;
  private isLoading: any;
  private fullName: string;
  private isValidAccessCode = false;
  private location: ILocation;
  private request: IAddRequest;

  displayedColumns: string[] = ['select', 'name'];
  dataSource = new MatTableDataSource<ILocationAttributes>(dataSource);
  selection = new SelectionModel<ILocationAttributes>(true, []);

  // location checkboxes
  private shareHouseNo = '0';
  private shareStreet = '0';
  private shareCouncil = '0';
  private shareCity = '0';
  private shareState = '0';
  private shareCountry = '0';

  groups: string[] = ['Family', 'Friends', 'Common'];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userService: UserServices,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private requestsService: RequestsService
  ) {
    this.form = this.formBuilder.group({
      accessCode: ['', Validators.required],
      message: ['', Validators.required],
      group: ['Friends', Validators.required]
    });
  }

  ngOnInit() {}

  validateAccessCode(event: any) {
    // console.log(event.value);
    if (event.value === '' || event.value === null) {
      return;
    }

    this.userService
      .getNameByAccessCode(event.value)
      .subscribe((response: ApiResponse) => {
        this.isValidAccessCode = response.status;

        if (response.status) {
          this.fullName =
            response.data.firstName + ' ' + response.data.lastName;
        } else {
          this.fullName = null;
          this.displayAlert(`Action failed`, `Access Code is not valid.`, null);
        }

        console.log(response.status);
        console.log(response.data);
      });
  }

  displayAlert(title: string, alertMessage: string, navigateTo: string) {
    this.alertController
      .create({
        message: alertMessage,
        header: title,
        buttons: [`Ok`]
      })
      .then((alert: HTMLIonAlertElement) => {
        alert.present();
        if (!!navigateTo) {
          this.route.navigate([navigateTo]);
        }
      });
  }

  displayLoading() {
    this.loadingController
      .create({
        animated: true,
        message: `loading...`
      })
      .then(() => (this.isLoading = true));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.selected.forEach(item => {
        if (item.name !== 'My Distance') {
          this.selection.deselect(item);
        }
      });
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
    // this.isAllSelected() ?
    //     this.selection.clear() :
    //     this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: ILocationAttributes): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.name + 1}`;
  }

  submit() {
    if (this.selection.selected.length === 0) {
      const loc: ILocationAttributes = {
        name: 'My Distance'
      };
      this.selection.select(loc);
    }

    // this.location = {
    //   city: this.selection.selected.includes(x => x.name === 'City')
    //     ? '1'
    //     : '0',
    //   country: this.selection.selected.includes(x => x.name === 'Country')
    //     ? '1'
    //     : '0',
    //   state: this.selection.selected.includes(x => x.name === 'State')
    //     ? '1'
    //     : '0',
    //   street: this.selection.selected.includes(x => x.name === 'Street')
    //     ? '1'
    //     : '0',
    //   distance: '1'
    // };

    this.location = {
      street : this.shareStreet,
      city: this.shareCity,
      state: this.shareState,
      country: this.shareCountry,
      distance: '1'
    };

    this.request = {
      message: this.form.get('message').value,
      accessCode: this.form.get('accessCode').value,
      group: this.form.get('group').value,
      location: this.location
    };

    this.requestsService
      .sendAddRequest(this.request)
      .subscribe((response: ApiResponse) => {
        console.log(response);

        if (response.status) {
          this.displayAlert('Request sent', 'Connecting is caring.', null);
          this.form.reset();
          this.isValidAccessCode = false;
        } else {
          this.displayAlert('Request sent failed', response.message, null);
          this.form.reset();
          this.isValidAccessCode = false;
        }
      });
  }

  locationSelectionChanges( locationBit: string, shared: any) {
    console.log(locationBit);

    switch (locationBit) {
      case 'building':
        this.shareHouseNo = shared;
        break;
      case 'street':
        this.shareStreet = shared;
        break;
      case 'city':
        this.shareCity = shared;
        break;
      case 'state':
        this.shareState = shared;
        break;
      case 'country':
        this.shareCountry = shared;
        break;
    }
  }
}
