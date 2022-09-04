import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveButtonComponent } from './save-button/save-button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';

const components = [SaveButtonComponent, CancelButtonComponent];


@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule
  ],
  exports: [...components]
})
export class WidgetsModule { }
