import { Component, View }   from 'angular2/angular2'
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
  selector: 'header.app'
})

@View({
  directives: [ROUTER_DIRECTIVES],

  template: `
    <nav class="account">
      <ul>
        <li class="new"><a [router-link]="['/Dashboard', { id: '123' }]">Setup Form</a></li>
        <li class="new"><a [router-link]="['/New']">New Form</a></li>
      </ul>
    </nav>
  `
})

export class Header {
}
