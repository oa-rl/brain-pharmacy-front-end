import { Component, ElementRef, ViewChild } from '@angular/core';
import { CoreService } from './core/core.service';

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

  constructor(public core: CoreService) {
    core.getDecodeToken();
  }



}
