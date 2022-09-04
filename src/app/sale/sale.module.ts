import { WidgetsModule } from './../widgets/widgets.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { ListSaleComponent } from './list-sale/list-sale.component';
import { NewEditSaleComponent } from './new-edit-sale/new-edit-sale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListSaleComponent,
    NewEditSaleComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    WidgetsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SaleModule { }
