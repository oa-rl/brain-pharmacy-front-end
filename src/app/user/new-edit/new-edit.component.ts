import { Component, OnInit } from '@angular/core';
import { Notify } from 'notiflix';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'brain-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.scss']
})
export class NewEditComponent implements OnInit {
  
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
