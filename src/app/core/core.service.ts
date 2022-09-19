import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Main } from '../models/main';
import { Api } from './rest-api';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private _isSaving: boolean = false;

  constructor(private http: HttpClient) { }

  resource<T extends Main>(area: string) {
    return new Api<T>(this.http, area);
  }

  stringToDate(date: string): Date {
    const year = date.substring(0,4);
    const month = date.substring(4,6);
    const day = date.substring(6,8);
    return new Date(`${year}/${month}/${day}`);
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
}
