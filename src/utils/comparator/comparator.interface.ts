export interface IComparator<T> {
  equal(a: T, b: T): boolean;
  lessThan(a: T, b: T): boolean;
  greaterThan(a: T, b: T): boolean;
  lessThanOrEqual(a: T, b: T): boolean;
  greaterThanOrEqual(a: T, b: T): boolean;
  invert(): void;
}