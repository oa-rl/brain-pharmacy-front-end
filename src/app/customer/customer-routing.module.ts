import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { NewEditCustomerComponent } from './new-edit-customer/new-edit-customer.component';

const routes: Routes = [{
  path: 'customer/list',
  component: ListCustomerComponent
}, {
  path: 'customer/new',
  component: NewEditCustomerComponent
}, {
  path: 'customer/edit/:id',
  component: NewEditCustomerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
