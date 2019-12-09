import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatOptionModule, MatSelectModule
  , MatListModule, MatIconModule } from '@angular/material';

import { HomePage } from './home.page';
import { LocationService } from '../services/location.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    MatInputModule, MatButtonModule, MatCheckboxModule, MatOptionModule, MatSelectModule, MatListModule, MatIconModule
  ],
  declarations: [ HomePage ],
  providers: [ LocationService ]
})
export class HomePageModule {}
