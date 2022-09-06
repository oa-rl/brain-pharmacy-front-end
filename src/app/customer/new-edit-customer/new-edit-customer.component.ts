import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Notify } from 'notiflix';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';

@Component({
  selector: 'brain-new-edit-customer',
  templateUrl: './new-edit-customer.component.html',
  styleUrls: ['./new-edit-customer.component.scss']
})
export class NewEditCustomerComponent extends FormComponent implements OnInit {

  constructor(public core:CoreService, protected builder: FormBuilder) { 
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this._form = this.builder.group({
      id: null,
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      nit: [null, [Validators.required]],
      email: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone1: [null, [Validators.required]],
      phone2: [null, [Validators.required]],
    });

  }

  cancel(opt:boolean) {
    if(opt) {
      this._form.reset();
    }
  }

  save(value: boolean) {
    if(value) {
      Notify.success('Guardado', {}, {backOverlayColor : '#4cda64'});
    setTimeout(() => {
      this.core.savingOff();
    }, 3000);
    }
  }

}
