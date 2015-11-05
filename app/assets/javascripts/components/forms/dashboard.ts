import { FORM_DIRECTIVES, Component, View, Input, ViewChild }     from 'angular2/angular2'
import { RouterOutlet, RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { DataService, DataAction } from '../../services/data'
import { Form }                    from '../../models/form'

class DashboardRouterView {
}

@Component({
  selector: 'show.form'
})

@View({
  directives: [FORM_DIRECTIVES],

  template: `
    <h1>Show Form ({{form}})</h1>
  `
})

class Show extends DashboardRouterView {
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

class Edit extends DashboardRouterView {
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
  @ViewChild(RouterOutlet) routerOutlet: RouterOutlet;

  form: Form;

  constructor(_params: RouteParams, private _data: DataService) {
    let store = this._data.store<Form>("forms")

    store.on(DataAction.Change, (snapshot) => {
      if (snapshot.data().has(_params.get('formId'))) {
        this.form = snapshot.data().get(_params.get('formId'));
      } else {

      }
    });

    store.on(DataAction.Update, (snapshot) => {
      if (snapshot.data().has(_params.get('formId'))) {
        this.form = snapshot.data().get(_params.get('formId'));
      }
    });
  }

  afterViewInit() {
    console.log(this.routerOutlet);
  }
}
