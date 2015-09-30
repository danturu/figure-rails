import { CORE_DIRECTIVES, Component, View, Pipe, PipeTransform } from 'angular2/angular2'
import { ROUTER_DIRECTIVES, Location }                           from 'angular2/router'

interface Form {
  id:   string;
  name: string;
}

@Pipe({
  name: 'sort'
})

class SortPipe implements PipeTransform {
  transform(value: Form[], args: any[] = null): Form[] {
    return value.sort(function(lhs: Form, rhs: Form): number {
      if (lhs.name < rhs.name) return -1;
      if (lhs.name > rhs.name) return  1;

      return 0
    })
  }
}

@Component({
  selector: 'header'
})

@View({
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: [SortPipe],

  template: `
    <a [router-link]="['/New']" class="logo"><i></i></a>

    <nav class="forms">
      <ul>
        <li *ng-for="#form of forms | sort">
          <a [router-link]="['/Dashboard', { id: form.id }]">{{ form.name }}</a>
        </li>

        <li>
          <a class="new" [router-link]="['/New']">► New Form</a>
        </li>
      </ul>
    </nav>

    <nav class="account">
      <ul>
        <li>
          <a href="/logout" (click)="logout($event)">Logout</a>
        </li>
      </ul>
    </nav>
  `
})

export class Header {
  forms: Form[];

  constructor() {
    this.forms = [
      { id: "3", name: "Form 3" },
      { id: "1", name: "Form 1" },
      { id: "2", name: "Form 2" },
    ]
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    window.location.replace("/logout");
  }
}
