import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { isNil } from 'lodash';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate  {
  constructor(private _storage: LocalStorageService, private _router:Router) {}
  canActivate(  next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
      console.log('guard');
    if(!isNil(this._storage.get('token'))) {
      return true;
    } else {
      this._router.navigate(['/public/login']);
      return false;
    }
  }
  
}
