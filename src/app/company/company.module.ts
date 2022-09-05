import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { NewEditComponent } from './new-edit/new-edit.component';
import { ListComponent } from './list/list.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';


@NgModule({
  declarations: [
    NewEditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    WidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule

  ],
  providers: [
  ]
})
export class CompanyModule { }
