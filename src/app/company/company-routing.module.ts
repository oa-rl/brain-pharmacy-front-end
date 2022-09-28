import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from '../guard/auth/is-auth.guard';
import { ListComponent } from './list/list.component';
import { NewEditComponent } from './new-edit/new-edit.component';

const routes: Routes = [
  {
    path: 'company/list',
    component: ListComponent,
    canActivate:[IsAuthGuard]
  },
  {
    path: 'company/new',
    component: NewEditComponent,
    canActivate:[IsAuthGuard]
  },
  {
    path: 'company/edit/:id',
    component: NewEditComponent,
    canActivate:[IsAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
