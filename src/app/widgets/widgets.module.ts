import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveButtonComponent } from './save-button/save-button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import { LoadingComponent } from './loading/loading.component';

const components = [SaveButtonComponent, CancelButtonComponent, BreadCrumbsComponent, PaginationComponent, LoadingComponent];


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
