import { BaseHeap } from "../BaseHeap";

export class MinHeap extends BaseHeap {
  protected readonly EXTREMUM = Number.MIN_SAFE_INTEGER;

  protected compareElements(first: number, second: number): boolean {
    return first < second;
  }
}