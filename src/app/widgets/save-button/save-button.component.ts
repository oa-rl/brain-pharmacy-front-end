import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'brain-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent {
  private _isDesabled: boolean = false;

  @Output() do = new EventEmitter<boolean>();

  @Input() set isDesabled(v: boolean) {
    this._isDesabled = v;
  }

  get isDesabled(): boolean {
    return this._isDesabled;
  }
  
  constructor(public core: CoreService) { }


  save() {
    this.core.savingOn();
    this.do.emit(true);
  }

}
