import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { round } from 'lodash';
import { LocalStorageService } from 'ngx-localstorage';
import { DecodedToken, Main } from '../models/main';
import { Api } from './rest-api';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private _isSaving: boolean = false;
  private _amount: number = 0;
  private _isLogged: boolean = false;
  public token: DecodedToken | undefined;
  private _administratorOptions = [3,4,5,6,7,8,9,10,11,12,-2,-4,-5];
  private _operationsOptions = [7,10,11,-2,-4,-5]

  constructor(private http: HttpClient, private _storage: LocalStorageService) { }

  resource<T extends Main>(area: string) {
    return new Api<T>(this.http, area, this._storage);
  }

  stringToDate(date: string): Date {
    const year = date.substring(0,4);
    const month = date.substring(4,6);
    const day = date.substring(6,8);
    return new Date(`${year}/${month}/${day}`);
  }

  getAmountWithOutIva(amount: number) {
    return round((amount /1.12), 2);
  }
  getIva(amount: number) {
    return round((amount - this.getAmountWithOutIva(amount)),2);
  }

  getDecodeToken() {
    if(this._storage.get('token')) {
      const decode: DecodedToken = jwtDecode(this._storage.get('token'));
      this.token = decode;
    }
  }

  iHaveAccess(option: number): boolean {
    const role: number = Number(this.token?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    //admin
    switch (role) {
      case 1:
        return true;
      case 2:
        return this._administratorOptions.includes(option);
      case 3:
        return this._operationsOptions.includes(option);
      default:
        return false;
    }
  }



  savingOn() {
    this._isSaving = true;
  }

  savingOff() {
    this._isSaving = false;
  }

  get isSaving(): boolean {
    return this._isSaving;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this.amount = value;
  }

  set isLogged(v: boolean) {
    this._isLogged = v;
  }

  get isLogged(): boolean {
    return this._isLogged;
  }

}
