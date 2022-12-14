import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Api } from 'src/app/core/rest-api';
import { Product } from 'src/app/models/inventory.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';

@Component({
  selector: 'brain-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  private _api: Api<Product>;
  public products!: ListData<Array<Product>>;
  public loading:boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista de productos'
    }
  ]

  constructor(private _core: CoreService, private _route:Router) { 
    this._api = this._core.resource('Product');
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      this.loading = true;
      this.products = await this._api.find().toPromise();
    } catch (error) {
      
    } finally {
      this.loading = false;
    }
  }

  find(id: number) {
    this._route.navigate([`/inventory/product/edit/${id}`]);
  }

}
