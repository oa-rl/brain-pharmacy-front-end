import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSaleComponent } from './list-sale/list-sale.component';
import { NewEditSaleComponent } from './new-edit-sale/new-edit-sale.component';

const routes: Routes = [{
  path: 'sale/list',
  component: ListSaleComponent
}, {
  path: 'sale/new',
  component: NewEditSaleComponent
}, {
  path: 'sale/edit/:id',
  component: NewEditSaleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
