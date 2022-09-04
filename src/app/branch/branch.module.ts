import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { NewEditComponent } from './new-edit/new-edit.component';
import { ListComponent } from './list/list.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewEditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    WidgetsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BranchModule { }
