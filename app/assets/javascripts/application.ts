/// <reference path='typings/tsd.d.ts' />
/// <reference path='typings/window.d.ts' />

import 'core-js/es6/string';
import 'core-js/es6/symbol';
import 'reflect-metadata'
import 'zone.js'

// Decorators, Services

import { Component, View }            from 'angular2/angular2'
import { RouteConfig, RouterOutlet }  from 'angular2/router'

// Directives, Bindings

import { ROUTER_BINDINGS } from 'angular2/router'

// Components

import { Header as SharedHeaderComponent } from './components/shared/exports'

// Functions

import { bootstrap } from 'angular2/angular2'

@RouteConfig([
  // { path: '/app', component: SharedHeaderComponent, as: "component" }
])

@Component({
  selector: 'figure'
})

@View({
  directives: [RouterOutlet, SharedHeaderComponent],

  template: `
    <header class="app"></header>

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
