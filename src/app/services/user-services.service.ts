import { HttpClient } from '@angular/common/http';
import { IConnections } from '../models/my-connections.model';
import { ICreateUserModel } from '../models/create-user.model';
import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../shared/local-storage-keys';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  private API_BASE_URL = environment.API_BASE_URL;
  private token: string;
  private localStorageKeys: LocalStorageKeys;
  public currentSelectUserId: IConnections;

  constructor(
    private http: HttpClient,
    ) {
      this.localStorageKeys = new LocalStorageKeys();
      this.token = localStorage.getItem(`${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.TOKEN}`);
  }

  signup(userModel: ICreateUserModel): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/api/user/register`, userModel)
    .pipe(map( response =>  response));
      // .subscribe (  response => {
      // console.log('test response: ', response);
      // console.log('test response: ', response.status);
      // console.log('test response: ', response.data.token);
      // console.log('test response: ', response.message);

  }

  // validating userId (GUID) and 4 digits key
  validateUserKey(userId: string, key: string) {
    const user = { id : userId, email: '', password: '', passKey: key };
    return this.http.post(`${this.API_BASE_URL}/auth/validate`, user);
  }

  // validating user's ID which is a GUID
  getNameByAccessCode(accessCode: string) {
    return this.http.get(`${this.API_BASE_URL}/api/user/by/access-code/${accessCode}`);
  }

  getMyConnections() {
    return this.http.get(`${this.API_BASE_URL}/api/user/connections`);
  }

  getConnectionsWithLocation() {
    return this.http.get(`${this.API_BASE_URL}/api/connections`);
  }

  updatePhoto(image: string) {
    return this.http.post(`${this.API_BASE_URL}/api/user/photo`, {base64Image: image});
  }

  updateLocationFrequency(minutes: number) {
    return this.http.post(`${this.API_BASE_URL}/api/user/update/freq`,{minutes: minutes} );
  }

  updateConnectionSharedDetails(connectionId: number, sharedLocationDetails: string) {
    return this.http.post(`${this.API_BASE_URL}/api/user/loc/bits/update/${connectionId}`,
    { data: sharedLocationDetails } );
  }
  getUserProfile() {
    return this.http.get(`${this.API_BASE_URL}/api/user/profile`);
  }

}
