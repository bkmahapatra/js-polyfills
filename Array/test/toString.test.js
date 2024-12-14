const { customToString } = require("../toString");

describe("Array.prototype.cToString", () => {
  beforeAll(() => {
    Array.prototype.cToString = customToString;
  });

  test("converts an array of numbers to a string", () => {
    const arr = [1, 2, 3];
    expect(arr.cToString()).toBe("1,2,3");
  });

  test("handles an array with strings", () => {
    const arr = ["a", "b", "c"];
    expect(arr.cToString()).toBe("a,b,c");
  });

  test("handles an array with mixed types", () => {
    const arr = [1, "a", true, null, undefined];
    expect(arr.cToString()).toBe("1,a,true,,");
  });

  test("handles an empty array", () => {
    const arr = [];
    expect(arr.cToString()).toBe("");
  });

  test("handles sparse arrays", () => {
    const arr = [1, , 3];
    expect(arr.cToString()).toBe("1,,3"); // Missing slots become empty
  });

  test("handles nested arrays (default behavior)", () => {
    const arr = [1, [2, 3], 4];
    expect(arr.cToString()).toBe("1,2,3,4"); // Nested arrays are flattened to comma-separated strings
  });

  test("handles objects in the array", () => {
    const arr = [1, { a: 1 }, [2, 3]];
    expect(arr.cToString()).toBe("1,[object Object],2,3");
  });

  test("handles special objects like Date", () => {
    const date = new Date(0);
    const arr = [1, date];
    expect(arr.cToString()).toBe(`1,${date.toString()}`);
  });

  test("throws TypeError when called on null or undefined", () => {
    expect(() => Array.prototype.cToString.call(null)).toThrow(
      "Array.prototype.cToString called on null or undefined"
    );
    expect(() => Array.prototype.cToString.call(undefined)).toThrow(
      "Array.prototype.cToString called on null or undefined"
    );
  });

  test("works with array-like objects", () => {
    const arrayLike = { 0: "a", 1: "b", length: 2 };
    expect(Array.prototype.cToString.call(arrayLike)).toBe("a,b");
  });

  test("handles large arrays", () => {
    const arr = Array.from({ length: 1000 }, (_, i) => i + 1);
    expect(arr.cToString()).toBe(arr.join(","));
  });
});
