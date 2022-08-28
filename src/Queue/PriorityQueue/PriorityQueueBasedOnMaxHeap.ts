import { MaxHeap } from "../../Heap/MaxHeap";
import { QUEUE_UNDERFLOW_ERROR } from "../Exceptions/QueueUnderflowError";

export class PriorityQueueBasedOnMaxHeap {
  private readonly _maxHeap = new MaxHeap();

  public get isEmpty(): boolean {
    return this._maxHeap.isEmpty;
  }

  // O(1)
  public peek(): number | null {
    return this._maxHeap.peek();
  }

  // O(log n)
  public enqueue(item: number): void {
    this._maxHeap.insert(item)
  }

  // O(log n)
  public dequeue(): number | null {
		if (this._maxHeap.isEmpty) {
      throw QUEUE_UNDERFLOW_ERROR;
    }
    
		return this._maxHeap.poll();
  }
}