import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { ListComponent } from './list/list.component';
import { NewEditComponent } from './new-edit/new-edit.component';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    NewEditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    WidgetsModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
