import { FORM_DIRECTIVES, Component, View, Input }     from 'angular2/angular2'
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { DataService, DataAction } from '../../services/data'
import { Form, FormRecord }        from '../../models/form'

@Component({
  selector: 'show.form'
})

@View({
  directives: [FORM_DIRECTIVES],

  template: `
    <h1>Show Form ({{form}})</h1>
  `
})

class Show {
  @Input() form: Form;
}

@Component({
  selector: 'show.form'
})

@View({
  directives: [FORM_DIRECTIVES],

  template: `
    <h1>Edit Form</h1>
  `
})

class Edit {
  @Input() form: Form;
}

@Component({
  selector: 'dashboard.form'
})

@RouteConfig([
  { path: '/',     component: Show, as: "Show" },
  { path: '/edit', component: Edit, as: "Edit" },
])

@View({
  directives: [ROUTER_DIRECTIVES],

  template: `
    <h1>Form ({{form?.name}})</h1>

    <nav class="form">
      <ul>
        <li class="show"><a [router-link]="['./Show']">Show</a></li>
        <li class="edit"><a [router-link]="['./Edit']">Edit</a></li>
      </ul>
    </nav>

    <container>
      <router-outlet [form]="form"></router-outlet>
    </container>
  `
})

export class Dashboard {
  form: Form;

  constructor(params: RouteParams, data: DataService) {
    let store = data.store<Form>("forms")

    store.on(DataAction.Change, (snapshot) => {
      if (!this.form) {
        this.form = snapshot.val().get(params.get('formId'));
      }
    });

    store.on(DataAction.Update, (snapshot) => {
      this.form = snapshot.val().get(params.get('formId'));
    });
  }
}
