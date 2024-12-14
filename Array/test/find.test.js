const { customFind } = require("../find");
describe("Custom Array.prototype.cFind Polyfill", () => {
  beforeAll(() => {
    Array.prototype.cFind = customFind;
  });

  // Test 1: Basic functionality
  test("should return the first element that satisfies the condition", () => {
    const array = [1, 2, 3, 4, 5];
    const result = array.cFind((element) => element > 3);
    expect(result).toBe(4);
  });

  // Test 2: No element satisfies the condition
  test("should return undefined if no element satisfies the condition", () => {
    const array = [1, 2, 3];
    const result = array.cFind((element) => element > 5);
    expect(result).toBeUndefined();
  });

  // Test 3: Callback function called with correct arguments
  test("callback should receive element, index, and array", () => {
    const array = [10, 20, 30];
    const mockCallback = jest.fn((element) => element > 15);

    array.cFind(mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(10, 0, array);
    expect(mockCallback).toHaveBeenCalledWith(20, 1, array);
    // expect(mockCallback).toHaveBeenCalledWith(30, 2, array);
  });

  // Test 4: Works on an empty array
  test("should return undefined for an empty array", () => {
    const array = [];
    const result = array.cFind((element) => element > 0);
    expect(result).toBeUndefined();
  });

  // Test 5: Throws TypeError when no callback function is provided
  test("should throw TypeError if callback is not a function", () => {
    const array = [1, 2, 3];
    expect(() => array.cFind(null)).toThrow(TypeError);
    expect(() => array.cFind(123)).toThrow(TypeError);
    expect(() => array.cFind(undefined)).toThrow(TypeError);
  });

  // Test 6: Array.prototype.cFind called on null or undefined
  test("should throw TypeError when called on null or undefined", () => {
    expect(() => Array.prototype.cFind.call(null, () => true)).toThrow(
      TypeError
    );
    expect(() => Array.prototype.cFind.call(undefined, () => true)).toThrow(
      TypeError
    );
  });

  // Test 7: Works with objects or non-numeric values in the array
  test("should work with objects and return the correct value", () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = array.cFind((obj) => obj.id === 2);
    expect(result).toEqual({ id: 2 });
  });

  // Test 8: Stops iterating after finding the first match
  test("should stop iterating once the condition is satisfied", () => {
    const array = [1, 2, 3, 4];
    const mockCallback = jest.fn((element) => element > 2);

    const result = array.cFind(mockCallback);

    expect(result).toBe(3);
    expect(mockCallback).toHaveBeenCalledTimes(3); // Stops after finding 3
  });
});
