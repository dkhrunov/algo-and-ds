import { MaxHeap } from './MaxHeap';

describe(MaxHeap, () => {
  let heap: MaxHeap;
  
  beforeEach(() => {
    heap = new MaxHeap();
  });

	describe("#constructor", () => {
    it("should create an HashTable", () => {
      expect(heap.size).toBe(0);
    });
  });
});