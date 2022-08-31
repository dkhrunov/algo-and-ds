import { Heap } from "../Heap";

export class MinHeap extends Heap {
  protected readonly EXTREMUM = Number.MIN_SAFE_INTEGER;

  protected compareElements(first: number, second: number): boolean {
    return first < second;
  }
}