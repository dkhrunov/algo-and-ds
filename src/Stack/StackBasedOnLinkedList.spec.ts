import { StackBasedOnLinkedList } from './StackBasedOnLinkedList';

describe(StackBasedOnLinkedList, () => {
  let stack: StackBasedOnLinkedList<number>;
  
  beforeEach(() => {
    stack = new StackBasedOnLinkedList<number>();
  });

  describe("#constructor", () => {
    it("should create an empty queue", () => {
      expect(stack.peek()).toBeNull();
      expect(stack.isEmpty).toBeTruthy();
    });
  });

  describe("#peek", () => {
    it("should return an element from the top of the stack", () => {
      stack.push(3);
      stack.push(2);
      stack.push(1);

      expect(stack.peek()).toBe(1);
      expect(stack.peek()).toBe(1);
      expect(stack.peek()).toBe(1);
      expect(stack.isEmpty).toBeFalsy();
    });
  });

  describe("#push", () => {
    it("should insert an element to the top", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.peek()).toBe(3);
      expect(stack.isEmpty).toBeFalsy();
    });
  });

  describe("#pop", () => {

    it("should return null if stack is empty", () => {
      expect(stack.pop()).toBeNull();
      expect(stack.isEmpty).toBeTruthy();
    });
    
    it("should remove an element from the top of the stack", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.pop()).toBe(3);
      expect(stack.isEmpty).toBeFalsy();
    });
  });
})