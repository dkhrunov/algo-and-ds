import { PriorityItem } from "./PriorityItem";
import { Node } from "../../Node/Node";
import { QUEUE_EMPTY_ERROR } from "../Exceptions/QueueEmptyError";
import { LinkedList } from "../../LinkedList/LinkedList";

// ---------------------------------
// |            VARIANT 1          |
// ---------------------------------

// export class PriorityQueueBasedOnLinkedList<T> {
//   private _front: Node<PriorityItem<T>> | null = null;

//   public get isEmpty(): boolean {
//     return this._front === null;
//   }

//   // O(1)
//   public peek(): T | null {
//     if (this._front === null) return null;

//     return this._front!.value.value;
//   }

//   // O(n)
//   public enqueue(item: T, priority: number): void {
//     const node = new Node(new PriorityItem(item, priority));

//     if (this._front === null) {
//       this._front = node;
//     }
//     // Special Case: The head of list has
//     // lesser priority than new node
//     else if (this._front.value.priority < priority) {
//       node.next = this._front;
//       this._front = node;
//     } 
//     else {
//       let current: Node<PriorityItem<T>> | null = this._front;

//       while (current) {
//         if (current.value.priority > priority) {
//           break;
//         }
  
//         current = current.next;
//       }

//       if (current === null) {
//         node.next = this._front;
//         this._front = node;
//       } else {
//         node.next = current.next;
//         current.next = node;
//       }
//     }
//   }

//   // O(1)
//   public dequeue(): T {
// 		if (!this._front) {
//       throw QUEUE_EMPTY_ERROR;
//     }

//     const value = this._front.value.value;

//     if (this._front.next) {
//       this._front = this._front.next;
//     } else {
//       this._front = null;
//     }

//     return value;
//   }
// }


// ---------------------------------
// |            VARIANT 2          |
// ---------------------------------

export class PriorityQueueBasedOnLinkedList<T> {
  private readonly _linkedList = new LinkedList<PriorityItem<T>>();

  public get isEmpty(): boolean {
    return this._linkedList.head === null;
  }

  // O(1)
  public peek(): T | null {
    if (this.isEmpty) return null;

    return this._linkedList.head!.value.value;
  }

  // O(n)
  public enqueue(item: T, priority: number): void {
    const priorityItem = new PriorityItem(item, priority);
  
    if (this._linkedList.head === null) {
      this._linkedList.prepend(priorityItem);
    }
    // Special Case: The head of list has
    // lesser priority than new node
    else if (this._linkedList.head.value.priority < priority) {
      this._linkedList.prepend(priorityItem);
    } 
    else {
      const node = this._linkedList.find((x) => x.value.priority > priority);
      
      if (!node) {
        return this._linkedList.prepend(priorityItem);
      }

      const newNode = new Node(priorityItem, node.next);
      node.next = newNode;
    }
  }

  // O(1)
  public dequeue(): T {
		if (this._linkedList.head === null) {
      throw QUEUE_EMPTY_ERROR;
    }

    return this._linkedList.deleteHead()!.value;
  }
}