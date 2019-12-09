import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LocalStorageKeys } from '../shared/local-storage-keys';

// import 'rxjs/add/observable/fromPromise';
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  private token: string;
  private localStorageKeys: LocalStorageKeys;

  constructor(private alertController: AlertController) {
    this.localStorageKeys = new LocalStorageKeys();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // YOU CAN ALSO DO THIS
    // const token = this.authenticationService.getToken()
    const headers = {};

    headers[`Accept`] = 'application/json';
    headers[`Access-Control-Allow-Origin`] = '*';

    this.token = localStorage.getItem(`${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.TOKEN}`);
    headers[`Authorization`] = 'Bearer ' + this.token;

    // request.clone({headers: request.headers.set(`Authorization`, `Bearer ` + this.token)});
    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }

    const newReq = request.clone({
      setHeaders: headers
    });
    return next.handle(newReq);
  }

    async presentAlert(status, reason) {
      const alert = await this.alertController.create({
          header: status + ' Error',
          subHeader: 'Subtitle',
          message: reason,
          buttons: ['OK']
      });

      await alert.present();
    }

    getToken() {
      return localStorage.get(this.localStorageKeys.TOKEN).then( token => {
        return token;
      });
    }
}
