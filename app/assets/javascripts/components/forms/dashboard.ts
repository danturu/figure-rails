import { FORM_DIRECTIVES, Component, View }            from 'angular2/angular2'
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
  selector: 'show.form'
})

@View({
  directives: [FORM_DIRECTIVES],

  template: `
    <h1>Show Form</h1>
  `
})

class Show {
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
}

@Component({
  selector: 'dashboard.form'
})

@RouteConfig([
  { path: '/',      component: Show,  as: "Show" },
  { path: '/edit',  component: Edit,  as: "Edit" },
])

@View({
  directives: [ROUTER_DIRECTIVES],

  template: `
    <h1>header form</h1>

    <nav class="form">
      <ul>
        <li class="show"><a [router-link]="['./Show']">Show</a></li>
        <li class="edit"><a [router-link]="['./Edit']">Edit</a></li>
      </ul>
    </nav>

    <container>
      <router-outlet></router-outlet>
    </container>
  `
})

export class Dashboard {
}
