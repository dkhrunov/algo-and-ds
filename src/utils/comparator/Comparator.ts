import { IComparator } from "./Comparator.interface";
import { CompareFn } from "./Compare-fn.type";

export class Comparator<T> implements IComparator<T> {
  private _compareFn: CompareFn<T>;

  constructor(compareFn: CompareFn<T> = Comparator.defaultCompareFn) {
    this._compareFn = compareFn;
  }

  public static defaultCompareFn<T>(a: T, b: T): -1 | 0 | 1 {
    if (a === b) return 0;

    if (a < b) return -1;

    return 1;
  }

  public equal(a: T, b: T): boolean {
    return this._compareFn(a, b) === 0;
  }

  public lessThan(a: T, b: T): boolean {
    return this._compareFn(a, b) < 0;
  }

  public greaterThan(a: T, b: T): boolean {
    return this._compareFn(a, b) > 0;
  }

  public lessThanOrEqual(a: T, b: T): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  public greaterThanOrEqual(a: T, b: T): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  public invert(): void {
    const compareOriginal = this._compareFn;
    this._compareFn = (a, b) => compareOriginal(b, a);
  }
}