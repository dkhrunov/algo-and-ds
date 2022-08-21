// Used Separate Chaining to handle collision.
// Implements Load Factor and Rehashing.

export class HashTableNode<K, V> {
  protected _key: K;
  protected _value: V;
  protected _next: HashTableNode<K, V> | null;

  public get key(): K {
    return this._key;
  }

  public get value(): V {
    return this._value;
  }

  public set value(value: V) {
    this._value = value;
  }

  public get next(): HashTableNode<K, V> | null {
    return this._next;
  }

  public set next(node: HashTableNode<K, V> | null) {
    this._next = node;
  }

  public constructor(key: K, value: V, next: HashTableNode<K, V> | null = null) {
    this._key = key;
    this._value = value;
    this._next = next;
  }
}
