import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from '../guard/auth/is-auth.guard';
import { ListSaleComponent } from './list-sale/list-sale.component';
import { NewEditSaleComponent } from './new-edit-sale/new-edit-sale.component';

const routes: Routes = [{
  path: 'sale/list',
  component: ListSaleComponent,
  canActivate:[IsAuthGuard]
}, {
  path: 'sale/new',
  component: NewEditSaleComponent,
  canActivate:[IsAuthGuard]
}, {
  path: 'sale/edit/:id',
  component: NewEditSaleComponent,
  canActivate:[IsAuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
