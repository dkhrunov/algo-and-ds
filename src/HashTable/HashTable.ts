import { HashFn, sumCharCodesHash } from "./HashFunctions";

export class HashTableNode<K extends string | number, V> {
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

// Used Separate Chaining to handle collision.
// Implements Load Factor and Rehashing.
export class HashTable<K extends string | number, V> {
  // No. of pairs stored
  private _size = 0;
  
  // Size of the bucket array
  private _bucketSize: number;

  // The bucket array where
  // the nodes containing K-V pairs are stored
  private _buckets: (HashTableNode<K, V> | null)[];

  // Default loadFactor
  private readonly DEFAULT_LOAD_FACTOR = 0.75;

  private readonly _hashFn: HashFn;

  // O(1)
  public get size(): number {
    return this._size;
  }

  constructor(hashFn?: HashFn) {
    this._bucketSize = 5;
    this._buckets = new Array(this._bucketSize).fill(null);

    this._hashFn = hashFn ?? sumCharCodesHash;
  }

  // O(1) + potentially time to find dup in chain + potentially time to rehashing (depends of LoadFactor)
  public set(key: K, value: V): void {
    const bucketIndex = this._getBucketIndex(key);

    // The first node at that index
    let head = this._buckets[bucketIndex];

    // First, loop through all the nodes present at that index
    // to check if the key already exists
    while (head) {
      // If already present the value is updated  
      if (head.key === key) {
        head.value = value;
        return;
      }
      head = head.next;
    }

    // new node with the K and value V
    const newNode = new HashTableNode(key, value);
    // The head node at the index
    head = this._buckets[bucketIndex];

    // tshe new node is inserted
    // by making it the head
    // and it's next is the previous head
    newNode.next = head;

    this._buckets[bucketIndex] = newNode;

    this._size++;

    const loadFactor = this._size / this._bucketSize;

    if (loadFactor > this.DEFAULT_LOAD_FACTOR) {
      this._rehash();
    }
  }

  // O(1) + potentially time to find elem in chain (depends on the number of collisions)
  public get(key: K): V | null {
    //Get actual index of the key
    const actualIndex = this._getBucketIndex(key);

    let head = this._buckets[actualIndex];

    // Search for key in list
    while(head){
      if(head.key == key) {
        return head.value;
      }

      head = head.next;
    }
    
    return null;
  }

  // O(1) + potentially time to find elem in chain (depends on the number of collisions)
  public delete(key: K): boolean {
    //Get actual index of the key
    const actualIndex = this._getBucketIndex(key);
    const head = this._buckets[actualIndex];

    if (head && head.key === key) {
      this._buckets[actualIndex] = head.next;
      this._size--;

      return true;
    }

    let current = head;
    while (current && current.next) {
      if (current.next.key === key) {
        current.next = current.next.next;
        this._size--;

        return true;
      } else {
        current = current.next;
      }
		}

    return false;
  }

  private _getBucketIndex(key: K): number {
    return this._hashFn(key, this._bucketSize);
  }

  // O(n)
  private _rehash(): void {
    const temp = this._buckets;

    // New bucketList of double the old size is created
    this._buckets = new Array(2 * this._bucketSize).fill(null);

    // Now size is made zero
    // and we loop through all the nodes in the original bucket list(temp)
    // and insert it into the new list
    this._size = 0;
    this._bucketSize *= 2;

    for( let i = 0; i < temp.length; i++) {
      // head of the chain at that index
      let head = temp[i];

      while (head) {
        const key = head.key;
        const val = head.value;
        
        // calling the insert function for each node in temp
        // as the new list is now the bucketArray
        this.set(key, val);
        head = head.next;
      }
    }
  }
}