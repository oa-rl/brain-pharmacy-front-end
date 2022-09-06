import { AutoCompleteList } from './../../interfaces/core.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Notify } from 'notiflix';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';

@Component({
  selector: 'brain-new-edit-product-combination',
  templateUrl: './new-edit-product-combination.component.html',
  styleUrls: ['./new-edit-product-combination.component.scss']
})
export class NewEditProductCombinationComponent extends FormComponent implements OnInit {

  public productList: Array<AutoCompleteList> = [
    {
      value: 'Aspirina',
      key: 1
    }, {
      value: 'Tapsin',
      key: 2
    }, {
      value: 'Ibuprofeno',
      key: 3
    },
    {
      value: 'Bismuto',
      key: 4
    },
    {
      value: 'Pancratina',
      key: 5
    },
  ];

  public measureList: Array<AutoCompleteList> = [
    {
      value: 'mg',
      key: 1
    }, {
      value: 'ml',
      key: 2
    }, {
      value: 'g',
      key: 3
    }
  ];

  public medicalHouseList: Array<AutoCompleteList> = [
    {
      value: 'Bayer',
      key: 1
    }, {
      value: 'Home',
      key: 2
    }, {
      value: 'Palet',
      key: 3
    }
  ];
  constructor(public core: CoreService, protected builder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this._form = this.builder.group({
      id: null,
      branchId: [null, [Validators.required]],
      productId: [null, [Validators.required]],
      sizeId: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      medicalHouseId: [null, [Validators.required]],
      saleForId: [null, [Validators.required]],
      saleAmount: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  cancel(opt: boolean) {
    if(opt) {
      this._form.reset();
    }
  }

  save(value: boolean) {
    if (value) {
      Notify.success('Guardado', {}, { backOverlayColor: '#4cda64' });
      setTimeout(() => {
        this.core.savingOff();
      }, 3000);
    }
  }

}
