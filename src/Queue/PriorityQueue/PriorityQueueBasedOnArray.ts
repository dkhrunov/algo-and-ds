import { PriorityItem } from "./PriorityItem";

export class PriorityQueueBasedOnArray<T> {
  private readonly _queue: PriorityItem<T>[] = [];
  
  private _size = -1;

  public get isEmpty(): boolean { return this._size < 0}

  // O(1)
  public enqueue(item: T, priority: number): void {
    this._size++;
    this._queue[this._size] = new PriorityItem<T>(item, priority);
  }

  // O(n)
  public dequeue(): T {
    const index = this._getIndexOfHighest();
    const value = this._queue[index].value;
    
    for (let i = index; i < this._size; i++) {
      this._queue[i] = this._queue[i + 1];
    }

    this._size--;

    return value;
  }

  // O(n)
  public peek(): T | null {
    const index = this._getIndexOfHighest();
    
    if (index === -1) return null;
    
    return this._queue[index].value;
  }

  // O(n)
  private _getIndexOfHighest(): number {
    let highestPriority = Number.MIN_SAFE_INTEGER;
    let index = -1;

    for (let i = 0; i < this._size + 1; i++) {
      const item = this._queue[i];

      if (highestPriority === item.priority && index > -1 && this._queue[index].value < item.value) {
        highestPriority = item.priority;
        index = i;
      }
      else if (highestPriority < item.priority) {
        highestPriority = item.priority;
        index = i;
      }
    }

    highestPriority;
    return index;
  }
}
