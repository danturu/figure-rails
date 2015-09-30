/// <reference path='typings/tsd.d.ts' />
/// <reference path='typings/window.d.ts' />

import 'core-js/es6/string'
import 'core-js/es6/symbol'
import 'reflect-metadata'
import 'zone.js'

import { Component, View, bootstrap  }                     from 'angular2/angular2'
import { ROUTER_DIRECTIVES, ROUTER_BINDINGS, RouteConfig } from 'angular2/router'
import { HTTP_BINDINGS }                                   from 'angular2/http'

import * as SharedComponent from './components/shared/exports'
import * as FormComponent   from './components/forms/exports'

@RouteConfig([
  { path: '/app/forms/new',     component: FormComponent.New,       as: "New" },
  { path: '/app/forms/:id/...', component: FormComponent.Dashboard, as: "Dashboard" }
])

@Component({
  selector: 'app'
})

@View({
  directives: [ROUTER_DIRECTIVES, SharedComponent.Header],

  template: `
    <header></header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})

class Figure {
  constructor() {
  }
}

window.main = function() {
  bootstrap(Figure, [ROUTER_BINDINGS, HTTP_BINDINGS]).catch(err => console.error(err));
}
