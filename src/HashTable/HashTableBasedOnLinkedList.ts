import { LinkedList } from "../LinkedList/LinkedList";

function defaultHashFn<T extends { toString: () => string }>(key: T): number {
  return key.toString().split('').reduce((acc, char) => acc += char.charCodeAt(0), 0)
}

type NodeValue<K, V> = { 
  key: K;
  value: V;
}

type Bucket<K, V> = LinkedList<NodeValue<K, V>>;

type HashFn<K> = (key: K) => number;

// Used Separate Chaining to handle collision.
// Implements Load Factor and Rehashing.
export class HashTableBasedOnLinkedList<K, V> {
  // No. of pairs stored
  private _size = 0;
  
  // Size of the bucket array
  private _bucketSize: number;

  // The bucket array where
  // the nodes containing K-V pairs are stored
  private _buckets: Bucket<K, V>[];

  // Default loadFactor
  private readonly DEFAULT_LOAD_FACTOR = 0.75;

  private readonly _hashFn: HashFn<K>;

  public get size(): number {
    return this._size;
  }

  constructor(hashFn?: HashFn<K>) {
    this._bucketSize = 5;
    this._buckets = new Array(this._bucketSize).fill(new LinkedList<NodeValue<K, V>>());

    this._hashFn = hashFn ?? defaultHashFn;
  }

  public set(key: K, value: V): void {
    const bucketIndex = this._getBucketIndex(key);

    const existed = this._buckets[bucketIndex].find((x) => x.value.key === key);

    if (existed) {
      existed.value.value = value;
      return;
    }

    this._buckets[bucketIndex].prepend({ key, value });
    this._size++;

    const loadFactor = this._size / this._bucketSize;

    if (loadFactor > this.DEFAULT_LOAD_FACTOR) {
      this._rehash();
    }
  }

  public get(key: K): V | null {
    //Get actual index of the key
    const actualIndex = this._getBucketIndex(key);
    
    return this._buckets[actualIndex]
      ?.find((x) => x.value.key === key)
      ?.value.value 
      ?? null;
  }

  public delete(key: K): boolean {
    //Get actual index of the key
    const actualIndex = this._getBucketIndex(key);
    const node = this._buckets[actualIndex].find((x) => x.value.key === key);

    if (node) {
      this._buckets[actualIndex].delete(node.value);
      this._size--;
      return true;
    }

    return false;
  }

  private _getBucketIndex(key: K): number {
    const hashCode = this._hashFn(key);

    // array index = hashCode%numBuckets
    return hashCode % this._bucketSize;
  }

  private _rehash(): void {
    const temp = this._buckets;

    // New bucketList of double the old size is created
    this._buckets = new Array(2 * this._bucketSize).fill(new LinkedList<NodeValue<K, V>>());

    // Now size is made zero
    // and we loop through all the nodes in the original bucket list(temp)
    // and insert it into the new list
    this._size = 0;
    this._bucketSize *= 2;

    for( let i = 0; i < temp.length; i++) {
      temp[i].traverse((x) => {
        const key = x.value.key;
        const val = x.value.value;

        this.set(key, val);
      });
    }
  }
}