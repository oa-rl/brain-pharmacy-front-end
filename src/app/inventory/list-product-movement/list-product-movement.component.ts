import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Api } from 'src/app/core/rest-api';
import { ProductMovement } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';

@Component({
  selector: 'brain-list-product-movement',
  templateUrl: './list-product-movement.component.html',
  styleUrls: ['./list-product-movement.component.scss']
})
export class ListProductMovementComponent implements OnInit {

  private _api: Api<ProductMovement>;
  public productMovement!: ListData<Array<ProductMovement>>;
  public loading:boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista de movimientos'
    }
  ]

  constructor(private _core: CoreService, private _route:Router) { 
    this._api = this._core.resource('ProductMovement');
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      this.loading = true;
      this.productMovement = await this._api.find().toPromise();
    } catch (error) {
      
    } finally {
      this.loading = false;
    }
  }

  find(id: number) {
    this._route.navigate([`/inventory/product-movement/edit/${id}`]);
  }

}
