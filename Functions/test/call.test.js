const { customCall } = require("../call.js");

describe("Custom Function.prototype.myCall Polyfill", () => {
  beforeAll(() => {
    Function.prototype.myCall = customCall;
  });
  
  // Test 1: Basic functionality with a simple function
  test("should call the function with the correct context and arguments", () => {
    function greet(message) {
      return `${message}, ${this.name}`;
    }
    const obj = { name: "John" };

    const result = greet.myCall(obj, "Hello");
    expect(result).toBe("Hello, John");
  });

  // Test 2: Call function with multiple arguments
  test("should call the function with multiple arguments", () => {
    function add(a, b, c) {
      return this.base + a + b + c;
    }
    const obj = { base: 10 };

    const result = add.myCall(obj, 1, 2, 3);
    expect(result).toBe(16);
  });

  // Test 3: Default context (globalThis) when no context is provided
  test("should default to globalThis if no context is provided", () => {
    globalThis.value = 42; // Mocking a global variable

    function getValue() {
      return this.value;
    }

    const result = getValue.myCall();
    expect(result).toBe(42);

    delete globalThis.value; // Clean up the mock global variable
  });

  // Test 4: Ensure `myCall` works with primitive values as context
  test("should box primitive types as objects when used as context", () => {
    function getType() {
      return typeof this;
    }

    const result1 = getType.myCall(42); // Number primitive
    const result2 = getType.myCall("hello"); // String primitive

    expect(result1).toBe("object");
    expect(result2).toBe("object");
  });

  // Test 5: Throw error if `myCall` is used on a non-function
  test("should throw a TypeError if myCall is used on a non-function", () => {
    const notAFunction = {};
    expect(() => {
      Function.prototype.myCall.call(notAFunction, {});
    }).toThrow(TypeError);
  });

  // Test 6: Function with no arguments
  test("should work with a function that takes no arguments", () => {
    function sayHi() {
      return `Hi, ${this.name}`;
    }
    const obj = { name: "Alice" };

    const result = sayHi.myCall(obj);
    expect(result).toBe("Hi, Alice");
  });

  // Test 7: Verify function execution order
  test("should ensure the function executes properly in the given context", () => {
    const obj = { x: 0 };
    function increment() {
      this.x += 1;
    }

    increment.myCall(obj);
    expect(obj.x).toBe(1);
  });

  // Test 8: Function with Symbol keys
  test("should work when the context already has Symbol properties", () => {
    const uniqueKey = Symbol("key");
    const obj = { [uniqueKey]: 100 };

    function getSymbolValue() {
      return this[uniqueKey];
    }

    const result = getSymbolValue.myCall(obj);
    expect(result).toBe(100);
  });
});
