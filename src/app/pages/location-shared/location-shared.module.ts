import { MatButtonModule, MatCheckboxModule, MatDividerModule, MatTableModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationSharedPage } from './location-shared.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LocationSharedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule
  ],
  declarations: [LocationSharedPage]
})
export class LocationSharedPageModule {}
