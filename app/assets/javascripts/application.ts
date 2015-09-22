/// <reference path='typings/tsd.d.ts' />
/// <reference path="typings/window.d.ts" />

import 'reflect-metadata'

import { Component, View, bootstrap } from "angular2/angular2";

@Component({
  selector: 'figure'
})

@View({
  template: '<h1>Hello {{ name }}</h1>'
})

class Figure {
  name: string;

  constructor() {
    this.name = 'Figure';
  }
}

window.bootstrapFigure = function() {
  bootstrap(Figure);
}
