import { BaseHeap } from "./BaseHeap";

export class MaxHeap extends BaseHeap {
  protected readonly EXTREMUM = Number.MAX_SAFE_INTEGER;

  protected compareElements(first: number, second: number): boolean {
    return first > second;
  }
}