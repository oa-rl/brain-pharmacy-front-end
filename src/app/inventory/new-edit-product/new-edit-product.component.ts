import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from 'src/app/core/form.component';
import { Component, OnInit } from '@angular/core';
import { Notify } from 'notiflix';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'brain-new-edit-product',
  templateUrl: './new-edit-product.component.html',
  styleUrls: ['./new-edit-product.component.scss']
})
export class NewEditProductComponent extends FormComponent implements OnInit {

  constructor(public core: CoreService, protected builder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this._form = this.builder.group({
      id: null,
      name: [null, [Validators.required]],
    });
  }

  cancel(opt: boolean) {
    if(opt) {
      this._form.reset();
    }
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
