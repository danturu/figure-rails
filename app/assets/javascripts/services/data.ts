import { Injectable, EventEmitter } from 'angular2/angular2'
import { Map, List, Record }        from 'immutable'

// Errors

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

// Interfaces

export interface BaseAttrs {
  id?: string;
}

export interface TimestampAttrs extends BaseAttrs {
  createdAt?: string;
  updatedAt?: string;
}

// Services

export class DataSnapshot<T extends Record.Generic<BaseAttrs>> {
  constructor(private data: Map<string, T>) {
  }

  val(): Map<string, T> {
    return this.data;
  }
}

export enum DataAction { Change, Create, Update, Remove }

@Injectable()
export class DataStore<T extends Record.Generic<BaseAttrs>> {
  private data = Map<string, T>();

  private actions = Map<DataAction, EventEmitter>([
    [DataAction.Change, new EventEmitter()],
    [DataAction.Create, new EventEmitter()],
    [DataAction.Update, new EventEmitter()],
    [DataAction.Remove, new EventEmitter()],
  ]);

  get(): DataSnapshot<T> {
    return new DataSnapshot(this.data);
  }

  set(data: Map<string, T>, merge: boolean = false) {
    if (merge) {
      this.data = this.data.merge(data);
    } else {
      this.data = data
    }

    this.emit(DataAction.Change);
  }

  has(model: T | string): boolean {
    return this.data.has(this.key(model));
  }

  create(model: T) {
    if (this.has(model)) {
      throw new DataCreateException();
    } else {
      this.data = this.data.set(model.id, model);

      this.emit(DataAction.Remove, new DataSnapshot(Map<string, T>([[model.id, model]])));
      this.emit(DataAction.Change);
    }
  }

  update(model: T) {
    if (this.has(model)) {
      this.data = this.data.set(model.id, model);

      this.emit(DataAction.Remove, new DataSnapshot(Map<string, T>([[model.id, model]])));
      this.emit(DataAction.Change);
    } else {
      throw new DataUpdateException();
    }
  }

  remove(id: string | T) {
    let model = this.data.get(this.key(id));

    if (this.has(model)) {
      this.data = this.data.delete(model.id);

      this.emit(DataAction.Remove, new DataSnapshot(Map<string, T>([[model.id, model]])));
      this.emit(DataAction.Change);
    } else {
      throw new DataRemoveException();
    }
  }

  on(action: DataAction, next: (snapshot: DataSnapshot<T>) => void) {
    if (action === DataAction.Change) {
      next(this.get());
    }

    return this.actions.get(action).observer({ next: next });
  }

  private emit(action: DataAction, data: DataSnapshot<T> = new DataSnapshot(this.data)) {
    this.actions.get(action).next(data);
  }

  private key(model: T | string): string {
    return typeof model === "string" ? model : (<T>model).id;
  }
}

@Injectable()
export class DataService {
  stores = Map<string, DataStore<any>>();

  store<T extends Record.Generic<BaseAttrs>>(key: string): DataStore<T> {
    if (!this.stores.has(key)) {
      this.stores = this.stores.set(key, new DataStore<T>());
    }

    return this.stores.get(key);
  }
}
