import { CORE_DIRECTIVES, FORM_DIRECTIVES, Component, View } from 'angular2/angular2'
import { Form, FormRecord }                                  from '../../models/form'

@Component({
  selector: 'new.form'
})

@View({
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],

  template: `
    <header class="new">
      <h1>New Form</h1>
      <p>Smart name matters</p>
    </header>

    <form #f="form" (ng-submit)="onSubmit(f.value)">
      <label>
        <div>Name</div>
        <input type="text" ng-control="name">
      </label>

      <label>
        <div>Notifications</div>
        <input type="text" ng-control="email">
      </label>

      <div>
        <button type="submit">Create Form</form>
      </div>
    </form>
  `
})

export class New {
  onSubmit(data: Form) {
    console.log(data);
  }
}
