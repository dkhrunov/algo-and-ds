import { BaseHeap } from "./BaseHeap";

export class MinHeap extends BaseHeap {
  protected toExtremum(index: number): void {
    this.setValue(index, Number.MIN_SAFE_INTEGER);
  }

  protected compareElements(first: number, second: number): boolean {
    return first < second;
  }
}

const heap = new MinHeap();

heap.isEmpty //?

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

heap.insert(15);

heap.isEmpty //?

heap.toString() //?
heap.delete(2);
heap.toString() //?
