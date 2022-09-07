import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorDirective } from './input-error.directive';
import { RowSelectedDirective } from './row-selected.directive';

const directive = [InputErrorDirective, RowSelectedDirective];

@NgModule({
  declarations: [
    ...directive,
  ],
  exports: [...directive],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
