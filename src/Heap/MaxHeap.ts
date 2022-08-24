import { BaseHeap } from "./BaseHeap";

export class MaxHeap extends BaseHeap {
  protected toExtremum(index: number): void {
    this.setValue(index, Number.MAX_SAFE_INTEGER);
  }

  protected compareElements(first: number, second: number): boolean {
    return first > second;
  }
}

const heap = new MaxHeap();

heap.isEmpty //?
heap.isFull //?

heap.insert(11);
heap.toString() //?

heap.findIndex(x => x === 11) //?

heap.insert(3);
heap.toString() //?

heap.insert(12);
heap.toString() //?

heap.insert(10);
heap.toString() //?

heap.findIndex(x => x === 11) //?

heap.isEmpty //?
heap.isFull //?

heap.insert(15);
heap.toString() //?

heap.isEmpty //?
heap.isFull //?

heap.toString() //?
heap.delete(2);
heap.toString() //?
heap.delete(0);
heap.toString() //?


heap.toString() //?
heap.poll(); //?
heap.toString() //?
heap.poll(); //?
heap.toString() //?
heap.poll(); //?
heap.toString() //?
heap.isEmpty //?
heap.poll(); //?
heap.toString() //?