import { Injectable } from 'angular2/angular2';

export interface BaseAttrs {
  id?: string;
}

export interface TimestampAttrs extends BaseAttrs {
  createdAt?: string;
  updatedAt?: string;
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

// @Injectable()
// export class DataService2 {
//   private cache: { [key: string]: BaseModel[] }
//
//   get(key: string): BaseModel[] {
//     return this.cache[key] || (this.cache[key] = [])
//   }
//
//   set(key: string, data: BaseModel[]) {
//     this.cache[key] = data;
//   }
//
//   //find(key: string, id: string): BaseModel {
//   //  return (<BaseModel[]>this.get(key)).find(m => m.id === id)
//   //}
//
//   insert(key: string, model: BaseModel) {
//     this.get(key).push(model);
//   }
//
//   update(key: string, model: BaseModel) {
//     Object.assign(this.get(key).find(m => m.id === model.id), model);
//   }
//
//   remove(key: string, model: BaseModel) {
//     this.get(key).splice(this.get(key).findIndex(m => m.id === model.id), 1);
//   }
// }

@Injectable()
export class DataService {
  // cache: { [key: string]: Rx.BehaviorSubject<TimestampModel | TimestampModel[]> } = {}

  // put<T extends TimestampModel | TimestampModel[]>(key: string, data: T) {
  //   this.getStream(key).onNext(data);
  // }

  // get<T extends TimestampModel | TimestampModel[]>(key: string, data: (value: T) => void) {
  //   this.getStream(key).subscribe(data);
  // }

  // private getStream(key: string): Rx.BehaviorSubject<TimestampModel | TimestampModel[]> {
  //   if (key in this.cache) {
  //     return this.cache[key];
  //   } else {
  //     return this.cache[key] = new Rx.BehaviorSubject(null);
  //   }
  // }
}
