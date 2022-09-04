import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'brain-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brain-pharmacy';
  
  @ViewChild('router') router?: ElementRef<HTMLElement>;
  check() {
    this.router?.nativeElement.click();
  }

}
