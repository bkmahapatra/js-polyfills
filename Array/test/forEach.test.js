const { customForEach } = require("../forEach");

describe("Array.prototype.cForEach", () => {
  beforeAll(() => {
    Array.prototype.cForEach = customForEach;
  });

  test("calls the callback for each element in the array", () => {
    const mockCallback = jest.fn();
    const arr = [1, 2, 3];
    arr.cForEach(mockCallback);
    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, arr);
    expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
    expect(mockCallback).toHaveBeenNthCalledWith(3, 3, 2, arr);
  });

  test("handles sparse arrays by skipping empty slots", () => {
    const mockCallback = jest.fn();
    const arr = [1, , 3, 4]; // Sparse array
    arr.cForEach(mockCallback);
    expect(mockCallback).toHaveBeenCalledTimes(3); // Called for [1, 3, 4]
  });

  test("calls the callback with correct arguments", () => {
    const arr = [10, 20, 30];
    const mockCallback = jest.fn();
    arr.cForEach(mockCallback);
    expect(mockCallback).toHaveBeenNthCalledWith(1, 10, 0, arr);
    expect(mockCallback).toHaveBeenNthCalledWith(2, 20, 1, arr);
    expect(mockCallback).toHaveBeenNthCalledWith(3, 30, 2, arr);
  });

  test("executes the callback in the context of thisArg", () => {
    const arr = [1, 2, 3];
    const context = { multiplier: 2 };
    const results = [];
    arr.cForEach(function (num) {
      results.push(num * this.multiplier);
    }, context);
    expect(results).toEqual([2, 4, 6]);
  });

  test("throws TypeError when callback is not a function", () => {
    const arr = [1, 2, 3];
    expect(() => arr.cForEach(null)).toThrow("null is not a function");
    expect(() => arr.cForEach(undefined)).toThrow(
      "undefined is not a function"
    );
  });

  test("throws TypeError when called on null or undefined", () => {
    expect(() => Array.prototype.cForEach.call(null, () => {})).toThrow(
      "Array.prototype.cForEach called on null or undefined"
    );
    expect(() => Array.prototype.cForEach.call(undefined, () => {})).toThrow(
      "Array.prototype.cForEach called on null or undefined"
    );
  });

  test("does not mutate the original array", () => {
    const arr = [1, 2, 3];
    const original = [...arr];
    arr.cForEach((num) => num * 2);
    expect(arr).toEqual(original);
  });

  test("works with an empty array without errors", () => {
    const mockCallback = jest.fn();
    const arr = [];
    arr.cForEach(mockCallback);
    expect(mockCallback).not.toHaveBeenCalled();
  });

  test("works with array-like objects", () => {
    const mockCallback = jest.fn();
    const arrayLike = { 0: "a", 1: "b", length: 2 };
    Array.prototype.cForEach.call(arrayLike, mockCallback);
    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenNthCalledWith(1, "a", 0, arrayLike);
    expect(mockCallback).toHaveBeenNthCalledWith(2, "b", 1, arrayLike);
  });

  test("handles modifications of the array during iteration", () => {
    const arr = [1, 2, 3];
    const results = [];
    arr.cForEach((num, index, array) => {
      results.push(num);
      if (index === 0) {
        array.push(4);
      }
    });
    expect(results).toEqual([1, 2, 3]);
    expect(arr).toEqual([1, 2, 3, 4]); // The original array is modified, but only iterated over the original length
  });
});
