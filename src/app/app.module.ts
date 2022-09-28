import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BranchModule } from './branch/branch.module';
import { CompanyModule } from './company/company.module';
import { CustomerModule } from './customer/customer.module';
import { DirectivesModule } from './directives/directives.module';
import { InventoryModule } from './inventory/inventory.module';
import { PublicModule } from './public/public.module';
import { SaleModule } from './sale/sale.module';
import { UserModule } from './user/user.module';


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
    DirectivesModule,
    PublicModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
