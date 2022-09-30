import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Main } from '../models/main';
import { Api } from './rest-api';
import { round } from 'lodash';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private _isSaving: boolean = false;
  private _amount: number = 0;
  private _isLogged: boolean = false;

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
