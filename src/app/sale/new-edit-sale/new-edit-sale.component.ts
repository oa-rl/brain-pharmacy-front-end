import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Notify } from 'notiflix';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';

@Component({
  selector: 'brain-new-edit-sale',
  templateUrl: './new-edit-sale.component.html',
  styleUrls: ['./new-edit-sale.component.scss']
})
export class NewEditSaleComponent extends FormComponent implements OnInit {

  constructor(public core: CoreService, protected builder: UntypedFormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this._form = this.builder.group({
      id: null,
      address: [null, [Validators.required]],
      name: [null, [Validators.required]],
      nit: [null, [Validators.required]],
    });
  }

  cancel(opt: boolean) {
    alert(opt);
  }

  save(value: boolean) {
    if (value) {
      console.log(this._form);
      Notify.success('Guardado', {}, { backOverlayColor: '#4cda64' });
      setTimeout(() => {
        this.core.savingOff();
      }, 3000);
    }
  }

}
