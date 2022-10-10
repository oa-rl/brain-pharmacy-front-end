import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { FormComponent } from 'src/app/core/form.component';
import { Api } from 'src/app/core/rest-api';
import { User } from 'src/app/models/customer.models';
import { BreadCrumbs, ListData, Profile } from 'src/app/models/main';

@Component({
  selector: 'brain-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.scss']
})
export class NewEditComponent extends FormComponent implements OnInit {

  private _api: Api<User>;
  private _apiProfile: Api<Profile>;
  private _id: number = 0;
  public loading: boolean = false;
  public listOfProfile!: ListData<Array<Profile>>
  public breadCrum: Array<BreadCrumbs> = [
    {
      name: 'Lista',
      path: '/user/list'
    },
    {
      name: 'Nuevo usuario',
    }
  ]
  
  constructor(private _core: CoreService, protected builder: UntypedFormBuilder, private route: ActivatedRoute, private _route:Router) { 
    super();
    this._api = this._core.resource('User');
    this._apiProfile = this._core.resource('Profile');
  }

  async ngOnInit() {
    this.initForm();
    this._id = Number((this.route.snapshot.paramMap.get('id') || 0)?.toString())!;
    await this.loadProfile();
    if(this._id !== 0) {
      await this.find();
      this.findObj(this.listOfProfile.data,'profileId','profile');
    }
  }

  async loadProfile() {
    this.listOfProfile = await this._apiProfile.find().toPromise();
    
  }

  async find() {
    this.loading = true;
      this._form.disable();
      this._core.savingOn();
      try {
        const data: User = await this._api.findById(this._id).toPromise();
        console.log(data);
        this._form.patchValue(data);
        this._form.enable();
      } catch (error) {
        
      } finally {
        this._core.savingOff();
        this.loading = false;
      }
  }

  private initForm() {
    this._form = this.builder.group({
      id: 0,
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      profile: [null, [Validators.required]],
      profileId: [null, [Validators.required]],
      
    });
  }


  async save(value: boolean) {
    if (value && this.formIsValid()) {
      try {
        const opt = (this._id === 0) ? 'insert' : 'update';
        await this._api[opt](this._form.value).toPromise();
        this.goBack();
        this.notifySuccess();
      } catch (error) {
        
      } finally {
        this._core.savingOff();
      }
    }
  }

  goBack() {
    this._route.navigate(['/user/list']);
  }


}
