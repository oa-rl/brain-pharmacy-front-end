import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewEditComponent } from './new-edit/new-edit.component';

const routes: Routes = [
  {
    path: 'company/list',
    component: ListComponent
  },
  {
    path: 'company/new',
    component: NewEditComponent
  },
  {
    path: 'company/edit/:id',
    component: NewEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
