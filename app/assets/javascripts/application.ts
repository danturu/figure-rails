/// <reference path='typings/tsd.d.ts' />
/// <reference path='typings/window.d.ts' />

import 'core-js/es6/string'
import 'core-js/es6/symbol'
import 'core-js/es6/object'
import 'reflect-metadata'
import 'zone.js'

import { Component, View, bootstrap }                     from 'angular2/angular2'
import { ROUTER_DIRECTIVES, routerBindings, RouteConfig } from 'angular2/router'
import { HTTP_BINDINGS }                                  from 'angular2/http'

import { DataService } from './services/data'
import { RestService } from './services/rest'

import * as SharedComponent from './components/shared/shared'
import * as FormComponent   from './components/forms/forms'

@RouteConfig([
  { path: '/app/forms/new',     component: FormComponent.New,       as: "New" },
  { path: '/app/forms/:id/...', component: FormComponent.Dashboard, as: "Dashboard" },
])

@Component({
  selector: 'app', bindings: [DataService, RestService]
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
   constructor(private rest: RestService, private data: DataService) {
   }
}

window.main = function() {
  bootstrap(Figure, [routerBindings(Figure), HTTP_BINDINGS]).catch(err => console.error(err));
}
