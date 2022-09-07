import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveButtonComponent } from './save-button/save-button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { RouterModule } from '@angular/router';

const components = [SaveButtonComponent, CancelButtonComponent, BreadCrumbsComponent];


@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [...components]
})
export class WidgetsModule { }
