import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { Company } from 'src/app/models/company';
import { BreadCrumbs } from 'src/app/models/main';

@Component({
  selector: 'brain-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.scss']
})
export class NewEditComponent extends FormComponent implements OnInit {

  private _api: Api<Company>;
  private _id: number = 0;
  public loading: boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista',
      path: '/company/list'
    },
    {
      name: 'Nueva empresa',
    }
  ]

  constructor(private _core: CoreService, protected builder: UntypedFormBuilder, private route: ActivatedRoute, private _route:Router) {
    super();
    this._api = this._core.resource('Company');
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
        const data: Company = await this._api.findById(this._id).toPromise();
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
      address: [null, [Validators.required]],
      name: [null, [Validators.required]],
      nit: [null, [Validators.required]],
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
    this._route.navigate(['/company/list']);
  }
}

