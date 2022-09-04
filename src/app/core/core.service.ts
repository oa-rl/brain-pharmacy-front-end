import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from './rest-api';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private _isSaving: boolean = false;

  constructor(private http: HttpClient) { }

  resource<T>(area: string) {
    return new Api<T>(this.http, area);
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
