import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard.page';
import { IonicModule } from '@ionic/angular';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { UtilityService } from '../services/utility.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule
  ],
  declarations: [DashboardPage],
  providers: [
    NativeGeocoder,
    UtilityService
  ]
})
export class DashboardPageModule {}
