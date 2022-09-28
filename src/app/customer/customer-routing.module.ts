import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from '../guard/auth/is-auth.guard';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { NewEditCustomerComponent } from './new-edit-customer/new-edit-customer.component';

const routes: Routes = [{
  path: 'customer/list',
  component: ListCustomerComponent,
  canActivate:[IsAuthGuard]
}, {
  path: 'customer/new',
  component: NewEditCustomerComponent,
  canActivate:[IsAuthGuard]
}, {
  path: 'customer/edit/:id',
  component: NewEditCustomerComponent,
  canActivate:[IsAuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
