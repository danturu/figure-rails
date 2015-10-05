import { CORE_DIRECTIVES, Component, View, Pipe, PipeTransform} from 'angular2/angular2'
import { ROUTER_DIRECTIVES, Location }                          from 'angular2/router'

import { DataService } from '../../services/data'
import { Form }        from '../../models/form'

@Pipe({
  name: 'sort'
})

class SortPipe implements PipeTransform {
  transform(value: Form[], args: any[] = null): Form[] {
    if (Array.isArray(value)) {
      let predicate = (lhs: Form, rhs: Form): number => {
        if (lhs.name < rhs.name) return -1;
        if (lhs.name > rhs.name) return  1;

        return 0
      }

      return value.sort(predicate);
    } else {
      return value;
    }
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
          <a [router-link]="['/Dashboard', { id: form.id }, 'Show']">{{ form.name }}</a>
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

  constructor(private data: DataService) {
   this.forms = [
      { id: "1", name: "Form 1", createdAt: new Date().toString(), updatedAt: new Date().toString() },
      { id: "2", name: "Form 2", createdAt: new Date().toString(), updatedAt: new Date().toString() },
      { id: "3", name: "Form 3", createdAt: new Date().toString(), updatedAt: new Date().toString() },
    ]
  }

  logout(event: MouseEvent) {
    event.preventDefault(); window.location.replace("/logout");
  }
}
