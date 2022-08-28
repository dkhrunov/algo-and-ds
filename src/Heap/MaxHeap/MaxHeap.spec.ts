import { MaxHeap } from './MaxHeap';

describe(MaxHeap, () => {
  let heap: MaxHeap;
  
  beforeEach(() => {
    heap = new MaxHeap();
  });

	it("should create a empty MaxHeap", () => {
    expect(heap).toBeDefined();
    expect(heap.size).toBe(0);
    expect(heap.isEmpty).toBeTruthy();
    expect(heap.peek()).toBeNull();
    expect(heap.poll()).toBeNull();
    expect(heap.toString()).toBe('');
  });

  it("should create a MaxHeap from array", () => {
    const values = [11, 3, 12, 10, 15, 10, 1];
    const heap = new MaxHeap(values);

    expect(heap.size).toBe(values.length);
    expect(heap.isEmpty).toBeFalsy();
    expect(heap.peek()).toBe(15);
    expect(heap.toString()).toBe('15,12,11,3,10,10,1');
  });

	it("should add items and heapify it up", () => {
    heap.insert(11);
    expect(heap.size).toBe(1);
    expect(heap.isEmpty).toBeFalsy();
    expect(heap.peek()).toBe(11);
    expect(heap.toString()).toBe('11');

    heap.insert(3);
    expect(heap.size).toBe(2);
    expect(heap.peek()).toBe(11);
    expect(heap.toString()).toBe('11,3');

    heap.insert(12);
    expect(heap.size).toBe(3);
    expect(heap.peek()).toBe(12);
    expect(heap.toString()).toBe('12,3,11');

    heap.insert(10);
    expect(heap.size).toBe(4);
    expect(heap.peek()).toBe(12);
    expect(heap.toString()).toBe('12,10,11,3');

    heap.insert(15);
    expect(heap.size).toBe(5);
    expect(heap.peek()).toBe(15);
    expect(heap.toString()).toBe('15,12,11,3,10');

    heap.insert(10);
    expect(heap.size).toBe(6);
    expect(heap.peek()).toBe(15);
    expect(heap.toString()).toBe('15,12,11,3,10,10');

    heap.insert(1);
    expect(heap.size).toBe(7);
    expect(heap.peek()).toBe(15);
    expect(heap.toString()).toBe('15,12,11,3,10,10,1');
  });

  it("should poll items from the heap and heapify it down", () => {
    heap.insert(11);
    heap.insert(3);
    heap.insert(12);
    heap.insert(10);
    heap.insert(15);
    heap.insert(10);
    heap.insert(1);

    expect(heap.toString()).toBe('15,12,11,3,10,10,1');

    expect(heap.poll()).toBe(15);
    expect(heap.toString()).toBe('12,10,11,3,1,10');
    expect(heap.size).toBe(6);

    expect(heap.poll()).toBe(12);
    expect(heap.toString()).toBe('11,10,10,3,1');
    expect(heap.size).toBe(5);

    expect(heap.poll()).toBe(11);
    expect(heap.toString()).toBe('10,3,10,1');
    expect(heap.size).toBe(4);

    expect(heap.poll()).toBe(10);
    expect(heap.toString()).toBe('10,3,1');
    expect(heap.size).toBe(3);

    expect(heap.poll()).toBe(10);
    expect(heap.toString()).toBe('3,1');
    expect(heap.size).toBe(2);

    expect(heap.poll()).toBe(3);
    expect(heap.toString()).toBe('1');
    expect(heap.size).toBe(1);

    expect(heap.poll()).toBe(1);
    expect(heap.toString()).toBe('');
    expect(heap.size).toBe(0);
    expect(heap.isEmpty).toBeTruthy();

    expect(heap.poll()).toBeNull();
    expect(heap.toString()).toBe('');
    expect(heap.size).toBe(0);
    expect(heap.isEmpty).toBeTruthy();
  });

  it('should be possible to find item indices in heap', () => {
    const heap = new MaxHeap([11, 3, 12, 10, 12]);

    expect(heap.toString()).toBe('12,12,11,3,10');

    expect(heap.findIndex((x) => x === 12)).toBe(0);
    expect(heap.findIndex((x) => x === 11)).toBe(2);
    expect(heap.findIndex((x) => x === 99)).toBe(-1);
    
    expect(heap.findAllIndices((x) => x === 12)).toEqual([0, 1]);
    expect(heap.findAllIndices((x) => x === 11)).toEqual([2]);
    expect(heap.findAllIndices((x) => x === 99)).toEqual([]);
  });

  it('should be possible to remove items from heap with heapify up', () => {
    heap.insert(11);
    heap.insert(3);
    heap.insert(12);
    heap.insert(10);
    heap.insert(15);
    heap.insert(10);
    heap.insert(1);
    expect(heap.toString()).toBe('15,12,11,3,10,10,1');
    expect(heap.size).toBe(7);

    heap.delete(999999);
    expect(heap.toString()).toBe('15,12,11,3,10,10,1');
    expect(heap.size).toBe(7);

    heap.delete(5);
    expect(heap.toString()).toBe('15,12,11,3,10,1');
    expect(heap.size).toBe(6);

    heap.delete(3);
    expect(heap.toString()).toBe('15,12,11,1,10');
    expect(heap.size).toBe(5);

    heap.delete(4);
    expect(heap.toString()).toBe('15,12,11,1');
    expect(heap.size).toBe(4);

    heap.delete(2);
    expect(heap.toString()).toBe('15,12,1');
    expect(heap.size).toBe(3);

    heap.delete(1);
    expect(heap.toString()).toBe('15,1');
    expect(heap.size).toBe(2);

    heap.delete(1);
    expect(heap.toString()).toBe('15');
    expect(heap.size).toBe(1);

    heap.delete(0);
    expect(heap.toString()).toBe('');
    expect(heap.size).toBe(0);
    expect(heap.isEmpty).toBeTruthy();
  });
});