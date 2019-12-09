import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { MatButtonModule, MatGridListModule, MatIconModule } from '@angular/material';

import { IonicModule } from '@ionic/angular';
import { SigninPage } from './signin.page';
import { LocationService } from '../services/location.service';
import { LoadingService } from '../shared/services/loading.service';
const routes: Routes = [
  {
    path: '',
    component: SigninPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicStorageModule,
    MatButtonModule, MatGridListModule, MatIconModule
  ],
  declarations: [SigninPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    LocationService,
    LoadingService
  ]
})
export class SigninPageModule {}
