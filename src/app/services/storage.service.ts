import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public KEY_PREFIX = 'loc';
  public USER_ID = `user_id`;
  public TOKEN = `token`;
  public CONNECT_CODE = `connect_code`;
  public NAME = `name`;
  public PIC = 'pic';
  public FREQUENCY = 'frequency';
  public IS_AUTHENTICATED = 'is_authenticated';
  public LAT = 0;
  public LNG = 0;

  constructor(private storage: Storage) {
    console.log('Hello StorageServiceProvider Provider');
  }

  set(key: string, value: string) {
    return this.storage.set(`${this.KEY_PREFIX}_${key}`, value);
    // localStorage.setItem(`${this.KEY_PREFIX}_${key}`, value);
  }

  async get(key: string) {
      return await this.storage.get(`${this.KEY_PREFIX}_${key}`);
  }

  async remove(key: string) {
    return await this.storage.remove(`${this.KEY_PREFIX}_${key}`);
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

  userIdInLocalStorage(): Promise<any> {
    return this.get(this.USER_ID);
  }

  async setUserId(userId: string): Promise<any> {
    return await this.set(this.USER_ID, userId);
  }
}
