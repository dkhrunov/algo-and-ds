import { Node } from "../Node/Node";
import { LinkedList } from "./LinkedList";

describe(LinkedList, () => {
  describe("#constructor", () => {
    describe("without values", () => {
      it("should create the empty linked list", () => {
        const list = new LinkedList<number>();
  
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
        expect(list.isEmpty).toBeTruthy();
        expect(list.length).toBe(0);
      });
    });
  
    describe("with array of values", () => {
      it("should create the linked list from this values", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
  
        expect(list.head?.value).toBe(1);
        expect(list.tail?.value).toBe(4);
        expect(list.isEmpty).toBeFalsy();
        expect(list.length).toBe(4);
      });
    });
  });
  
  describe("#getByIndex", () => {
    const list = new LinkedList<number>([1, 2, 3, 4]);
  
    describe("with index less than 0", () => {
      it("it returns null", () => {
        expect(list.getByIndex(-1)).toBeNull();
      });
    });
  
    describe("with index greater than list length", () => {
      it("it returns null", () => {
        expect(list.getByIndex(5)).toBeNull();
      });
    });
  
    describe("with index 0", () => {
      it("it return the head", () => {
        expect(list.getByIndex(0)).toBe(list.head?.value);
      });
    });
  
    describe("with index in the middle", () => {
      it("it return the element in that index", () => {
        expect(list.getByIndex(2)).toBe(3);
      });
    });
  });
  
  describe("#append", () => {
    it("it adds the element to the ending of the list", () => {
      const list = new LinkedList<number>();
      list.append(1);
      const oldTail = list.tail;
      list.append(2);
  
      expect(list.head?.value).toBe(1);
      expect(list.head).toBe(oldTail);
      expect(list.tail?.value).toBe(2);
      expect(list.length).toBe(2);
    });
  });
  
  describe("#prepend", () => {
    it("it adds the element to the beginning of the list", () => {
      const list = new LinkedList<number>();
      list.prepend(1);
      const oldHead = list.head;
      list.prepend(2);
  
      expect(list.head?.value).toBe(2);
      expect(list.head?.next).toBe(oldHead);
      expect(list.tail?.value).toBe(1);
      expect(list.length).toBe(2);
    });
  });
  
  describe("#appendByIndex", () => {
    describe("with index less than 0", () => {
      it("it dont append the element", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        list.appendByIndex(-1, 0);
  
        expect(list.length).toBe(4);
      });
    });
  
    describe("with index greater than list length", () => {
      it("it dont append the element", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        list.appendByIndex(5, 6);
  
        expect(list.length).toBe(4);
      });
    });
  
    describe("with index 0", () => {
      it("it append in the head", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        list.appendByIndex(0, 22);
  
        expect(list.head?.value).toBe(22);
        expect(list.head?.next?.value).toBe(1);
        expect(list.length).toBe(5);
      });
    });
  
    describe("with index equal the list length", () => {
      it("it append in the tail", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        const oldTail = list.tail;
  
        list.appendByIndex(3, 5);
  
        expect(list.tail?.value).toBe(5);
        expect(oldTail?.next?.value).toBe(5);
        expect(list.length).toBe(5);
      });
    });
  
    describe("with index in the middle", () => {
      it("it append the element in that index", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        const INDEX = 2;
        const oldNodeByIndex = list.find((elem, i) => i === INDEX);
  
        list.appendByIndex(INDEX, 12);
  
        const newNodeByIndex = list.find((elem, i) => i === INDEX);
  
        expect(oldNodeByIndex?.next?.value).toBe(4);
        expect(list.find((elem, i) => i === INDEX)?.value).toBe(12);
        expect(newNodeByIndex?.next).toEqual(oldNodeByIndex);
        expect(list.length).toBe(5);
      });
    });
  });
  
  describe("#deleteHead", () => {
    let list: LinkedList<number>;
  
    beforeEach(() => {
      list = new LinkedList<number>();
    });
  
    it("should return null when empty", () => {
      expect(list.deleteHead()).toBeNull();
    });
  
    it("should return null when empty", () => {
      list.append(1);
      list.append(2);
      list.append(3);
  
      expect(list.deleteHead()).toBe(1);
    });
  
    it("should reset linked list, when head is last item", () => {
      list.append(3);
  
      expect(list.deleteHead()).toBe(3);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.isEmpty).toBeTruthy();
      expect(list.length).toBe(0);
    });
  });
  
  describe("#delete", () => {
    describe("with an empty linked list", () => {
      it("it dont delete elements", () => {
        const list = new LinkedList<number>();
        list.delete(1);
  
        expect(list.length).toBe(0);
      });
    });
  
    describe("with value in the head", () => {
      it("it delete values from the head", () => {
        const list = new LinkedList<number>([1, 1, 1, 1, 2, 3, 4]);
        list.delete(1);
  
        expect(list.head?.value).toBe(2);
        expect(list.length).toBe(3);
      });
    });
  
    describe("with values in the middle", () => {
      it("it delete values from the middle", () => {
        const list = new LinkedList<number>([1, 2, 3, 3, 3, 4]);
        list.delete(3);
  
        expect(list.length).toBe(3);
      });
    });
  
    describe("with values in the tail", () => {
      it("it delete values from the tail", () => {
        const list = new LinkedList<number>([1, 2, 3, 4, 4, 4]);
        list.delete(4);
  
        expect(list.tail?.value).toBe(3);
        expect(list.length).toBe(3);
      });
    });
  });
  
  describe("#deleteByIndex", () => {
    describe("with an empty linked list", () => {
      it("it dont delete the element", () => {
        const list = new LinkedList<number>();
        list.deleteByIndex(0);
  
        expect(list.length).toBe(0);
      });
    });
  
    describe("with index less than 0", () => {
      it("it dont delete the element", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        list.deleteByIndex(-1);
  
        expect(list.length).toBe(4);
      });
    });
  
    describe("with index greater than list length", () => {
      it("it dont delete the element", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        list.deleteByIndex(4);
  
        expect(list.length).toBe(4);
      });
    });
  
    describe("with index 0", () => {
      it("it delete in the head", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        list.deleteByIndex(0);
  
        expect(list.head?.value).toBe(2);
        expect(list.head?.next?.value).toBe(3);
        expect(list.length).toBe(3);
      });
    });
  
    describe("with index equal the list length", () => {
      it("it delete in the tail", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        list.deleteByIndex(3);
  
        expect(list.tail?.value).toBe(3);
        expect(list.length).toBe(3);
      });
    });
  
    describe("with index in the middle", () => {
      it("it delete the element in that index", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        const INDEX = 2;
        const oldNodeByIndex = list.find((elem, i) => i === INDEX);
  
        list.deleteByIndex(INDEX);
  
        const newNodeByIndex = list.find((elem, i) => i === INDEX);
  
        expect(oldNodeByIndex?.value).not.toBe(newNodeByIndex?.value);
        expect(oldNodeByIndex?.next).toEqual(newNodeByIndex);
        expect(newNodeByIndex?.value).toBe(4);
        expect(list.length).toBe(3);
      });
    });
  });
  
  describe("#clear", () => {
    it("it clear the linked list", () => {
      const list = new LinkedList<number>([1, 2, 3, 4]);
      list.clear();
  
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.length).toBe(0);
    });
  });
  
  describe("#find", () => {
    describe("#predicate", () => {
      describe("with an empty linked list", () => {
        it("it should be called 0 times", () => {
          const list = new LinkedList<number>();
          const predicateMock = jest.fn((node: Node<number>, index?: number) => node.value === 5);
          list.find(predicateMock);
  
          expect(predicateMock).toHaveBeenCalledTimes(0);
        });
      });
  
      describe("with non-existing value", () => {
        it("it should be called as many times as there are elements in the linked list", () => {
          const values = [1, 2, 3, 4];
          const list = new LinkedList<number>(values);
          const predicateMock = jest.fn((node: Node<number>, index?: number) => node.value === 33);
          list.find(predicateMock);
  
          for (let i = 0; i < list.length; i++) {
            expect(predicateMock.mock.calls[i][0].value).toBe(values[i]);
            expect(predicateMock.mock.calls[i][1]).toBe(i);
          }
  
          expect(predicateMock).toHaveBeenCalledTimes(4);
        });
      });
  
      describe("with existing value", () => {
        it("it should be called until a matching element is found", () => {
          const values = [1, 2, 3, 4];
          const list = new LinkedList<number>(values);
          const predicateMock = jest.fn((node: Node<number>, index?: number) => node.value === 3);
          list.find(predicateMock);
  
          for (let i = 0; i < 3; i++) {
            expect(predicateMock.mock.calls[i][0].value).toBe(values[i]);
            expect(predicateMock.mock.calls[i][1]).toBe(i);
          }
  
          expect(predicateMock).toHaveBeenCalledTimes(3);
        });
      });
  
      describe("with index less than 0", () => {
        it("it should be called as many times as there are elements in the linked list", () => {
          const values = [1, 2, 3, 4];
          const list = new LinkedList<number>(values);
          const predicateMock = jest.fn((node: Node<number>, index?: number) => index === -1);
          list.find(predicateMock);
  
          for (let i = 0; i < list.length; i++) {
            expect(predicateMock.mock.calls[i][0].value).toBe(values[i]);
            expect(predicateMock.mock.calls[i][1]).toBe(i);
          }
  
          expect(predicateMock).toHaveBeenCalledTimes(4);
        });
      });
  
      describe("with index greater than list length", () => {
        it("it should be called as many times as there are elements in the linked list", () => {
          const values = [1, 2, 3, 4];
          const list = new LinkedList<number>(values);
          const predicateMock = jest.fn((node: Node<number>, index?: number) => index === 9);
          list.find(predicateMock);
  
          for (let i = 0; i < list.length; i++) {
            expect(predicateMock.mock.calls[i][0].value).toBe(values[i]);
            expect(predicateMock.mock.calls[i][1]).toBe(i);
          }
  
          expect(predicateMock).toHaveBeenCalledTimes(4);
        });
      });
  
      describe("with index in the middle", () => {
        it("it find the node at that index", () => {
          const values = [1, 2, 3, 4];
          const list = new LinkedList<number>(values);
          const predicateMock = jest.fn((node: Node<number>, index?: number) => index === 2);
          list.find(predicateMock);
  
          for (let i = 0; i < 3; i++) {
            expect(predicateMock.mock.calls[i][0].value).toBe(values[i]);
            expect(predicateMock.mock.calls[i][1]).toBe(i);
          }
  
          expect(predicateMock).toHaveBeenCalledTimes(3);
        });
      });
    });
  
    describe("with an empty linked list", () => {
      it("it return null", () => {
        const list = new LinkedList<number>();
        const found = list.find(item => item.value === 5);
  
        expect(found).toBeNull();
      })
    });
  
    describe("with predicate with non-existing value", () => {
      it("it return null", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        const found = list.find(item => item.value === 33);
  
        expect(found).toBeNull();
      });
    });
  
    describe("with predicate with existing value", () => {
      it("it find the node with this value", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        const found = list.find(item => item.value === 3);
  
        expect(found?.value).toBe(3);
      });
    });
  
    describe("with predicate with index less than 0", () => {
      it("it return null", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        const found = list.find((item, index) => index === -1);
  
        expect(found).toBeNull();
      });
    });
  
    describe("with predicate with index greater than list length", () => {
      it("it return null", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        const found = list.find((item, index) => index === 9);
  
        expect(found).toBeNull();
      });
    });
  
    describe("with predicate with index in the middle", () => {
      it("it find the node at that index", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        const found = list.find((item, index) => index === 2);
  
        expect(found?.value).toBe(3);
      });
    });
  });
  
  describe("#findIndex", () => {
    describe("#predicate", () => {
      describe("with an empty linked list", () => {
        it("it should be called 0 times", () => {
          const list = new LinkedList<number>();
          const predicateMock = jest.fn((node: Node<number>) => node.value === 5);
          list.findIndex(predicateMock);
  
          expect(predicateMock).toHaveBeenCalledTimes(0);
        });
      });
  
      describe("with non-existing value", () => {
        it("it should be called as many times as there are elements in the linked list", () => {
          const values = [1, 2, 3, 4];
          const list = new LinkedList<number>(values);
          const predicateMock = jest.fn((node: Node<number>) => node.value === 33);
          list.findIndex(predicateMock);
  
          for (let i = 0; i < list.length; i++) {
            expect(predicateMock.mock.calls[i][0].value).toBe(values[i]);
          }
  
          expect(predicateMock).toHaveBeenCalledTimes(4);
        });
      });
  
      describe("with existing value", () => {
        it("it should be called until a matching element is found", () => {
          const values = [1, 2, 3, 4];
          const list = new LinkedList<number>(values);
          const predicateMock = jest.fn((node: Node<number>) => node.value === 3);
          list.findIndex(predicateMock);
  
          for (let i = 0; i < 3; i++) {
            expect(predicateMock.mock.calls[i][0].value).toBe(values[i]);
          }
  
          expect(predicateMock).toHaveBeenCalledTimes(3);
        });
      });
    });
  
    describe("with an empty linked list", () => {
      it("it return -1", () => {
        const list = new LinkedList<number>();
        const found = list.findIndex(item => item.value === 5);
  
        expect(found).toBe(-1);
      })
    });
  
    describe("with predicate with non-existing value", () => {
      it("it return -1", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        const found = list.findIndex(item => item.value === 33);
  
        expect(found).toBe(-1);
      });
    });
  
    describe("with predicate with existing value", () => {
      it("it find index of that value", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
        const found = list.findIndex(item => item.value === 3);
  
        expect(found).toBe(2);
      });
    });
  });
  
  describe("#toArray", () => {
    describe("with an empty linked list", () => {
      it("it return the empty array", () => {
        const list = new LinkedList<number>();
  
        expect(list.toArray()).toEqual([]);
      });
    });
  
    describe("when the linked list has values", () => {
      it("it return the linked list like a normal array of values", () => {
        const list = new LinkedList<number>([1, 2, 3, 4]);
  
        expect(list.toArray()).toEqual([1, 2, 3, 4]);
      });
  
    });
  });
  
  describe("#traverse", () => {
    describe("with an empty linked list", () => {
      it("it should be called 0 times", () => {
        const list = new LinkedList<number>();
        const callbackMock = jest.fn((node: Node<number>, index?: number) => { });
        list.traverse(callbackMock);
  
        expect(callbackMock).toHaveBeenCalledTimes(0);
      });
    });
  
    describe("with non-empty linked list", () => {
      it("it should be called for each item", () => {
        const values = [1, 2, 3, 4];
        const list = new LinkedList<number>(values);
        const callbackMock = jest.fn((node: Node<number>, index?: number) => { });
        list.traverse(callbackMock);
  
        for (let i = 0; i < list.length; i++) {
          expect(callbackMock.mock.calls[i][0].value).toBe(values[i]);
          expect(callbackMock.mock.calls[i][1]).toBe(i);
        }
  
        expect(callbackMock).toHaveBeenCalledTimes(4);
      });
    });
  });
  
  describe("#reverse", () => {
    it("it should reverse the linked list", () => {
      const list = new LinkedList<number>([1, 2, 3, 4]);
      list.reverse();
  
      expect(list.head?.value).toBe(4);
      expect(list.tail?.value).toBe(1);
      expect(list.tail?.next).toBeNull();
      expect(list.length).toBe(4);
      expect(list.toArray()).toEqual([4, 3, 2, 1]);
    });
  });
  
  describe("#print", () => {
    it("it should print the linked list", () => {
      const list = new LinkedList<number>([1, 2, 3, 4]);
      console.log = jest.fn();
      list.print();
  
      expect(console.log).toHaveBeenCalledWith('1 -> 2 -> 3 -> 4 -> null');
    });
  });
});