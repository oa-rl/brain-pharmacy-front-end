import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Notify } from 'notiflix';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';

@Component({
  selector: 'brain-new-edit-medical-house',
  templateUrl: './new-edit-medical-house.component.html',
  styleUrls: ['./new-edit-medical-house.component.scss']
})
export class NewEditMedicalHouseComponent extends FormComponent implements OnInit {

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
    });
  }

  cancel(opt:boolean) {
    alert(opt);
  }

  save(value: boolean) {
    if(value) {
      console.log(this._form.value)
      Notify.success('Guardado', {}, {backOverlayColor : '#4cda64'});
    setTimeout(() => {
      this.core.savingOff();
    }, 3000);
    }
  }

}
