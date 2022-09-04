import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    template: ''
})
export abstract class FormComponent {
    protected _form: any;


    get form(): FormGroup {
        return this._form;
    }

    @Input() set form(form: FormGroup) {
        this._form = form;
    }
}