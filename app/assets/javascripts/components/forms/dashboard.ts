// Decorators, Services

import { Component, View }                             from 'angular2/angular2'
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { Setup } from './setup'
import { Edit }  from './edit'

@Component({
  selector: 'dashboard.form'
})

@RouteConfig([
  { path: '/', redirectTo: './Setup' }, // Should work once 2.0.0-alpha.38 released (https://github.com/angular/angular/issues/4170).
  { path: '/setup', component: Setup, as: "Setup" },
  { path: '/edit',  component: Edit,  as: "Edit" },
])

@View({
  directives: [ROUTER_DIRECTIVES],

  template: `
    <h1>header form</h1>

    <nav class="form">
      <ul>
        <li class="setup"><a [router-link]="['./Setup']">Setup</a></li>
        <li class="setup"><a [router-link]="['./Edit']">Edit</a></li>
      </ul>
    </nav>

    <container>
      <router-outlet></router-outlet>
    </container>
  `
})

export class Dashboard {
}
