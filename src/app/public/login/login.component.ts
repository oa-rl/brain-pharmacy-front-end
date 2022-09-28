import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { BreadCrumbs, ObjData } from 'src/app/models/main';
import { Login } from 'src/app/models/public.models';

@Component({
  selector: 'brain-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormComponent implements OnInit {

  private _api: Api<Login>;
  private _token!: ObjData<string>;
  public loading: boolean = false;
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Login',
    }
  ]

  constructor(private _core: CoreService, protected builder: UntypedFormBuilder, private route: ActivatedRoute, private _route:Router, private _storage: LocalStorageService) {
    super();
    this._api = this._core.resource('User');
    this._storage.remove('token');
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this._form = this.builder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  async save(value: boolean) {
    this.loading = true;
    if (value && this.formIsValid()) {
      try {
       this._token = (await this._api.insert(this._form.value,'login').toPromise() as unknown) as ObjData<string>;
        this._storage.set('token',this._token.data);
        this._core.isLogged = true;
        this._route.navigate(['/sale/new']);
      } catch (error) {
        this._core.isLogged = false;
      } finally {
        this.loading = false;
      }
    }
  }

}
