import { HashTableNode } from "./HashTableNode";

function defaultHashFn<T extends { toString: () => string }>(key: T): number {
  return key.toString().split('').reduce((acc, char) => acc += char.charCodeAt(0), 0)
}

export class HashTable<K, V> {
  // No. of pairs stored
  private _size = 0;
  
  // Size of the bucket array
  private _bucketSize: number;

  // The bucket array where
  // the nodes containing K-V pairs are stored
  private _buckets: (HashTableNode<K, V> | null)[];

  // Default loadFactor
  private readonly DEFAULT_LOAD_FACTOR = 0.75;

  private readonly _hashFn: (key: K) => number;

  public get size(): number {
    return this._size;
  }

  constructor(hashFn?: (key: K) => number) {
    this._bucketSize = 5;
    this._buckets = new Array(this._bucketSize).fill(null);

    this._hashFn = hashFn ?? defaultHashFn;
  }

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

    // new node with the K and 
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
    const hashCode = this._hashFn(key);

    // array index = hashCode%numBuckets
    return hashCode % this._bucketSize;
  }

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