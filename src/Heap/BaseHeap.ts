export type HeapOptions = { heapSize?: number };

export abstract class BaseHeap {
  protected abstract readonly EXTREMUM: number;

  private readonly _heapArray: Array<number>;

  // O(1)
  public get size(): number {
    return this._heapArray.length;
  }

   // O(1)
   public get isEmpty(): boolean {
    return this.size === 0;
  }

  // if has values then O(n log n), else O(1)
  constructor(values?: number[]) {
    this._heapArray = new Array<number>();
    
    if (values && values.length > 0) {
      values.forEach(v => this.insert(v));
    }
  }

  // O(log n)
  public insert(item: number): void {
    this._heapArray[this.size] = item;
    this.heapifyUp(this.size - 1);
  }

  // O(1)
  /**
   * Gets minimum element from MinHeap
   * or gets maximum element from MaxHeap.
   */
  public peek(): number | null {
    if (this._heapArray.length === 0) {
      return null;
    }

    return this._heapArray[0];
  }

  // O(log n)
  /**
   * Remove minimum element from MinHeap,
   * or remove maximum element from MaxHeap.
   */
  public poll(): number | null {
    if (this.size <= 0) {
      return null;
    }

    if (this.size === 1) {
      return this._heapArray.pop()!;
    }

    // Store the minimum value,
    // and remove it from heap
    const root  = this._heapArray[0];

    this._heapArray[0] = this._heapArray.pop()!
    this.heapifyDown(0);

    return root;
  }

  // O(log n)
  /**
   * This function deletes key at the given index.
   * 
   * ---------------
   * 
   * Replace the key to be deleted with extremum value by calling ```toExtremum()```
   * (for MinHeap to minus infinite value, but for MaxHeap to max infinite value).
   * 
   * After ```toExtremum()```, the extremum value must reach root,
   * so we call ```heapifyUp()``` and remove the root element by calling ```poll()```.
   */
  public delete(index: number): void {
    if (index <= this.size - 1) {
      this.toExtremum(index);
      this.heapifyUp(index);
      this.poll();
    }
  }

  // O(n)
  public findIndex(predicate: (item: number | null) => boolean): number {
    return this._heapArray.findIndex(predicate);
  }

  // O(n)
  public findAllIndices(predicate: (item: number | null) => boolean): number[] {
    const result = [];

    for (let i = 0; i < this._heapArray.length; i++) {
      const element = this._heapArray[i];

      if (predicate(element)) {
        result.push(i)
      }
    }

    return result;
  }

  // O(n)
  public toString(): string {
    if (this.isEmpty) {
      return '';
    }

    const joined = this._heapArray.reduce(
      (str, value) => str += value + ',',
      ''
    );

    return joined.slice(0, -1);
  }

  // O(log n)
  /**
   * Should brings a value to minus infinite value for MinHeap,
   * and brings a value to max infinite value for MaxHeap,
   * @param index 
   */
  protected toExtremum(index: number): void {
    this.setValue(index, this.EXTREMUM);
  }

  // O(1)
  /**
   * Used in heapifyDown and heapifyUp functions to compare values.
   * 
   * --------------
   * 
   * For MinHeap first element must be less than second,
   * and the opposite for MaxHeap.
   * 
   * @param first 
   * @param second 
   */
  protected abstract compareElements(first: number, second: number): boolean;

  // O(1)
  protected setValue(index: number, value: number): void {
    this._heapArray[index] = value;
  }

  // O(1)
  protected getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  // O(1)
  protected hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0;
  }

  // O(1)
  protected getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  // O(1)
  // protected hasLeftChild(parentIndex: number): boolean {
  //   return this.getLeftChildIndex(parentIndex) < this._heapArray.length;
  // }

  // O(1)
  protected getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  // O(1)
  // protected hasRightChild(parentIndex: number): boolean {
  //   return this.getRightChildIndex(parentIndex) < this._heapArray.length;
  // }

  // O(1)
  protected parent(childIndex: number): number | null {
    const parentIndex = this.getParentIndex(childIndex);
    return this._heapArray[parentIndex];
  }

  // O(1)
  protected swap(xIndex: number, yIndex: number): void {
    const tmp = this._heapArray[yIndex];
    this._heapArray[yIndex] = this._heapArray[xIndex];
    this._heapArray[xIndex] = tmp;
  }

  // O(log n)
  protected heapifyUp(index: number): void {
    let i = index; //?

    while (this.hasParent(i) && this.compareElements(this._heapArray[i], this.parent(i)!)) {
      this.swap(i, this.getParentIndex(i));
      i = this.getParentIndex(i);
    }
  }

  // O(log n)
  /**
   * A recursive method to heapify a subtree with the root at given index.
   * This method assumes that the subtrees are already heapified.
   * 
   * @param index
   */
  protected heapifyDown(index: number): void {
    const left = this.getLeftChildIndex(index);
    const right = this.getRightChildIndex(index);

    let extremumIndex = index;

    if (left < this.size && this.compareElements(this._heapArray[left], this._heapArray[extremumIndex])) {
      extremumIndex = left;
    }

    if (right < this.size && this.compareElements(this._heapArray[right], this._heapArray[extremumIndex])) {
      extremumIndex = right;
    }

    if (extremumIndex !== index) {
      this.swap(index, extremumIndex);
      this.heapifyDown(extremumIndex);
    }
  }
}