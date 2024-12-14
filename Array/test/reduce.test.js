const { customReduce } = require("../reduce.js");

describe("Array.prototype.cReduce", () => {
  beforeAll(() => {
    Array.prototype.cReduce = customReduce;
  });

  test("reduces an array to a single value", () => {
    const arr = [1, 2, 3, 4];
    const result = arr.cReduce((acc, val) => acc + val, 0);
    expect(result).toBe(10);
  });

  test("uses the first element as the initial value when not provided", () => {
    const arr = [1, 2, 3, 4];
    const result = arr.cReduce((acc, val) => acc + val);
    expect(result).toBe(10);
  });

  test("handles an empty array with an initial value", () => {
    const arr = [];
    const result = arr.cReduce((acc, val) => acc + val, 5);
    expect(result).toBe(5);
  });

  test("throws a TypeError for empty arrays without an initial value", () => {
    const arr = [];
    expect(() => arr.cReduce((acc, val) => acc + val)).toThrow(
      "Reduce of empty array with no initial value"
    );
  });

  test("throws a TypeError when callback is not a function", () => {
    const arr = [1, 2, 3];
    expect(() => arr.cReduce(null, 0)).toThrow("null is not a function");
    expect(() => arr.cReduce(undefined, 0)).toThrow(
      "undefined is not a function"
    );
  });

  test("correctly reduces when array contains holes", () => {
    const arr = [1, , 3, 4]; // Sparse array
    const result = arr.cReduce((acc, val) => acc + (val || 0), 0);
    expect(result).toBe(8);
  });

  test("supports an array of objects", () => {
    const arr = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const result = arr.cReduce((acc, val) => acc + val.x, 0);
    expect(result).toBe(6);
  });

  test("works correctly with strings as elements", () => {
    const arr = ["a", "b", "c"];
    const result = arr.cReduce((acc, val) => acc + val, "");
    expect(result).toBe("abc");
  });

  test("does not execute callback for empty slots", () => {
    const arr = [1, , 3, 4]; // Sparse array
    const mockCallback = jest.fn((acc, val) => acc + (val || 0));
    arr.cReduce(mockCallback, 0);
    expect(mockCallback).toHaveBeenCalledTimes(3); // Called only for [1, 3, 4]
  });

  test("works correctly with a complex operation", () => {
    const arr = [1, 2, 3, 4];
    const result = arr.cReduce((acc, val) => acc * val, 1);
    expect(result).toBe(24);
  });
});
