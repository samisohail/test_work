import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading = false;
  constructor(private loadingController: LoadingController) { }

  async present(loadingMessage: string) {
    this.loading = true;
    return await this.loadingController.create({
      message: loadingMessage
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.loading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.loading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

}
