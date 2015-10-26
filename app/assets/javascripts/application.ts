import { Component, View, bootstrap }                       from 'angular2/angular2'
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig } from 'angular2/router'
import { HTTP_PROVIDERS }                                   from 'angular2/http'
import { Map, List }                                        from 'immutable'

import { DataService, DataAction } from 'services/data'
import { RestService }             from 'services/rest'
import { Form, FormRecord }        from 'models/form'

import * as SharedComponent from 'components/shared/shared'
import * as FormComponent   from 'components/forms/forms'

@RouteConfig([
  { path: '/app/forms/new',         component: FormComponent.New,       as: "NewForm" },
  { path: '/app/forms/:formId/...', component: FormComponent.Dashboard, as: "FormDashboard" },
])

@Component({
  selector: 'app', providers: [DataService, RestService]
})

@View({
  directives: [ROUTER_DIRECTIVES, SharedComponent.Header],

  template: `
    <header [forms]="forms"></header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})

class Figure {
  forms: List<Form>;

  constructor(private rest: RestService, private data: DataService) {
    let store = data.store<Form>("forms")

    store.on(DataAction.Change, (snapshot) => {
      this.forms = snapshot.val().toList();
    });

    // Fake data.

    let date = new Date().toString();

    data.store("forms").set(Map<string, Form>([
      ["3", new FormRecord({ id: "3", name: "Form 3", createdAt: date, updatedAt: date })],
      ["1", new FormRecord({ id: "1", name: "Form 1", createdAt: date, updatedAt: date })],
      ["2", new FormRecord({ id: "2", name: "Form 2", createdAt: date, updatedAt: date })],
    ]))
  }
}

bootstrap(Figure, [ROUTER_PROVIDERS, HTTP_PROVIDERS])
