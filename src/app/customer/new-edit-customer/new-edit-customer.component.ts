import { Component, OnInit } from '@angular/core';
import { Notify } from 'notiflix';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'brain-new-edit-customer',
  templateUrl: './new-edit-customer.component.html',
  styleUrls: ['./new-edit-customer.component.scss']
})
export class NewEditCustomerComponent implements OnInit {

  constructor(public core:CoreService) { }

  ngOnInit(): void {
  }

  cancel(opt:boolean) {
    alert(opt);
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
