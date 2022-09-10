import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMedicalHouseComponent } from './list-medical-house/list-medical-house.component';
import { ListProductCombinationComponent } from './list-product-combination/list-product-combination.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ListSizeComponent } from './list-size/list-size.component';
import { NewEditMedicalHouseComponent } from './new-edit-medical-house/new-edit-medical-house.component';
import { NewEditProductCombinationComponent } from './new-edit-product-combination/new-edit-product-combination.component';
import { NewEditProductComponent } from './new-edit-product/new-edit-product.component';
import { NewEditSizeComponent } from './new-edit-size/new-edit-size.component';

const routes: Routes = [{
  path: 'inventory/product/list',
  component: ListProductComponent
},
{
  path: 'inventory/product/new',
  component: NewEditProductComponent
},
{
  path: 'inventory/product/edit/:id',
  component: NewEditProductComponent
}, {
  path: 'inventory/size/list',
  component: ListSizeComponent
}, {
  path: 'inventory/size/new',
  component: NewEditSizeComponent
},
{
  path: 'inventory/size/edit/:id',
  component: NewEditSizeComponent
}, {
  path: 'inventory/medical-house/list',
  component: ListMedicalHouseComponent
},{
  path: 'inventory/medical-house/new',
  component: NewEditMedicalHouseComponent
},
{
  path: 'inventory/medical-house/edit/:id',
  component: NewEditMedicalHouseComponent
}, {
  path: 'inventory/product-combination/list',
  component: ListProductCombinationComponent
}, {
  path: 'inventory/product-combination/new',
  component: NewEditProductCombinationComponent
},
{
  path: 'inventory/product-combination/edit/:id',
  component: NewEditProductCombinationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
