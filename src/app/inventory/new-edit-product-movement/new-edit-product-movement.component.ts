import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { find } from 'lodash';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { OperationType, ProductCombination, ProductMovement } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';

@Component({
  selector: 'brain-new-edit-product-movement',
  templateUrl: './new-edit-product-movement.component.html',
  styleUrls: ['./new-edit-product-movement.component.scss']
})
export class NewEditProductMovementComponent extends FormComponent implements OnInit {

  private _api: Api<ProductMovement>;
  private _apiProductCombination: Api<ProductCombination>;
  private _apiOperationType: Api<OperationType>;
  private _id: number = 0;
  public loading: boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista',
      path: '/inventory/product-movement/list'
    },
    {
      name: 'Nuevo movimiento',
    }
  ];

  public listOfProductsCombination!: ListData<Array<ProductCombination>>;
  public listOfOperationType!: ListData<Array<OperationType>>;


  constructor(private _core: CoreService, protected builder: UntypedFormBuilder, private route: ActivatedRoute, private _route:Router) {
    super();
    this._api = this._core.resource('ProductMovement');
    this._apiProductCombination = this._core.resource('ProductCombination');
    this._apiOperationType = this._core.resource('OperationType');
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
    const promise = await Promise.all([this._apiProductCombination.find().toPromise(), this._apiOperationType.find().toPromise()]);
    this.listOfProductsCombination = this.addJoinName(promise[0]);
    this.listOfOperationType = promise[1];
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
        const data: ProductMovement = await this._api.findById(this._id).toPromise();
        data.operationType = find(this.listOfOperationType.data, {id: this._form.value.operationTypeId})!;
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
      productCombination: [null, [Validators.required]],
      productCombinationId: [null, [Validators.required]],
      expirationDate: null,
      quantity:[null, [Validators.required]],
      operationType:[null, [Validators.required]],
      operationTypeId: [null, [Validators.required]],
    });
  }

  async save(value: boolean) {
    if (value && this.formIsValid()) {
      try {
        const opt = (this._id === 0) ? 'insert' : 'update';
        if(this._form.value.operationTypeId === 1) {
          this._form.value.expirationDate = this._core.stringToDate(this._form.value.expirationDate)
        }
        delete this._form.value.operationType;
        delete this._form.value.productCombination;
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
    this._route.navigate(['/inventory/product-movement/list']);
  }

}
