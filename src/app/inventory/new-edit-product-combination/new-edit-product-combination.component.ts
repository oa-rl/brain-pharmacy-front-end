import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { Product, ProductCombination } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';
import { MedicalHouse, Size } from './../../models/inventory.models';

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

  public listOfProducts!: ListData<Array<Product>>
  public listOfSize!: ListData<Array<Size>>
  public listOfMedicalHouse!: ListData<Array<MedicalHouse>>
  // private _apiProdcut: Api<Product>;
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
  constructor(private _core: CoreService, protected builder: FormBuilder, private route: ActivatedRoute, private _route: Router) {
    super();
    this._api = this._core.resource('ProductCombination');
    this._apiProduct = this._core.resource('Product');
    this._apiSize = this._core.resource('Size');
    this._apiMedicalHouse = this._core.resource('MedicalHouse');
    // this._api = this._core.resource('Product');
  }

  async loadProduct() {
    this.listOfProducts = await this._apiProduct.find().toPromise();
  }

  async loadSize() {
    this.listOfSize = await this._apiSize.find().toPromise();
  }

  async loadMedicalHouse() {
    this.listOfMedicalHouse = await this._apiMedicalHouse.find().toPromise();
  }

  ngOnInit(): void {
    this.initForm();
    this.loadProduct();
    this.loadSize();
    this.loadMedicalHouse()
  }

  private initForm() {
    this._form = this.builder.group({
      id: 0,
      companyId: [1, [Validators.required]],
      product: [null, [Validators.required]],
      productId: [null, [Validators.required]],
      size: [null, [Validators.required]],
      sizeId: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      medicalHouse: [null, [Validators.required]],
      medicalHouseId: [null, [Validators.required]],
      saleFor: [null, [Validators.required]],
      saleForId: [null, [Validators.required]],
      saleAmount: [null, [Validators.required]],
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
