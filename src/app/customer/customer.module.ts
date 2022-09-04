import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { NewEditCustomerComponent } from './new-edit-customer/new-edit-customer.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListCustomerComponent,
    NewEditCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    WidgetsModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
