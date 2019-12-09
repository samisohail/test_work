import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { UserBoardPage } from './user-board.page';

const routes: Routes = [
  {
    path: 'user-board',
    component: UserBoardPage,
    children: [
          { path: 'alerts', loadChildren: '../create-alert/create-alert.module#CreateAlertPageModule'},
          { path: 'messages', loadChildren: '../messages/messages.module#MessagesPageModule' },
          { path: 'location-shared', loadChildren: '../location-shared/location-shared.module#LocationSharedPageModule'}
    ]
  },
  {
    path: '',
    redirectTo: 'user-board/messages',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserBoardPage]
})
export class UserBoardPageModule {}
