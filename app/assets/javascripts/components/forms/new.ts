import { CORE_DIRECTIVES, FORM_DIRECTIVES, Component, View, FormBuilder, ControlGroup, Validators } from 'angular2/angular2'

import { DataService }     from '../../services/data'
import { FormAttrs, Form } from '../../models/form'

@Component({
  selector: 'new.form'
})

@View({
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],

  template: `
    <header class="new">
      <h1>New Form</h1>
      <p>Smart name matters</p>
    </header>

    <form #f="form" [ng-form-model]="newForm" (submit)="onSubmit(f.value)">
      <div>
        <label class="name">
          <div>Name</div>
          <input type="text" ng-control="name">
        </label>
      </div>

      <div>
        <button type="submit" [disabled]="!f.valid">Create Form</form>
      </div>
    </form>
  `
})

export class New {
  newForm: ControlGroup;

  constructor(builder: FormBuilder, private data: DataService) {
    this.newForm = builder.group({
      name: ["", Validators.required]
    });
  }

  onSubmit(form: FormAttrs) {
    this.data.store<Form>("forms").create(new Form(form));
  }
}
