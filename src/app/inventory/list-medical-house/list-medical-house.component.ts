import { MedicalHouse } from './../../models/inventory.models';
import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/core/rest-api';
import { BreadCrumbs, ListData } from 'src/app/models/main';
import { CoreService } from 'src/app/core/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'brain-list-medical-house',
  templateUrl: './list-medical-house.component.html',
  styleUrls: ['./list-medical-house.component.scss']
})
export class ListMedicalHouseComponent implements OnInit {

  private _api: Api<MedicalHouse>;
  public medicalHouse!: ListData<Array<MedicalHouse>>;
  public loading:boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista de casas medicas'
    }
  ]

  constructor(private _core: CoreService, private _route:Router) { 
    this._api = this._core.resource('MedicalHouse');
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      this.loading = true;
      this.medicalHouse = await this._api.find().toPromise();
    } catch (error) {
      
    } finally {
      this.loading = false;
    }
  }

  find(id: number) {
    this._route.navigate([`/inventory/medical-house/edit/${id}`]);
  }

}
