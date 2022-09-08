import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista',
      path: '/company/list'
    },
    {
      name: 'Nueva empresa',
    }
  ]

  constructor(private _core: CoreService, protected builder: FormBuilder, private route: ActivatedRoute) {
    super();
    this._api = this._core.resource('Company');
  }

  ngOnInit(): void {
    this._id = Number(this.route.snapshot.paramMap.get('id')?.toString())!;
    this.initForm();
    this.find();
  }

  async find() {
    if(this._id) {
      this._core.savingOn();
      try {
        const data: Company = await this._api.findById(this._id).toPromise();
        this._form.patchValue(data);
      } catch (error) {
        
      } finally {
        this._core.savingOff();
      }
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
        await this._api.insert(this._form.value).toPromise();  
        this.notifySuccess();
      } catch (error) {
        
      } finally {
        this._core.savingOff();
      }
    }
  }
}
