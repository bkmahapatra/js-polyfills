const { customApply } = require("../apply.js");

describe("Function.prototype.apply", () => {
  beforeAll(() => {
    Function.prototype.myApply = customApply;
  });

  // Test 1: Basic functionality with a simple function
  test("should call the function with the correct context and arguments", () => {
    function greet(message, ending) {
      return `${message}, ${this.name}${ending}`;
    }

    const obj = { name: "John" };
    const result = greet.myApply(obj, ["Hello", "!"]);
    expect(result).toBe("Hello, John!");
  });

  // Test 2: Call with no arguments
  test("should call the function with no arguments", () => {
    function sayHi() {
      return `Hi, ${this.name}`;
    }

    const obj = { name: "Alice" };
    const result = sayHi.myApply(obj);
    expect(result).toBe("Hi, Alice");
  });

  // Test 3: Call with null or undefined as context
  test("should default to globalThis when null or undefined is passed as context", () => {
    globalThis.value = "Global";

    function getValue() {
      return this.value;
    }

    const resultWithNull = getValue.myApply(null);
    const resultWithUndefined = getValue.myApply(undefined);

    expect(resultWithNull).toBe("Global");
    expect(resultWithUndefined).toBe("Global");

    delete globalThis.value; // Clean up global variable
  });

  // Test 4: Context is a primitive value
  test("should box primitive values as objects when used as context", () => {
    function getType() {
      return typeof this;
    }

    const result1 = getType.myApply(42);
    const result2 = getType.myApply("hello");

    expect(result1).toBe("object");
    expect(result2).toBe("object");
  });

  // Test 5: Pass an array of arguments
  test("should handle array of arguments correctly", () => {
    function sum(a, b, c) {
      return a + b + c;
    }

    const result = sum.myApply(null, [1, 2, 3]);
    expect(result).toBe(6);
  });

  // Test 6: Call with an array-like object (not a real array)
  test("should handle array-like objects correctly", () => {
    function sum(a, b, c) {
      return a + b + c;
    }

    const arrayLike = { 0: 2, 1: 4, 2: 6, length: 3 };
    const result = sum.myApply(null, arrayLike);
    expect(result).toBe(12);
  });

  // Test 7: Function with no `this` context (strict mode)
  // ! need to fix
  test("should not coerce this when in strict mode and null or undefined is passed", () => {
    "use strict";

    function checkThis() {
      return this;
    }

    const resultWithNull = checkThis.myApply(null);
    const resultWithUndefined = checkThis.myApply(undefined);

    expect(resultWithNull).toBe(null);
    expect(resultWithUndefined).toBe(undefined);
  });

  // Test 8: Ensure errors propagate correctly
  test("should propagate errors thrown in the function", () => {
    function throwError() {
      throw new Error("Something went wrong");
    }

    expect(() => throwError.myApply()).toThrow("Something went wrong");
  });

  // Test 9: Empty arguments array
  test("should work correctly when an empty arguments array is passed", () => {
    function saySomething() {
      return `Hello, ${this.name || "Guest"}`;
    }

    const obj = { name: "Bob" };
    const result = saySomething.myApply(obj, []);
    expect(result).toBe("Hello, Bob");
  });

  // Test 10: Verify function execution modifies the context object
  test("should modify the context object correctly", () => {
    const obj = { value: 1 };

    function increment() {
      this.value += 1;
    }

    increment.myApply(obj);
    expect(obj.value).toBe(2);

    increment.myApply(obj);
    expect(obj.value).toBe(3);
  });
});
