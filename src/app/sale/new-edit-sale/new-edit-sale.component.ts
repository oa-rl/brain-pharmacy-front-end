import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { Customer, ProductCombination } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';
import { SaleInvoice, SaleInvoiceDetails } from 'src/app/models/sale.models';

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
    console.log(promise);
    this.listOfProductsCombination =  this.addJoinName(promise[0]);
    this.listOfCustomer = promise[1];
  }

  addJoinName(products:  ListData<Array<ProductCombination>>) {
    products.data.forEach((product: ProductCombination) => {
      product.joinName = `${product.product?.name} ${product.amountSize} ${product.size?.name} ${product.medicalHouse?.name} (${product.saleFor?.name})` 
    });
    return products;
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
    if(form.customerId !== 0 && form.productCombinationId !== 0 && form.quantity !== 0) {
      this.listOfDetails.push({
        productCombinationId: form.productCombinationId, 
        productRowTemp: `${form.productCombinationTemp} Q. ${form.productCombination.price} X ${form.quantity} = ${(form.productCombination.price * form.quantity)}`,
        amount: form.quantity,
        price: form.productCombination.price,
        priceWithOutTax: this._core.getAmountWithOutIva(form.productCombination.price),
        tax: this._core.getIva(form.productCombination.price),
      });
    }
  }


  private initForm() {
    this._form = this.builder.group({
      id: 0,
      productCombinationTemp: [null, [Validators.required]],
      productCombinationId: [null, [Validators.required]],
      customerTemp: [null, [Validators.required]],
      customerId:  [null, [Validators.required]],
      saleInvoiceDetails: [[]]
    });
  }

  async save(value: boolean) {
    if (value && this.formIsValid()) {
      try {
        const opt = (this._id === 0) ? 'insert' : 'update';
        if(this._form.value.operationTypeId === 1) {
          this._form.value.expirationDate = this._core.stringToDate(this._form.value.expirationDate)
        }
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
