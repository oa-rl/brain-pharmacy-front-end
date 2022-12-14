import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { Product, ProductCombination, SaleFor } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';
import { MedicalHouse, Size } from './../../models/inventory.models';
import { find } from 'lodash';

@Component({
  selector: 'brain-new-edit-product-combination',
  templateUrl: './new-edit-product-combination.component.html',
  styleUrls: ['./new-edit-product-combination.component.scss']
})
export class NewEditProductCombinationComponent extends FormComponent implements OnInit {

  private _api: Api<ProductCombination>;
  private _apiProduct: Api<Product>;
  private _apiSize: Api<Size>;
  private _apiMedicalHouse: Api<MedicalHouse>;
  private _apiSaleFor: Api<SaleFor>;

  public listOfProducts!: ListData<Array<Product>>
  public listOfSize!: ListData<Array<Size>>
  public listOfMedicalHouse!: ListData<Array<MedicalHouse>>
  public listOfSaleFor!: ListData<Array<SaleFor>>
  private _id: number = 0;
  public loading: boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista',
      path: '/inventory/product-combination/list'
    },
    {
      name: 'Nueva combinacion de producto',
    }
  ]
  constructor(private _core: CoreService, protected builder: UntypedFormBuilder, private route: ActivatedRoute, private _route: Router) {
    super();
    this._api = this._core.resource('ProductCombination');
    this._apiProduct = this._core.resource('Product');
    this._apiSize = this._core.resource('Size');
    this._apiMedicalHouse = this._core.resource('MedicalHouse');
    this._apiSaleFor = this._core.resource('SaleFor');
  }

  ngOnInit(): void {
    this.initForm();
    this.masterLoad();
    this._id = Number((this.route.snapshot.paramMap.get('id') || 0)?.toString())!;
    if (this._id !== 0) {
      this.find();
    }
  }

  async masterLoad() {
    const promise = await Promise.all([this._apiProduct.find().toPromise(),this._apiSize.find().toPromise(), this._apiMedicalHouse.find().toPromise(), this._apiSaleFor.find().toPromise()]);
    this.listOfProducts = promise[0];
    this.listOfSize = promise[1];
    this.listOfMedicalHouse = promise[2];
    this.listOfSaleFor = promise[3];
    if(this._id !== 0) {
      this.findObj(this.listOfProducts.data,'productId','productTemp');
      this.findObj(this.listOfSize.data,'sizeId','sizeTemp');
      this.findObj(this.listOfMedicalHouse.data,'medicalHouseId','medicalHouseTemp');
      this.findObj(this.listOfSaleFor.data,'saleForId','saleForTemp');
    }
  }


  async find() {
    this.loading = true;
    this._form.disable();
    this._core.savingOn();
    try {
      const data: ProductCombination = await this._api.findById(this._id).toPromise();
      this._form.patchValue(data);
      this._form.enable();
    } catch (error) {

    } finally {
      this._core.savingOff();
      this.loading = false;
    }
  }

  private initForm() {
    this._form = this.builder.group({
      id: 0,
      companyId: [1, [Validators.required]],
      productTemp: [null, [Validators.required]],
      productId: [null, [Validators.required]],
      sizeTemp: [null, [Validators.required]],
      sizeId: [null, [Validators.required]],
      amountSize: [null, [Validators.required]],
      medicalHouseTemp: [null, [Validators.required]],
      medicalHouseId: [null, [Validators.required]],
      saleForTemp: [null, [Validators.required]],
      saleForId: [null, [Validators.required]],
      amountSale: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }


  async save(value: boolean) {
    if (value && this.formIsValid()) {
      try {
        const opt = (this._id === 0) ? 'insert' : 'update';
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
    this._route.navigate(['/inventory/product-combination/list']);
  }
}
