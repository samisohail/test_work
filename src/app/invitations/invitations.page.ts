import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { Observable, Subscription } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserProfilePage } from '../shared/dialogs/user-profile/user-profile.page';
import { AlertController, ToastController } from '@ionic/angular';
import { LocationSharedPage } from '../shared/dialogs/location-shared/location-shared.page';


@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.page.html',
  styleUrls: ['./invitations.page.scss'],
})
export class InvitationsPage implements OnInit, OnDestroy {

  private invitations: any;
  subscription: Subscription;

  constructor(
    private requestsService: RequestsService,
    private alert: AlertController,
    private toast: ToastController,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getInvitations();
  }

  viewRequestDetails(requestId: string) {
    console.log('viewRequestDetails: ', requestId);
    const dialogRef = this.dialog.open(LocationSharedPage, {
      width: '90%',
      height: '70%',
      data: { requestId: requestId }
    });
    // const dialogRef = this.dialog.open(UserProfilePage, {
    //   width: '90%',
    //   height: '50%',
    //   data: { requestId: requestId }
    // });
  }

  respond(id: number, response: boolean) {

    this.requestsService.respond(id, response).subscribe( (apiResponse: ApiResponse) => {
      // console.log(`respond: `, apiResponse);
      if (apiResponse.status) {
        const message = response ? `You' are connected now.` : `Friend request ignored.`;
        this.getInvitations();
        // this.displayAlert(`You're connected now.`, '');
        this.toaster(message);
      }
    }, error => {
      this.displayAlert(`Action failed`, `Oops! Something went wrong. Please try later.`);
    });
  }

  displayAlert(title: string, alertMessage: string) {
    this.alert.create({
      message: alertMessage,
      header: title,
      buttons: [`Ok`]
    }).then( (alert: HTMLIonAlertElement) => {
      alert.present();
    });
  }

  getInvitations() {
    this.subscription = this.requestsService.getMyInvitations().subscribe( (response: ApiResponse) => {
      console.log('invitations: ', response);
      if (response.status) {
        this.invitations = response.data;
      } else {
        this.displayAlert(`Oops!`, `Something went wrong, please check your connection and re-try.`);
      }
    });
  }

  toaster(toastMessage: string) {
    this.toast.create({
      message: toastMessage,
      animated: true,
      buttons: ['Ok']
    }).then(toaster => toaster.present());
  }

  locationObject(location: string): string {
    const locationJson = JSON.parse(location);
    let shared = '';
    Object.keys(locationJson ).forEach( (key) => {
      if ( locationJson[key] == '1') {
        shared += key.toUpperCase() + ', ';
      }
    });
    return shared;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
