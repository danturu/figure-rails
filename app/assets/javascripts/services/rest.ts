import { Injectable } from 'angular2/angular2';
import { Http }       from 'angular2/http';

@Injectable()
export class RestService {
  static version = "api/v1"

  constructor(private http: Http) {
  }
}
