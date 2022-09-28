import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { isNil } from 'lodash';
import { LocalStorageService } from 'ngx-localstorage';
import { CoreService } from 'src/app/core/core.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate  {
  constructor(private _storage: LocalStorageService, private _router:Router, private _core:CoreService) {}
  canActivate(  next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
      console.log(this._core.isLogged);
    if(!isNil(this._storage.get('token'))) {
      this._core.isLogged = true;
      return true;
    } else {
      this._core.isLogged = false;
      this._router.navigate(['/public/login']);
      return false;
    }
  }
  
}
