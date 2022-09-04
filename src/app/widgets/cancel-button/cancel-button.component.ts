import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Confirm } from 'notiflix';

@Component({
  selector: 'brain-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss']
})
export class CancelButtonComponent implements OnInit {

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() ok: string = 'Si';
  @Input() no: string = 'No';
  @Output() doIt = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    Confirm.show(
      this.title,
      this.message,
      this.ok,
      this.no,
      () => {
        this.doIt.emit(true)
      },
      () => {
      this.doIt.emit(false);
      },
      {
        borderRadius: '0.5rem',
        backgroundColor: '#ffcc00',
        titleColor: '#000000',
        okButtonColor: '#FFFFFF',
        okButtonBackground: '#4cda64',
        cancelButtonColor: '#FFFFFF',
        cancelButtonBackground: '#ff3b2f'

      },
      );
  }

}
