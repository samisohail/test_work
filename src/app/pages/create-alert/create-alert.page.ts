import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IConnections } from 'src/app/models/my-connections.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { UserServices } from 'src/app/services/user-services.service';
import { loadingController } from '@ionic/core';

@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.page.html',
  styleUrls: ['./create-alert.page.scss'],
})
export class CreateAlertPage implements OnInit, OnDestroy {

  connections: Person[];
  connection: Person;

  userControl: any;
  form: any;
  sub: Subscription;
  currentSelectedUser: IConnections;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServices
  ) {
    this.connections = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];

    this.userControl = this.formBuilder.control(
      this.connections[0], Validators.required
    );

    this.form = this.formBuilder.group({
      user: this.userControl
    });
  }

  ngOnInit() {
    this.currentSelectedUser = this.userService.currentSelectUserId;
    console.log('alerts-selected-user: ', this.currentSelectedUser);
  }

  selectPerson(event: { component: IonicSelectableComponent, value: any }) {
    console.log('person: ', event.value);
  }

  ngOnDestroy() {
  //  this.sub.unsubscribe();
  }
}

export interface Person {
  id: number;
  name: string;
}
