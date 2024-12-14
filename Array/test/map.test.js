const { customMap } = require("../map.js");


describe("Array.prototype.cMap", () => {
  beforeAll(() => {
    Array.prototype.cMap = customMap;
  });

  // Test 1: Basic Functionality
  test("maps elements to their squares", () => {
    const arr = [1, 2, 3];
    const result = arr.cMap((x) => x * x);
    expect(result).toEqual([1, 4, 9]);
  });

  // Test 2: Empty Array
  test("returns an empty array when input array is empty", () => {
    const arr = [];
    const result = arr.cMap((x) => x * 2);
    expect(result).toEqual([]);
  });

  // Test 3: Callback Receives Correct Parameters
  test("passes correct arguments to the callback function", () => {
    const mockCallback = jest.fn();
    const arr = [10, 20, 30];
    arr.cMap(mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenNthCalledWith(1, 10, 0, arr);
    expect(mockCallback).toHaveBeenNthCalledWith(2, 20, 1, arr);
    expect(mockCallback).toHaveBeenNthCalledWith(3, 30, 2, arr);
  });

  // Test 4: Handling Holes in Sparse Arrays
  test("skips holes in sparse arrays", () => {
    const arr = [1, , 3]; // Sparse array
    const mockCallback = jest.fn();
    const result = arr.cMap(mockCallback);

    expect(result).toEqual([undefined, undefined]);
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  // Test 5: Array-Like Objects
  test("works with array-like objects", () => {
    const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
    const result = Array.prototype.cMap.call(arrayLike, (x) => x.toUpperCase());
    expect(result).toEqual(["A", "B", "C"]);
  });

  // Test 6: `thisArg` Context Binding
  test("binds the `thisArg` correctly", () => {
    const context = { multiplier: 2 };
    const arr = [1, 2, 3];
    const result = arr.cMap(function (x) {
      return x * this.multiplier;
    }, context);
    expect(result).toEqual([2, 4, 6]);
  });

  // Test 7: Non-Callable Callback
  test("throws an error if the callback is not a function", () => {
    const arr = [1, 2, 3];
    expect(() => arr.cMap(null)).toThrow(TypeError);
    expect(() => arr.cMap(null)).toThrow(/is not a function/);
  });

  // Test 8: Immutable Input
  test("does not mutate the original array", () => {
    const arr = [1, 2, 3];
    arr.cMap((x) => x * 2);
    expect(arr).toEqual([1, 2, 3]);
  });

  // Test 9: Large Arrays
  test("handles large arrays correctly", () => {
    const largeArray = Array.from({ length: 1e5 }, (_, i) => i);
    const result = largeArray.cMap((x) => x * 2);
    expect(result.length).toBe(1e5);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(2);
  });

  // Test 10: Mixed Data Types
  test("maps arrays with mixed data types", () => {
    const arr = [1, "two", null, undefined, true];
    const result = arr.cMap((x) => typeof x);
    expect(result).toEqual([
      "number",
      "string",
      "object",
      "undefined",
      "boolean",
    ]);
  });

  // Test 11: Nested Arrays
  test("handles nested arrays correctly", () => {
    const arr = [
      [1, 2],
      [3, 4],
    ];
    const result = arr.cMap((subArr) => subArr.map((x) => x * 2));
    expect(result).toEqual([
      [2, 4],
      [6, 8],
    ]);
  });

  // Test 12: Callback Returning Undefined
  test("works correctly when callback returns undefined", () => {
    const arr = [1, 2, 3];
    const result = arr.cMap(() => undefined);
    expect(result).toEqual([undefined, undefined, undefined]);
  });

  // Test 13: Handling `null` and `undefined` in Array
  test("handles `null` and `undefined` elements in the array", () => {
    const arr = [null, undefined, 3];
    const result = arr.cMap((x) => (x == null ? "nullish" : x * 2));
    expect(result).toEqual(["nullish", "nullish", 6]);
  });
});
