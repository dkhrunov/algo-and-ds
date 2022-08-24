import { MinHeap } from './MinHeap';

describe(MinHeap, () => {
  let heap: MinHeap;
  
  beforeEach(() => {
    heap = new MinHeap(5);
  });

	describe("#constructor", () => {
    it("should create an HashTable", () => {
      expect(heap.size).toBe(0);
    });
  });
});