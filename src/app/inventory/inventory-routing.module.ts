import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from '../guard/auth/is-auth.guard';
import { ListMedicalHouseComponent } from './list-medical-house/list-medical-house.component';
import { ListProductCombinationComponent } from './list-product-combination/list-product-combination.component';
import { ListProductMovementComponent } from './list-product-movement/list-product-movement.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ListSizeComponent } from './list-size/list-size.component';
import { MovementReportComponent } from './movement-report/movement-report.component';
import { NewEditMedicalHouseComponent } from './new-edit-medical-house/new-edit-medical-house.component';
import { NewEditProductCombinationComponent } from './new-edit-product-combination/new-edit-product-combination.component';
import { NewEditProductMovementComponent } from './new-edit-product-movement/new-edit-product-movement.component';
import { NewEditProductComponent } from './new-edit-product/new-edit-product.component';
import { NewEditSizeComponent } from './new-edit-size/new-edit-size.component';

const routes: Routes = [{
  path: 'inventory/product/list',
  component: ListProductComponent,
  canActivate:[IsAuthGuard]
},
{
  path: 'inventory/product/new',
  component: NewEditProductComponent,
  canActivate:[IsAuthGuard]
},
{
  path: 'inventory/product/edit/:id',
  component: NewEditProductComponent,
  canActivate:[IsAuthGuard]
}, {
  path: 'inventory/size/list',
  component: ListSizeComponent,
  canActivate:[IsAuthGuard]
}, {
  path: 'inventory/size/new',
  component: NewEditSizeComponent,
  canActivate:[IsAuthGuard]
},
{
  path: 'inventory/size/edit/:id',
  component: NewEditSizeComponent,
  canActivate:[IsAuthGuard]
}, {
  path: 'inventory/medical-house/list',
  component: ListMedicalHouseComponent,
  canActivate:[IsAuthGuard]
},{
  path: 'inventory/medical-house/new',
  component: NewEditMedicalHouseComponent,
  canActivate:[IsAuthGuard]
},
{
  path: 'inventory/medical-house/edit/:id',
  component: NewEditMedicalHouseComponent,
  canActivate:[IsAuthGuard]
}, {
  path: 'inventory/product-combination/list',
  component: ListProductCombinationComponent,
  canActivate:[IsAuthGuard]
}, {
  path: 'inventory/product-combination/new',
  component: NewEditProductCombinationComponent,
  canActivate:[IsAuthGuard]
},
{
  path: 'inventory/product-combination/edit/:id',
  component: NewEditProductCombinationComponent,
  canActivate:[IsAuthGuard]
}, {
  path: 'inventory/product-movement/list',
  component: ListProductMovementComponent,
  canActivate:[IsAuthGuard]
}, {
  path: 'inventory/product-movement/new',
  component: NewEditProductMovementComponent,
  canActivate:[IsAuthGuard]
},
{
  path: 'inventory/product-movement/edit/:id',
  component: NewEditProductMovementComponent,
  canActivate:[IsAuthGuard]
},
{
  path: 'inventory/movement-report',
  component: MovementReportComponent,
  canActivate:[IsAuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
