import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { Api } from 'src/app/core/rest-api';
import { Company } from 'src/app/models/company';
import { ListData } from 'src/app/models/main';

@Component({
  selector: 'brain-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private _api: Api<Company>;
  public companies!: ListData<Array<Company>>;

  constructor(private _core: CoreService) { 
    this._api = this._core.resource('Company');
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.companies = await this._api.find().toPromise();
  }

}
