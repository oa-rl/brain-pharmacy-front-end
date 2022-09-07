import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'brain-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  currentPage: number = 1;
  @Output() doIt = new EventEmitter<boolean>();
  @Input() pageSize: number = 0;

  back() {
    this.doIt.emit(false);
  }
  
  next() {
    this.doIt.emit(true);
  }

}
