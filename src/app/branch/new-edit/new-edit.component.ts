import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Notify } from 'notiflix';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';

@Component({
  selector: 'brain-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.scss']
})
export class NewEditComponent extends FormComponent implements OnInit {

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
      address: [null, [Validators.required]],
    });

  }

  cancel(opt:boolean) {
    alert(opt);
  }

  save(value: boolean) {
    if(value) {
      console.log(this._form);
      Notify.success('Guardado', {}, {backOverlayColor : '#4cda64'});
    setTimeout(() => {
      this.core.savingOff();
    }, 3000);
    }
  }

}
