const { customFilter } = require("../filter");

describe("Array.prototype.cFilter", () => {
  beforeAll(() => {
    // addFilterToPrototype();
    Array.prototype.cFilter = customFilter;
  });

  test("filters values based on a condition (basic functionality)", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = arr.cFilter((num) => num > 2);
    expect(result).toEqual([3, 4, 5]);
  });

  test("returns an empty array when input is an empty array", () => {
    const arr = [];
    const result = arr.cFilter(() => true);
    expect(result).toEqual([]);
  });

  test("handles sparse arrays correctly", () => {
    const arr = [1, , 3, , 5]; // Sparse array
    const result = arr.cFilter((num) => num > 2);
    expect(result).toEqual([3, 5]);
  });

  test("throws TypeError when callback is not a function", () => {
    expect(() => [1, 2, 3].cFilter(null)).toThrow(TypeError);
    expect(() => [1, 2, 3].cFilter(undefined)).toThrow(TypeError);
  });

  test("works with array-like objects", () => {
    const obj = { 0: "a", 1: "b", 2: "c", length: 3 };
    const result = Array.prototype.cFilter.call(obj, (val) => val !== "b");
    expect(result).toEqual(["a", "c"]);
  });

  test("uses the correct thisArg when provided", () => {
    const context = { threshold: 3 };
    const arr = [1, 2, 3, 4, 5];
    const result = arr.cFilter(function (num) {
      return num > this.threshold;
    }, context);
    expect(result).toEqual([4, 5]);
  });

  // test("throws TypeError when called on null or undefined", () => {
  //   expect(() => Array.prototype.cFilter.call(null, () => true)).toThrow(
  //     TypeError
  //   );
  //   expect(() => Array.prototype.cFilter.call(undefined, () => true)).toThrow(
  //     TypeError
  //   );
  // });

  test("handles modification of the array during iteration", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = arr.cFilter((num, index, array) => {
      if (index === 2) array.push(6);
      return num > 2;
    });
    expect(result).toEqual([3, 4, 5]);
  });

  test("handles non-boolean values returned by the callback", () => {
    const arr = [0, 1, 2, 3];
    const result = arr.cFilter((num) => num); // `0` is falsy; others are truthy
    expect(result).toEqual([1, 2, 3]);
  });

  test("handles special values in the array", () => {
    const arr = [NaN, null, undefined, Infinity, -Infinity, 0, false];
    const result = arr.cFilter((val) => val != null && val !== false);
    expect(result).toEqual([NaN, Infinity, -Infinity, 0]);
  });

  test("handles arrays with custom objects", () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = arr.cFilter((obj) => obj.id > 1);
    expect(result).toEqual([{ id: 2 }, { id: 3 }]);
  });

  test("handles an array of mixed data types", () => {
    const arr = [1, "hello", true, null, undefined, {}, []];
    const result = arr.cFilter((val) => typeof val === "string");
    expect(result).toEqual(["hello"]);
  });
});
