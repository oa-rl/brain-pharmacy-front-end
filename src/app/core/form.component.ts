import { Component, Input } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { find, isUndefined } from "lodash";

@Component({
    template: ''
})
export abstract class FormComponent {
    protected _form: any;

    inputHasError(name: string): boolean {  
        const form: UntypedFormControl  = this._form.get(name);
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

    setValue(file: string, fileId: string, list:Array<any>, name:string = 'name', id: string = 'id') {
        const data: string = this._form.value[file];
        console.log(data);
        const isString: boolean = isNaN(parseInt(data));
        const key: string = isString ? name : id;
        const parseData: string | number = isString ? data : parseInt(data);
        const found: any = find(list, { [key]: parseData });
        if (!isUndefined(found)) {
          this._form.patchValue({ [fileId]: found.id });
          if (!isString) {
            this._form.patchValue({ [file]: found.name });
          }
        } else {
          this._form.patchValue({ [file]: null });
          this._form.patchValue({ [fileId]: null });
        }
        console.log(this._form.value)
      }

      
  findObj(list:Array<any>, formId: string, set:string , id:string = "id" ) {
    const name: string = find(list, {[id] : this._form.value[formId]})?.name || '';
    this._form.patchValue({[set]: name});
  }

    
      cancel(opt: boolean) {
        if (opt) {
          this._form.reset();
        }
      }


    get form(): UntypedFormGroup {
        return this._form;
    }

    @Input() set form(form: UntypedFormGroup) {
        this._form = form;
    }
}