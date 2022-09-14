import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Api } from 'src/app/core/rest-api';
import { ProductCombination } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';

@Component({
  selector: 'brain-list-product-combination',
  templateUrl: './list-product-combination.component.html',
  styleUrls: ['./list-product-combination.component.scss']
})
export class ListProductCombinationComponent implements OnInit {

  private _api: Api<ProductCombination>;
  public productCombination!: ListData<Array<ProductCombination>>;
  public loading:boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista de combinacion de productos'
    }
  ]

  constructor(private _core: CoreService, private _route:Router) { 
    this._api = this._core.resource('ProductCombination');
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      this.loading = true;
      this.productCombination = await this._api.find().toPromise();
    } catch (error) {
      
    } finally {
      this.loading = false;
    }
  }

  find(id: number) {
    this._route.navigate([`/inventory/product-combination/edit/${id}`]);
  }

}
