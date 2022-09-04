import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewEditComponent } from './new-edit/new-edit.component';

const routes: Routes = [
  {
    path: 'branch/list',
    component: ListComponent
  },
  {
    path: 'branch/new',
    component: NewEditComponent
  },
  {
    path: 'branch/edit/:id',
    component: NewEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
