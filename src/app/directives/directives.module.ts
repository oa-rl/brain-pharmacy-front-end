import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorDirective } from './input-error.directive';

const directive = [InputErrorDirective];

@NgModule({
  declarations: [
    ...directive
  ],
  exports: [...directive],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
