export class PriorityItem<T> {
	private _value: T;
	private _priority: number;

  public get value(): T {
    return this._value;
  }

  public get priority(): number {
    return this._priority;
  }

  public constructor(value: T, priority: number) {
    this._value = value;
    this._priority = priority;
  }
}