import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Api } from 'src/app/core/rest-api';
import { User } from 'src/app/models/customer.models';
import { BreadCrumbs, ListData } from 'src/app/models/main';

@Component({
  selector: 'brain-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private _api: Api<User>;
  public user!: ListData<Array<User>>;
  public loading:boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista de usuarios'
    }
  ]

  constructor(private _core: CoreService, private _route:Router) { 
    this._api = this._core.resource('User');
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      this.loading = true;
      this.user = await this._api.find().toPromise();
    } catch (error) {
      
    } finally {
      this.loading = false;
    }
  }

  find(id: number) {
    this._route.navigate([`/user/edit/${id}`]);
  }

}
