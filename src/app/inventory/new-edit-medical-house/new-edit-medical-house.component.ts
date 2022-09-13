import { MedicalHouse } from './../../models/inventory.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { BreadCrumbs } from 'src/app/models/main';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'brain-new-edit-medical-house',
  templateUrl: './new-edit-medical-house.component.html',
  styleUrls: ['./new-edit-medical-house.component.scss']
})
export class NewEditMedicalHouseComponent extends FormComponent implements OnInit {

  private _api: Api<MedicalHouse>;
  private _id: number = 0;
  public loading: boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista',
      path: '/inventory/medical-house/list'
    },
    {
      name: 'Nueva casa medica',
    }
  ]

  constructor(private _core: CoreService, protected builder: FormBuilder, private route: ActivatedRoute, private _route:Router) {
    super();
    this._api = this._core.resource('MedicalHouse');
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
        const data: MedicalHouse = await this._api.findById(this._id).toPromise();
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
    this._route.navigate(['/inventory/medical-house/list']);
  }
}
