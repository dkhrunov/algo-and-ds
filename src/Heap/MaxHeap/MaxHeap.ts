import { Heap } from "../Heap";

export class MaxHeap extends Heap {
  protected readonly EXTREMUM = Number.MAX_SAFE_INTEGER;

  protected compareElements(first: number, second: number): boolean {
    return first > second;
  }
}