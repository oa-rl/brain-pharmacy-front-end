import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[brainRowSelected]'
})
export class RowSelectedDirective {
  protected _elementClass: string[] = [];

  @Input('class')
  @HostBinding('class')
  get elementClass(): string {
      return this._elementClass.join(' ');
  }
  set(val: string) {
      this._elementClass = val.split(' ');
  }
  constructor() { }

  @HostListener('mouseenter') onMouseEnter() {
    this.clearElementClass();
    this._elementClass.push('bg-black');
    this._elementClass.push('text-white');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.clearElementClass();
    this._elementClass.push('bg-white');
    this._elementClass.push('text-primary');
  }

  clearElementClass() {
    this._elementClass.length = 0;
   }

}
