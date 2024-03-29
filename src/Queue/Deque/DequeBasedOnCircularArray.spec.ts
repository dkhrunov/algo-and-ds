import { QUEUE_UNDERFLOW_ERROR } from "../Exceptions/QueueUnderflowError";
import { QUEUE_OVERFLOW_ERROR } from "../Exceptions/QueueOverflowError";
import { DequeBasedOnCircularArray } from "./DequeBasedOnCircularArray";

describe(DequeBasedOnCircularArray, () => {
  let deque: DequeBasedOnCircularArray<number>;

  beforeEach(() => {
    deque = new DequeBasedOnCircularArray<number>(5);
  });

  describe('#isEmpty', () => {
    it('should check if deque is  empty', () => {
      expect(deque.isEmpty).toBeTruthy();

      deque.addFirst(1);

      expect(deque.isEmpty).toBeFalsy();
    });
  });

  describe('#isFull', () => {
    it('should check if deque is full when all elements are added to the end', () => {
      expect(deque.isFull).toBeFalsy();

      deque.addLast(1);
      deque.addLast(2);
      deque.addLast(3);
      deque.addLast(4);
      deque.addLast(5);

      // =================
      // | Visialisation |
      // =================
      // [1, 2, 3, 4, 5]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2, 3, 4, 5]
      // front = 0
      // rear = 4

      expect(deque.isFull).toBeTruthy();
    });

    it('should check if deque is full when front and rear pointers are side by side', () => {
      expect(deque.isFull).toBeFalsy();

      deque.addFirst(1);
      deque.addFirst(2);
      deque.addFirst(3);
      deque.addLast(4);
      deque.addLast(5);

      // =================
      // | Visialisation |
      // =================
      // [3, 2, 1, 4, 5]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 4, 5, 3, 2]
      // front = 3
      // rear = 2

      expect(deque.isFull).toBeTruthy();
    });
  });

  describe('#first', () => {
    it('should peek first element', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addFirst(0);
      deque.addLast(3);

      // =================
      // | Visialisation |
      // =================
      // [0, 1, 2, 3]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2, 3, -, 0]
      // front = 4
      // rear = 2

      expect(deque.first).toBe(0);

      deque.removeFirst();

      // =================
      // | Visialisation |
      // =================
      // [1, 2, 3]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2, 3, -, 0]
      // front = 0
      // rear = 2

      expect(deque.first).toBe(1);

      deque.removeLast();

      // =================
      // | Visialisation |
      // =================
      // [1, 2]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2, 3, -, 0]
      // front = 0
      // rear = 1

      expect(deque.first).toBe(1);

      deque.removeFirst();

      // =================
      // | Visialisation |
      // =================
      // [2]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2, 3, -, 0]
      // front = 1
      // rear = 1

      expect(deque.first).toBe(2);

      deque.removeFirst();

      // =================
      // | Visialisation |
      // =================
      // []
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2, 3, -, 0]
      // front = -1
      // rear = -1

      expect(() => deque.first).toThrowError(QUEUE_UNDERFLOW_ERROR);
    });
  });

  describe('#last', () => {
    it('should peek first element', () => {
      deque.addFirst(1);
      deque.addFirst(2);
      deque.addLast(0);
      deque.addFirst(3);

      // =================
      // | Visialisation |
      // =================
      // [3, 2, 1, 0]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 0, -, 3, 2]
      // front = 3
      // rear = 1

      expect(deque.last).toBe(0);

      deque.removeLast();

      // =================
      // | Visialisation |
      // =================
      // [3, 2, 1]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 0, -, 3, 2]
      // front = 3
      // rear = 0

      expect(deque.last).toBe(1);

      deque.removeFirst();

      // =================
      // | Visialisation |
      // =================
      // [2, 1]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 0, -, 3, 2]
      // front = 4
      // rear = 0

      expect(deque.last).toBe(1);

      deque.removeLast();

      // =================
      // | Visialisation |
      // =================
      // [2]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 0, -, 3, 2]
      // front = 4
      // rear = 4

      expect(deque.last).toBe(2);

      deque.removeFirst();

      // =================
      // | Visialisation |
      // =================
      // []
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 0, -, 3, 2]
      // front = -1
      // rear = -1

      expect(() => deque.last).toThrowError(QUEUE_UNDERFLOW_ERROR);
    });
  });

  describe('#addFirst', () => {
    it("should throw an error when the deque is full", () => {
      deque.addFirst(1);
      deque.addFirst(2);
      deque.addFirst(3);
      deque.addLast(4);
      deque.addLast(5);

      // =================
      // | Visialisation |
      // =================
      // [3, 2, 1, 4, 5]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 4, 5, 3, 2]
      // front = 3
      // rear = 2

      expect(() => deque.addFirst(6)).toThrowError(QUEUE_OVERFLOW_ERROR);
    });

    it('should add element to the front', () => {
      deque.addFirst(1);

      // =================
      // | Visialisation |
      // =================
      // [1]
      //
      // || ------------ ||
      //
      // Inner:
      // [1]
      // front = 0
      // rear = 0

      expect(deque.first).toBe(1);

      deque.addFirst(2);

      // =================
      // | Visialisation |
      // =================
      // [2, 1]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, -, -, -, 2]
      // front = 4
      // rear = 0

      expect(deque.first).toBe(2);

      deque.addLast(3);

      // =================
      // | Visialisation |
      // =================
      // [2, 1, 3]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 3, -, -, 2]
      // front = 4
      // rear = 1

      expect(deque.first).toBe(2);
    });

    it('should close the queue from the front', () => {
      deque.addFirst(1);
      deque.addFirst(2);
      deque.addFirst(3);
      deque.addFirst(4);
      deque.addFirst(5);

      // =================
      // | Visialisation |
      // =================
      // [5, 4, 3, 2, 1]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 5, 4, 3, 2]
      // front = 1
      // rear = 0

      deque.removeLast();

      // =================
      // | Visialisation |
      // =================
      // [5, 4, 3, 2]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 5, 4, 3, 2]
      // front = 1
      // rear = 4

      deque.addFirst(6);

      // =================
      // | Visialisation |
      // =================
      // [6, 5, 4, 3, 2]
      //
      // || ------------ ||
      //
      // Inner:
      // [6, 5, 4, 3, 2]
      // front = 0
      // rear = 4

      expect(deque.removeFirst()).toBe(6);
      expect(deque.removeFirst()).toBe(5);
      expect(deque.removeFirst()).toBe(4);
      expect(deque.removeFirst()).toBe(3);
      expect(deque.removeFirst()).toBe(2);
    });

    it('should increment counter', () => {
      expect(deque.count).toBe(0);
      
      deque.addFirst(1);

      expect(deque.count).toBe(1);
      
      deque.addFirst(2);

      expect(deque.count).toBe(2);
    });
  });

  describe('#addLast', () => {
    it("should throw an error when the deque is full", () => {
      deque.addLast(3);
      deque.addLast(4);
      deque.addLast(5);
      deque.addFirst(2);
      deque.addFirst(1);

      // =================
      // | Visialisation |
      // =================
      // [1, 2, 3, 4, 5]
      //
      // || ------------ ||
      //
      // Inner:
      // [3, 4, 5, 1, 2]
      // front = 3
      // rear = 2

      expect(() => deque.addLast(6)).toThrowError(QUEUE_OVERFLOW_ERROR);
    });

    it('should add element to the end', () => {
      deque.addLast(1);

      // =================
      // | Visialisation |
      // =================
      // [1] 
      //
      // || ------------ ||
      //
      // Inner:
      // [1]
      // front = 0
      // rear = 0

      expect(deque.last).toBe(1);

      deque.addLast(2);

      // =================
      // | Visialisation |
      // =================
      // [1, 2]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2]
      // front = 0
      // rear = 1

      expect(deque.last).toBe(2);

      deque.addFirst(3);

      // =================
      // | Visialisation |
      // =================
      // [3, 1, 2]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2, -, -, 3]
      // front = 4
      // rear = 1

      expect(deque.last).toBe(2);
    });

    it('should close the queue from the end', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addLast(3);
      deque.addLast(4);
      deque.addLast(5);

      // =================
      // | Visialisation |
      // =================
      // [1, 2, 3, 4, 5]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2, 3, 4, 5]
      // front = 0
      // rear = 4

      deque.removeFirst();

      // =================
      // | Visialisation |
      // =================
      // [2, 3, 4, 5]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2, 3, 4, 5]
      // front = 1
      // rear = 4

      deque.addLast(6);

      // =================
      // | Visialisation |
      // =================
      // [2, 3, 4, 5, 6]
      //
      // || ------------ ||
      //
      // Inner:
      // [6, 2, 3, 4, 5]
      // front = 1
      // rear = 0

      expect(deque.removeFirst()).toBe(2);
      expect(deque.removeFirst()).toBe(3);
      expect(deque.removeFirst()).toBe(4);
      expect(deque.removeFirst()).toBe(5);
      expect(deque.removeFirst()).toBe(6);
    });

    it('should increment counter', () => {
      expect(deque.count).toBe(0);
      
      deque.addLast(1);

      expect(deque.count).toBe(1);
      
      deque.addLast(2);

      expect(deque.count).toBe(2);
    });
  });

  describe('#removeFirst', () => {
    it("should throw an error when the deque is empty", () => {
      expect(() => deque.removeFirst()).toThrowError(QUEUE_UNDERFLOW_ERROR);
    });

    it('should add element to the front', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addFirst(0);
      deque.addLast(3);

      // =================
      // | Visialisation |
      // =================
      // [0, 1, 2, 3]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2, 3, -, 0]
      // front = 4
      // rear = 2

      expect(deque.removeFirst()).toBe(0);
      expect(deque.removeFirst()).toBe(1);
      expect(deque.removeFirst()).toBe(2);
      expect(deque.removeFirst()).toBe(3);
    });

    it('should decrement counter', () => {
      expect(deque.count).toBe(0);
      
      deque.addLast(1);
      deque.addLast(2);

      expect(deque.count).toBe(2);

      deque.removeFirst();

      expect(deque.count).toBe(1);

      deque.removeFirst();
      
      expect(deque.count).toBe(0);
    });
  });

  describe('#removeLast', () => {
    it("should throw an error when the deque is empty", () => {
      expect(() => deque.removeLast()).toThrowError(QUEUE_UNDERFLOW_ERROR);
    });

    it('should add element to the front', () => {
      deque.addFirst(1);
      deque.addFirst(2);
      deque.addLast(0);
      deque.addFirst(3);

      // =================
      // | Visialisation |
      // =================
      // [3, 2, 1, 0]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 0, -, 3, 2]
      // front = 3
      // rear = 1

      expect(deque.removeLast()).toBe(0);
      expect(deque.removeLast()).toBe(1);
      expect(deque.removeLast()).toBe(2);
      expect(deque.removeLast()).toBe(3);
    });

    it('should decrement counter', () => {
      expect(deque.count).toBe(0);
      
      deque.addLast(1);
      deque.addLast(2);

      expect(deque.count).toBe(2);

      deque.removeLast();

      expect(deque.count).toBe(1);

      deque.removeLast();
      
      expect(deque.count).toBe(0);
    });
  });

  describe('Stack implementation', () => {
    it('should implements LIFO rule', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addLast(3);
      deque.addLast(4);

      expect(deque.removeLast()).toBe(4);
      expect(deque.removeLast()).toBe(3);
      expect(deque.removeLast()).toBe(2);
      expect(deque.removeLast()).toBe(1);
    });
  });

  describe('Queue implementation', () => {
    it('should implements FIFO rule', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addLast(3);
      deque.addLast(4);

      expect(deque.removeFirst()).toBe(1);
      expect(deque.removeFirst()).toBe(2);
      expect(deque.removeFirst()).toBe(3);
      expect(deque.removeFirst()).toBe(4);
    });
  });

  describe('#clear', () => {
    it('should clear the deque', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addFirst(0);
      deque.addLast(3);

      // =================
      // | Visialisation |
      // =================
      // [0, 1, 2, 3]
      //
      // || ------------ ||
      //
      // Inner:
      // [1, 2, 3, -, 0]
      // front = 4
      // rear = 2

      expect(deque.isEmpty).toBeFalsy();

      deque.clear();

      // =================
      // | Visialisation |
      // =================
      // []
      //
      // || ------------ ||
      //
      // Inner:
      // [-, -, -, -, -]
      // front = -1
      // rear = 0

      expect(deque.isEmpty).toBeTruthy();
    });
  });
});