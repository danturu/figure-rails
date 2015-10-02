import { Injectable } from 'angular2/angular2';
import * as Rx        from 'rx'

export interface BaseAttrs {
  id: string;
}

export interface TimestampAttrs extends BaseAttrs {
  createdAt: string;
  updatedAt: string;
}

export abstract class BaseModel {
  id: string;

  constructor(data: BaseAttrs) {
    this.id = data.id;
  }
}

export abstract class TimestampModel extends BaseModel {
  createdAt: string;
  updatedAt: string;

  constructor(data: TimestampAttrs) {
    super(data);

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

@Injectable()
export class DataService {
  cache: { [key: string]: Rx.BehaviorSubject<TimestampModel | TimestampModel[]> } = {}

  put<T extends TimestampModel | TimestampModel[]>(key: string, data: T) {
    this.getStream(key).onNext(data);
  }

  get<T extends TimestampModel | TimestampModel[]>(key: string, data: (value: T) => void) {
    this.getStream(key).subscribe(data);
  }

  private getStream(key: string): Rx.BehaviorSubject<TimestampModel | TimestampModel[]> {
    if (key in this.cache) {
      return this.cache[key];
    } else {
      return this.cache[key] = new Rx.BehaviorSubject(null);
    }
  }
}
