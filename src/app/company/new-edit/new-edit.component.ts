import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'brain-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.scss']
})
export class NewEditComponent extends FormComponent implements OnInit {

  private _api: Api<Company>;

  constructor(private _core: CoreService, protected builder: FormBuilder) {
    super();
    this._api = this._core.resource('Company');
  }

  ngOnInit(): void {
    this.initForm();
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
