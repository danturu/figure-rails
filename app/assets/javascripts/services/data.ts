import { Injectable, EventEmitter } from 'angular2/angular2'
import { Map, List, Record }        from 'immutable'

// Errors.

abstract class BaseException extends Error {
  public stack: any;

  constructor(public message: string = "--") {
    super(message);

    this.stack = (<any>new Error(message)).stack;
  }

  toString(): string {
    return this.message;
  }
}

export class DataCreateException extends BaseException { }

export class DataUpdateException extends BaseException { }

export class DataRemoveException extends BaseException { }

// Interfaces.

export interface BaseAttrs {
  id?: string;
}

export interface TimestampAttrs extends BaseAttrs {
  createdAt?: string;
  updatedAt?: string;
}

// Types.

export type BaseRecord = BaseAttrs & Record.Base;

export enum DataAction { Change, Create, Update, Remove }

// Services.

export class DataSnapshot<T extends BaseRecord> {
  constructor(private _data: Map<string, T>) {
  }

  data(): Map<string, T> {
    return this._data;
  }
}

@Injectable()
export class DataStore<T extends BaseRecord> {
  private _storage = Map<string, T>();

  private _actions = Map<DataAction, EventEmitter>([
    [DataAction.Change, new EventEmitter()],
    [DataAction.Create, new EventEmitter()],
    [DataAction.Update, new EventEmitter()],
    [DataAction.Remove, new EventEmitter()],
  ]);

  get(): DataSnapshot<T> {
    return new DataSnapshot(this._storage);
  }

  set(data: Map<string, T>, merge: boolean = false) {
    if (merge) {
      this._storage = this._storage.merge(data);
    } else {
      this._storage = data
    }

    this.emit(DataAction.Change);
  }

  has(data: T | string): boolean {
    let key = this.key(data);

    return key && this._storage.has(key);
  }

  create(data: T) {
    if (this.has(data)) {
      throw new DataCreateException();
    } else {
      this._storage = this._storage.set(data.id, data);

      this.emit(DataAction.Create, new DataSnapshot(Map<string, T>([[data.id, data]])));
      this.emit(DataAction.Change);
    }
  }

  update(data: T) {
    if (this.has(data)) {
      this._storage = this._storage.set(data.id, data);

      this.emit(DataAction.Update, new DataSnapshot(Map<string, T>([[data.id, data]])));
      this.emit(DataAction.Change);
    } else {
      throw new DataUpdateException();
    }
  }

  remove(id: string | T) {
    let data = this._storage.get(this.key(id));

    if (this.has(data)) {
      this._storage = this._storage.delete(data.id);

      this.emit(DataAction.Remove, new DataSnapshot(Map<string, T>([[data.id, data]])));
      this.emit(DataAction.Change);
    } else {
      throw new DataRemoveException();
    }
  }

  on(action: DataAction, next: (snapshot: DataSnapshot<T>) => void) {
    if (action === DataAction.Change) {
      next(this.get());
    }

    return this._actions.get(action).observer({ next: next });
  }

  private emit(action: DataAction, snapshot: DataSnapshot<T> = new DataSnapshot(this._storage)) {
    this._actions.get(action).next(snapshot);
  }

  private key(data: T | string): string {
    return typeof data === "string" ? data : data.id;
  }
}

@Injectable()
export class DataService {
  stores = Map<string, DataStore<any>>();

  store<T extends BaseRecord>(key: string): DataStore<T> {
    if (!this.stores.has(key)) {
      this.stores = this.stores.set(key, new DataStore<T>());
    }

    return this.stores.get(key);
  }
}
