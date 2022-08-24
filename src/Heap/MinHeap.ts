import { HEAP_OVERFLOW_ERROR } from "./Exceptions/HeapOverflowError";

// TODO generic type MinHeap<T>
export class MinHeap {
  private readonly _heapArray: Array<number | null>;
  private readonly _dynamicHeapSize: boolean;
  private _size: number;

  // O(1)
  public get size(): number {
    return this._size;
  }

  // O(1)
  public get isFull(): boolean {
    if (this._dynamicHeapSize) {
      return false;
    }

    return this._heapArray.length === this.size;
  }

   // O(1)
   public get isEmpty(): boolean {
    return this.size === 0;
  }

  constructor();
  constructor(heapSize: number);
  constructor(heapSize?: number) {
    this._size = 0;

    // Static size of heap
    if (heapSize) {
      this._heapArray = new Array<number | null>(heapSize).fill(null);
      this._dynamicHeapSize = false;
    } 
    // Dynamic size of heap
    else {
      this._heapArray = new Array<number | null>();
      this._dynamicHeapSize = true;
    }
  }

  // O(log n)
  public insert(item: number): void {
    if (this.isFull) {
      throw HEAP_OVERFLOW_ERROR;
    }

    this._heapArray[this.size] = item;
    this._heapifyUp(this.size);
    this._size++;
  }

  // O(1)
  /**
   * Gets minimum element from MinHeap
   * or gets maximum element from MaxHeap.
   */
  public peek(): number | null {
    return this._heapArray[0];
  }

  // O(log n)
  /**
   * Remove minimum element from MinHeap
   * or remove maximum element from MaxHeap.
   */
  public pop(): number | null {
    if (this.size <= 0) {
      return null;
    }

    if (this.size === 1) {
      const root = this._heapArray[0];

      this._heapArray[0] = null;
      this._size--;

      return root;
    }

    // Store the minimum value,
    // and remove it from heap
    const root  = this._heapArray[0];

    this._heapArray[0] = this._heapArray[this.size - 1]
    this._heapArray[this.size - 1] = null;
    this._size--;
    this._heapifyDown(0);

    return root;
  }

  // O(log n)
  /**
   * This function deletes key at the given index.
   * 
   * ---------------
   * 
   * Replace the key to be deleted with minum infinite by calling decreaseToMin().
   * After decreaseToMin(), the minus infinite value must reach root,
   * so we call extractMin() to remove the key.
   */
  public delete(index: number): void {
    this._decreaseToMin(index);
    this.pop();
  }

  // O(n)
  public findIndex(predicate: (item: number | null) => boolean): number {
    return this._heapArray.findIndex(predicate);
  }

  // O(n)
  public toString(): string {
    const joined = this._heapArray.reduce(
      (str, value) => str += value !== null ? value + ',' : '',
      ''
    );

    if (joined.slice(-1) === ',') {
      return joined.slice(0, -1);
    }

    return joined;
  }

  // O(1)
  private _getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  // O(1)
  private _hasParent(childIndex: number): boolean {
    return this._getParentIndex(childIndex) >= 0;
  }

  // O(1)
  private _getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  // O(1)
  private _hasLeftChild(parentIndex: number): boolean {
    return this._getLeftChildIndex(parentIndex) < this._heapArray.length;
  }

  // O(1)
  private _getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  // O(1)
  private _hasRightChild(parentIndex: number): boolean {
    return this._getRightChildIndex(parentIndex) < this._heapArray.length;
  }

  // O(1)
  private _parent(childIndex: number): number | null {
    const parentIndex = this._getParentIndex(childIndex);
    return this._heapArray[parentIndex];
  }

  // O(log n)
  private _decreaseToMin(index: number): void {
    this._heapArray[index] = Number.MIN_SAFE_INTEGER;
    this._heapifyUp(index);
  }

  // O(1)
  private _swap(xIndex: number, yIndex: number): void {
    const tmp = this._heapArray[yIndex];
    this._heapArray[yIndex] = this._heapArray[xIndex];
    this._heapArray[xIndex] = tmp;
  }

  // O(log n)
  private _heapifyUp(index: number): void {
    let i = index;

    while (this._hasParent(i) && Number(this._heapArray[i]) < this._parent(i)!) {
      this._swap(i, this._getParentIndex(i));
      i = this._getParentIndex(i);
    }
  }

  // O(log n)
  /**
   * A recursive method to heapify a subtree with the root at given index.
   * This method assumes that the subtrees are already heapified.
   * @param index 
   */
  private _heapifyDown(index: number): void {
    const left = this._getLeftChildIndex(index);
    const right = this._getRightChildIndex(index);

    let smallest = index;

    if (left < this.size && Number(this._heapArray[left]) < Number(this._heapArray[smallest])) {
      smallest = left;
    }

    if (right < this.size && Number(this._heapArray[right]) < Number(this._heapArray[smallest])) {
      smallest = right;
    }

    if (smallest !== index) {
      this._swap(index, smallest);
      this._heapifyDown(smallest);
    }
  }
}

const heap = new MinHeap(6);

heap.isEmpty //?
heap.isFull //?

heap.insert(11);
heap.peek(); //?

heap.findIndex(x => x === 11) //?

heap.insert(3);
heap.peek(); //?

heap.insert(12);
heap.peek(); //?

heap.insert(10);
heap.peek(); //?

heap.findIndex(x => x === 11) //?

heap.isEmpty //?
heap.isFull //?

heap.insert(15);

heap.isEmpty //?
heap.isFull //?

heap //?
heap.toString() //?
heap.delete(2);
heap //?
heap.toString() //?
