import { Component, Input, OnInit } from '@angular/core';
import { BreadCrumbs } from 'src/app/models/main';

@Component({
  selector: 'brain-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent  {
  @Input() breadCrum: Array<BreadCrumbs> = [];
}
