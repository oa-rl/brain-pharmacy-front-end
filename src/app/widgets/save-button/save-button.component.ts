import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'brain-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {

  @Input() stop: boolean  = true;
  @Output() do = new EventEmitter<boolean>();

  
  
  constructor(public core: CoreService) { }

  ngOnInit(): void {
  }

  save() {
    this.core.savingOn();
    this.do.emit(true);
  }

}
