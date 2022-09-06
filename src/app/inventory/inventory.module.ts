import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { ListMedicalHouseComponent } from './list-medical-house/list-medical-house.component';
import { ListProductCombinationComponent } from './list-product-combination/list-product-combination.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ListSizeComponent } from './list-size/list-size.component';
import { NewEditMedicalHouseComponent } from './new-edit-medical-house/new-edit-medical-house.component';
import { NewEditProductCombinationComponent } from './new-edit-product-combination/new-edit-product-combination.component';
import { NewEditProductComponent } from './new-edit-product/new-edit-product.component';
import { NewEditSizeComponent } from './new-edit-size/new-edit-size.component';


@NgModule({
  declarations: [
    NewEditProductComponent,
    ListProductComponent,
    NewEditSizeComponent,
    ListSizeComponent,
    ListMedicalHouseComponent,
    NewEditMedicalHouseComponent,
    ListProductCombinationComponent,
    NewEditProductCombinationComponent,
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    WidgetsModule,
    FormsModule, 
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class InventoryModule { }
