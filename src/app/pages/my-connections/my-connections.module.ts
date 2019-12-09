import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {
  MatListModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatIconModule
} from '@angular/material';

import { MyConnectionsPage } from './my-connections.page';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { KeysPipe } from '../../pipes/keys.pipe';

const routes: Routes = [
  {
    path: '',
    component: MyConnectionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule
  ],
  declarations: [MyConnectionsPage, KeysPipe ],
  providers: [ToasterService]
})
export class MyConnectionsPageModule {}
