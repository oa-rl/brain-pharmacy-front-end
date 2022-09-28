import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { isNil } from 'lodash';

@Component({
  selector: 'brain-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brain-pharmacy';
  isLogged = false;
  
  @ViewChild('router') router?: ElementRef<HTMLElement>;
  check() {
    this.router?.nativeElement.click();
  }

  constructor(private _storage: LocalStorageService) {
    this.isLogged = !isNil(this._storage.get('token')) ;
  }

}
