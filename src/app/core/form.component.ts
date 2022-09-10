import { Component, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { find, isUndefined } from "lodash";

@Component({
    template: ''
})
export abstract class FormComponent {
    protected _form: any;

    inputHasError(name: string): boolean {  
        const form: FormControl  = this._form.get(name);
        if(form.pristine && !form.touched) {
            return false;
        } else {
            return (form.status === 'INVALID') ? true : false;
        }
    }

    formIsValid(): boolean {
        return (this._form.status === 'INVALID') ? false : true;
    }

    notifySuccess() {
        Notify.success('Guardado', {}, { backOverlayColor: '#4cda64' });
    }

    setValue(file: string, list:Array<any>, name:string = 'name', id: string = 'id') {
        const data: string = this._form.value[file];
        const isString: boolean = isNaN(parseInt(data));
        const key: string = isString ? name : id;
        const parseData: string | number = isString ? data : parseInt(data);
        const found: any = find(list, { [key]: parseData });
        if (!isUndefined(found)) {
          this._form.patchValue({ productId: found.id });
          if (!isString) {
            this._form.patchValue({ product: found.name });
          }
        } else {
          this._form.patchValue({ product: null });
          this._form.patchValue({ productId: null });
        }
      }
    
      cancel(opt: boolean) {
        if (opt) {
          this._form.reset();
        }
      }


    get form(): FormGroup {
        return this._form;
    }

    @Input() set form(form: FormGroup) {
        this._form = form;
    }
}