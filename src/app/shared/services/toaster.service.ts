import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  toast(toastMessage: string) {
    this.toastController
      .create({
        message: toastMessage,
        animated: true,
        buttons: ['Ok']
      })
      .then(toaster => toaster.present());
  }

  async promptAlert(
    title: string,
    message: string,
    okText = 'Ok',
    cancelText = 'Cancel'
  ) {
    return new Promise(async resolve => {
      const alert = await this.alertController.create({
        header: title,
        message: message,
        buttons: [
          {
            text: okText,
            role: 'ok',
            handler: () => {
              resolve('Ok');
            }
          },
          {
            text: cancelText,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve('Cancel');
            }
          }
        ]
      });
      alert.present();
    });
  }

  async presentAlertConfirm(dialogMessage: string, okayBtnText = 'OK', cancelBtnText = 'Cancel' ) {
    return new Promise(async resolve => {
      const alert = await this.alertController.create({
        header: 'Confirm',
        message: dialogMessage,
        buttons: [
          {
            text: cancelBtnText,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              return resolve(false);
            }
          },
          {
            text: okayBtnText,
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }
}
