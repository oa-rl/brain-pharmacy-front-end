import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[brainInputError]'
})
export class InputErrorDirective {
  protected _elementClass: string[] = [];

  @Input('class')
  @HostBinding('class')
  get elementClass(): string {
      return this._elementClass.join(' ');
  }
  set(val: string) {
      this._elementClass = val.split(' ');
  }
  constructor() {
   this.classBase();
 }
 classBase() {
  this._elementClass.push('input');
    this._elementClass.push('input-bordered');
    this._elementClass.push('w-full');
 }

 clearElementClass() {
  this._elementClass.length = 0;
 }

 @Input() set brainInputError(error: boolean) {
  this.clearElementClass();
  if(error) {
    this.classBase();
    this._elementClass.push('input-error');
    this._elementClass.push('animate__animated');
    this._elementClass.push('animate__rubberBand');

  } else {
    this.classBase();
    this._elementClass.push('input-primary');
  }
 }

}
