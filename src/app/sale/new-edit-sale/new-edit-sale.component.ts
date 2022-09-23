import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { Customer, ProductCombination } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';
import { SaleInvoice, SaleInvoiceDetails } from 'src/app/models/sale.models';
import { find, isNil } from 'lodash';

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
  
  @ViewChild('productCombinationInput') productCombinationInput!: ElementRef;


  constructor(private _core: CoreService, protected builder: UntypedFormBuilder, private route: ActivatedRoute, private _route:Router) {
    super();
    this._api = this._core.resource('SaleInvoice');
    this._apiProductCombination = this._core.resource('ProductCombination');
    this._apiCustomer = this._core.resource('Customer');
  }

  ngOnInit(): void {
    this._id = Number((this.route.snapshot.paramMap.get('id') || 0)?.toString())!;
    this.initForm();
    this.loadMaster();
    if(this._id !== 0) {
      this.find();
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
        this._form.value.saleInvoiceDetails = this.listOfProductsCombination.data;
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
