import { Component, View }   from 'angular2/angular2'
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
  selector: 'edit.form'
})

@View({
  directives: [ROUTER_DIRECTIVES],

  template: `
    <h1>Edit Form</h1>
  `
})

export class Edit {
}
