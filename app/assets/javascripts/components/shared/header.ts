import { CORE_DIRECTIVES, Component, View, Input, Pipe, PipeTransform, ChangeDetectionStrategy } from 'angular2/angular2'
import { ROUTER_DIRECTIVES, Location }                                                           from 'angular2/router'
import { List }                                                                                  from 'immutable'

import { Form } from 'models/form'

@Pipe({
  name: 'sort'
})

class SortPipe implements PipeTransform {
  transform(value: List<Form>, args: any[] = null): List<Form> {
    if (List.isList(value)) {
      let comparator = (lhs: Form, rhs: Form): number => {
        if (lhs.name < rhs.name) return -1;
        if (lhs.name > rhs.name) return  1;

        return 0
      }

      return value.sort(comparator).toList();
    } else {
      return value;
    }
  }
}

@Component({
  selector: 'header',
  changeDetection: ChangeDetectionStrategy.OnPush
})

@View({
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: [SortPipe],

  template: `
    <a [router-link]="['/NewForm']" class="logo"><i></i></a>

    <nav class="forms">
      <ul>
        <li *ng-for="#form of forms | sort">
          <a [router-link]="['/FormDashboard', { formId: form.id }, 'Show']">{{ form.name }}</a>
        </li>

        <li>
          <a class="new" [router-link]="['/NewForm']">► New Form</a>
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
  @Input() forms: List<Form>;

  logout(event: MouseEvent) {
    event.preventDefault(); window.location.replace("/logout");
  }
}
