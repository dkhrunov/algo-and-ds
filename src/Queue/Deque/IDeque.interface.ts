export interface IDeque<T> {
  readonly count: number;
  readonly isEmpty: boolean;
  readonly first: T;
  readonly last: T;
  addFirst(value: T): void;
  addLast(value: T): void;
  removeFirst(): T;
  removeLast(): T;
  push(value: T): void;
  pop(): void;
  clear(): void;
}