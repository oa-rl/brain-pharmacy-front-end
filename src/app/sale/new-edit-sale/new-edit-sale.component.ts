import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { Customer, ProductCombination } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';
import { SaleInvoice, SaleInvoiceDetails } from 'src/app/models/sale.models';
import { find, isNil, round } from 'lodash';

@Component({
  selector: 'brain-new-edit-sale',
  templateUrl: './new-edit-sale.component.html',
  styleUrls: ['./new-edit-sale.component.scss']
})
export class NewEditSaleComponent extends FormComponent implements OnInit {

  private _api: Api<SaleInvoice>;
  private _apiProductCombination: Api<ProductCombination>;
  private _apiCustomer: Api<Customer>;
  private _id: number = 0;
  public loading: boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista',
      path: '/sale/list'
    },
    {
      name: 'Nueva factura',
    }
  ];

  public listOfProductsCombination!: ListData<Array<ProductCombination>>;
  public listOfCustomer!: ListData<Array<Customer>>;
  public listOfDetails: Array<SaleInvoiceDetails> = [];
  private _productCombinationTemp!: ProductCombination;
  public displayContainer: boolean = true;
  
  @ViewChild('productCombinationInput') productCombinationInput!: ElementRef;


  constructor(private _core: CoreService, protected builder: UntypedFormBuilder, private route: ActivatedRoute, private _route:Router) {
    super();
    this._api = this._core.resource('SaleInvoice');
    this._apiProductCombination = this._core.resource('ProductCombination');
    this._apiCustomer = this._core.resource('Customer');
  }

  async ngOnInit() {
    this._id = Number((this.route.snapshot.paramMap.get('id') || 0)?.toString())!;
    this.initForm();
    await this.loadMaster();
    if(this._id !== 0) {
      await this.find();
      if(this._id !== 0) {
        const fullName: string = find(this.listOfCustomer.data, {id: this._form.value.customerId})?.fullName || '';
        this._form.value.saleInvoiceDetails.forEach((sale:SaleInvoiceDetails) => {
          const product: ProductCombination = find(this.listOfProductsCombination.data, {id: sale.productCombinationId})!;
          sale.productRowTemp = `${product.joinName} Q.${sale.price} X ${sale.amount} = Q.${(sale.price * sale.amount)}`;
        });
        this._form.patchValue({customerTemp: fullName});
        this.listOfDetails = this._form.value.saleInvoiceDetails;
        this._form.disable();
        this.displayContainer = false;
        console.log(this._form.value);
      }
    }
  }

  async loadMaster() {
    const promise = await Promise.all([this._apiProductCombination.find().toPromise(), this._apiCustomer.find().toPromise()]);
    this.listOfProductsCombination =  this.addJoinName(promise[0]);
    this.listOfCustomer = this.addFullName(promise[1]);
  }

  addJoinName(products:  ListData<Array<ProductCombination>>) {
    products.data.forEach((product: ProductCombination) => {
      product.joinName = `${product.product?.name} ${product.amountSize} ${product.size?.name} ${product.medicalHouse?.name} (${product.saleFor?.name})` 
    });
    return products;
  }

  addFullName(customers:  ListData<Array<Customer>>) {
    customers.data.forEach((customer: Customer) => {
      customer.fullName = `${customer.name} ${customer.lastName}`;
    });

    return customers;
  }

  setProductCombination() {
    this._productCombinationTemp  = find(this.listOfProductsCombination.data, {id: this._form.value.productCombinationId}) || Object(); 
  }

  async find() {
    this.loading = true;
      this._form.disable();
      this._core.savingOn();
      try {
        const data: SaleInvoice = await this._api.findById(this._id).toPromise();
        console.log(data);
        this._form.patchValue(data);
        this._form.enable();
      } catch (error) {
        
      } finally {
        this._core.savingOff();
        this.loading = false;
      }
  }

  addRow() {
    const form = this._form.value;
    if(!isNil(form.customerId) && !isNil(form.productCombinationId) && !isNil(form.quantity)) {
      this.listOfDetails.push({
        id: 0,
        saleInvoiceId: 0,
        productCombinationId: form.productCombinationId, 
        productRowTemp: `${form.productCombinationTemp} Q.${this._productCombinationTemp.price} X ${form.quantity} = Q.${(this._productCombinationTemp.price * form.quantity)}`,
        amount: form.quantity,
        price: this._productCombinationTemp.price,
        priceWithOutTax: this._core.getAmountWithOutIva(this._productCombinationTemp.price),
        tax: this._core.getIva(this._productCombinationTemp.price),
      });
      this.clearProduct();
      this.setFocus();
    }
  }

  getTotal( ): number {
    let total:number = 0.0;
    this.listOfDetails.forEach((sale: SaleInvoiceDetails) => {
      total += round((sale.amount * sale.price), 2) ;
    });
    return total;
  }

  removeRow(index: number) {
    this.listOfDetails.splice(index,1);
  }

  clearProduct() {
    this._form.patchValue({productCombinationTemp: ''}, {quantity: 1}, {productCombinationId: 0});
  }

  setFocus() {
    this.productCombinationInput.nativeElement.focus();
  }


  private initForm() {
    this._form = this.builder.group({
      id: 0,
      authorization: '123',
      date: new Date(),
      productCombinationTemp: null,
      productCombinationId: null,
      customerTemp: null,
      customerId:  [null, [Validators.required]],
      quantity: 1,
      saleInvoiceDetails: [[]]
    });
  }

  async save(value: boolean) {
    if (value && this.formIsValid()) {
      try {
        const opt = (this._id === 0) ? 'insert' : 'update';
        this._form.value.saleInvoiceDetails = this.listOfDetails;
        await this._api[opt](this._form.value).toPromise();
        this.goBack();
        this.notifySuccess();
      } catch (error) {
        
      } finally {
        this._core.savingOff();
      }
    }
  }

  goBack() {
    this._route.navigate(['/sale/list']);
  }


}
