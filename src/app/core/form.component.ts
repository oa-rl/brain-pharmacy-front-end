import { Component, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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


    get form(): FormGroup {
        return this._form;
    }

    @Input() set form(form: FormGroup) {
        this._form = form;
    }
}