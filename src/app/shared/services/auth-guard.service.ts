import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router' ;
import { LocalStorageKeys } from '../../shared/local-storage-keys';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private localStorageKeys: LocalStorageKeys;
  constructor(private router: Router) {
    this.localStorageKeys = new LocalStorageKeys();
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);
    const authenticated = localStorage.getItem(`${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.IS_AUTHENTICATED}`);
    console.log('authenticated: ', authenticated);

    if (authenticated !== '1') {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
