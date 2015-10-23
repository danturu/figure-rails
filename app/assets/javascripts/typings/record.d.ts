declare module Immutable {
  export module Record {
    type Generic<T> = T & TypedMap<T>;

    interface TypedMap<T> extends Map<string, any> {
      set(key: string, value: any): Generic<T>
    }

    interface Factory<T> {
      new ():          Generic<T>;
      new (values: T): Generic<T>;
      ():              Generic<T>;
      (values: T):     Generic<T>;
    }
  }

  export function Record<T>(defaultValues: T, name?: string): Record.Factory<T>;
}
