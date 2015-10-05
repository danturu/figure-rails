import { Injectable }  from 'angular2/angular2';
import { Http }        from 'angular2/http';
import { DataService } from './data'

@Injectable()
export class RestService {
  static version = "api/v1"

  constructor(private http: Http, private data: DataService) {
  }
}
