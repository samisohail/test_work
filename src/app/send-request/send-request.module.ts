import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule, MatButtonModule, MatIconModule, MatTableModule, MatToolbarModule,
  MatCheckboxModule, MatSelectModule, MatListModule, MatGridListModule } from '@angular/material';

import { IonicModule } from '@ionic/angular';

import { SendRequestPage } from './send-request.page';
import { FooterPage } from '../shared/components/footer/footer.page';

const routes: Routes = [
  {
    path: '',
    component: SendRequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatInputModule, MatIconModule,
    MatButtonModule, MatTableModule,
    MatToolbarModule, MatCheckboxModule,
    MatSelectModule, MatListModule,
    MatGridListModule
  ],
  declarations: [SendRequestPage, FooterPage ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SendRequestPageModule {}
