import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WidgetsModule } from './../widgets/widgets.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { ListSaleComponent } from './list-sale/list-sale.component';
import { NewEditSaleComponent } from './new-edit-sale/new-edit-sale.component';
import { SaleRoutingModule } from './sale-routing.module';
import { SalesReportComponent } from './sales-report/sales-report.component';


@NgModule({
  declarations: [
    ListSaleComponent,
    NewEditSaleComponent,
    SalesReportComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    WidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class SaleModule { }
