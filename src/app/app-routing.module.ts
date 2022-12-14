import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule) ,
  },
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) ,
  }, {
    path: 'branch',
    loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule) ,
  }, {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule) ,
  }, {
    path: 'sale',
    loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule) ,
  },{
    path: '',
    redirectTo: 'sale',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
