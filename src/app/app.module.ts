import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BranchModule } from './branch/branch.module';
import { CompanyModule } from './company/company.module';
import { InventoryModule } from './inventory/inventory.module';
import { UserModule } from './user/user.module';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { CustomerModule } from './customer/customer.module';
import { SaleModule } from './sale/sale.module';
import { DirectivesModule } from './directives/directives.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxLocalStorageModule.forRoot({
      prefix: 'brain',
      delimiter: '-'
    }),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    
    AppRoutingModule,
    CompanyModule,
    BranchModule,
    UserModule,
    InventoryModule,
    CustomerModule,
    SaleModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
