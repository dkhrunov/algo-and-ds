import { PriorityItem } from "./PriorityItem";

describe(PriorityItem, () => {

  describe("#constructor", () => {
    it("should create an item with priority 10 and value 1", () => {
      const item = new PriorityItem(1, 10);

      expect(item.value).toBe(1);
      expect(item.priority).toBe(10);
    });
  });
});
