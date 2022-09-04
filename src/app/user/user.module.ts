import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NewEditComponent } from './new-edit/new-edit.component';
import { ListComponent } from './list/list.component';
import { WidgetsModule } from '../widgets/widgets.module';


@NgModule({
  declarations: [
    NewEditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    WidgetsModule
  ]
})
export class UserModule { }
