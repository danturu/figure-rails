// Decorators, Services

import { Component, View }         from 'angular2/angular2'
import { RouterLink, RouteParams } from 'angular2/router';

@Component({
  selector: 'header.app'
})

@View({
  directives: [RouterLink],

  template: `
    sdc
    <nav class="account">
      <ul>
        <!-- <li><a [router-link]="['./']">/a></li> -->
      </ul>
    </nav>
  `
})

export class Header {
}
