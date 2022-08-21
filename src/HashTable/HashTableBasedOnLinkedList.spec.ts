import { HashTableBasedOnLinkedList } from './HashTableBasedOnLinkedList';

describe(HashTableBasedOnLinkedList, () => {
  let map: HashTableBasedOnLinkedList<string | number, string>;
  
  beforeEach(() => {
    map = new HashTableBasedOnLinkedList<string | number, string>();
  });

	describe("#constructor", () => {
    it("should create an HashTable", () => {
      expect(map.size).toBe(0);
    });

    it("should create an HashTable with custom hash function", () => {
      const hashFn = (key: string | number) => key.toString().length;

      map = new HashTableBasedOnLinkedList<string | number, string>(hashFn);

      expect(map.size).toBe(0);
    });
  });

  describe("#set and #get", () => {
    it("should set value by the key", () => {
      map.set('simpleKey', 'simpleValue');

      expect(map.size).toBe(1);
      expect(map.get('simpleKey')).toBe('simpleValue');
    });

    it("should get null for non existing key", () => {
      map.set(1, 'value 1');

      expect(map.get(9999)).toBeNull();
    });

    it("should update value with existing key", () => {
      map.set(1, 'value 1');
      map.set(2, 'value 2');
      map.set(12, 'value 12');

      expect(map.size).toBe(3);
      expect(map.get(12)).toBe('value 12');

      map.set(12, 'updated value 12');

      expect(map.size).toBe(3);
      expect(map.get(12)).toBe('updated value 12');
    });

    it("should resolve collisions", () => {
      // COLLISION: set to index [4]
      map.set(1, 'value 1');
      // COLLISION: set to index [4]
      map.set(12, 'value 12');
      // COLLISION: set to index [4]
      map.set(122, 'value 122');

      expect(map.size).toBe(3);
      expect(map.get(1)).toBe('value 1');
      expect(map.get(12)).toBe('value 12');
      expect(map.get(122)).toBe('value 122');
    });

    it("should run rehashing when reached Load Factor (default LD = 0.75, initial Bucket Size = 5)", () => {
      // LD = 0.2
      map.set(1, 'value 1');
      // LD = 0.4
      map.set(2, 'value 2');
      // LD = 0.6
      map.set(3, 'value 3');
      // LD = 0.8 -> Rehashing... -> Bucket Size doubled and LD = 0.4
      map.set(4, 'value 4');
      // LD = 0.5
      map.set(5, 'value 5');

      expect(map.size).toBe(5);
      expect(map.get(1)).toBe('value 1');
      expect(map.get(2)).toBe('value 2');
      expect(map.get(3)).toBe('value 3');
      expect(map.get(4)).toBe('value 4');
      expect(map.get(5)).toBe('value 5');
    });
  });

  describe("#delete", () => {
    beforeEach(() => {
      // COLLISION: set to index [4]
      map.set(1, 'value 1');
      // COLLISION: set to index [4]
      map.set(12, 'value 12');
      // COLLISION: set to index [4]
      map.set(122, 'value 122');
    })

    it("should delete value by the given key", () => {
      expect(map.size).toBe(3);
      expect(map.get(1)).toBe('value 1');
      expect(map.delete(1)).toBeTruthy();
      expect(map.size).toBe(2);
      expect(map.get(1)).toBeNull();

      expect(map.get(122)).toBe('value 122');
      expect(map.delete(122)).toBeTruthy();
      expect(map.size).toBe(1);
      expect(map.get(122)).toBeNull();
    });

    it("should try delete value by the non existing key", () => {
      expect(map.size).toBe(3);
      expect(map.delete(999)).toBeFalsy();
      expect(map.size).toBe(3);
    });
  });
});