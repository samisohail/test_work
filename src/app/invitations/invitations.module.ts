import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MatCardModule, MatButtonModule, MatDialogModule, MatIconModule,
        MatInputModule, MatListModule } from '@angular/material';
import { InvitationsPage } from './invitations.page';
import { UserProfilePage } from '../shared/dialogs/user-profile/user-profile.page';
import { MatTableModule, MatCheckboxModule, MatGridListModule } from '@angular/material';
import { LocationSharedPage } from '../shared/dialogs/location-shared/location-shared.page';
import { FooterPage } from '../shared/components/footer/footer.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatCardModule, MatButtonModule, MatDialogModule,
    MatIconModule, MatInputModule, MatListModule,
    MatTableModule, MatCheckboxModule, MatGridListModule
  ],
  declarations: [InvitationsPage, UserProfilePage, LocationSharedPage ],
  entryComponents: [ UserProfilePage, LocationSharedPage]
})
export class InvitationsPageModule {}
