import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) ,
  }, {
    path: 'branch',
    loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule) ,
  }, {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule) ,
  },{
    path: '',
    redirectTo: 'company',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
