import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { Product } from 'src/app/models/inventory.models';
import { BreadCrumbs } from 'src/app/models/main';

@Component({
  selector: 'brain-new-edit-product',
  templateUrl: './new-edit-product.component.html',
  styleUrls: ['./new-edit-product.component.scss']
})
export class NewEditProductComponent extends FormComponent implements OnInit {

  private _api: Api<Product>;
  private _id: number = 0;
  public loading: boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista',
      path: '/inventory/product/list'
    },
    {
      name: 'Nuevo producto',
    }
  ]

  constructor(private _core: CoreService, protected builder: FormBuilder, private route: ActivatedRoute, private _route:Router) {
    super();
    this._api = this._core.resource('Product');
  }

  ngOnInit(): void {
    this._id = Number((this.route.snapshot.paramMap.get('id') || 0)?.toString())!;
    this.initForm();
    if(this._id !== 0) {
      this.find();
    }
  }

  async find() {
    this.loading = true;
      this._form.disable();
      this._core.savingOn();
      try {
        const data: Product = await this._api.findById(this._id).toPromise();
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
      name: [null, [Validators.required]],
    });
  }

  cancel(opt: boolean) {
    if(opt) {
      this._form.reset();
    }
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
    this._route.navigate(['/inventory/product/list']);
  }

}
